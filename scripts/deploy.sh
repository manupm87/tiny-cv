#!/usr/bin/env bash
# Atomic deploy of dist/ to DEPLOY_USER@DEPLOY_HOST:DEPLOY_PATH (values from .env).
#
# The build is uploaded to DEPLOY_PATH.new-<timestamp>, then swapped into place
# (current -> DEPLOY_PATH.prev, new -> DEPLOY_PATH). One previous copy is kept as
# DEPLOY_PATH.prev for rollback; the copy before that is removed.
# The whole server folder is REPLACED on every deploy: anything that must survive
# a deploy has to be part of the build output (put it in public/).
#
# Usage: scripts/deploy.sh [--dry-run]   (--dry-run builds and prints the remote commands only)
set -euo pipefail

DRY_RUN=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    *) echo "Unknown argument: $arg" >&2; exit 2 ;;
  esac
done

if [ -f .env ]; then
  while IFS= read -r line || [ -n "$line" ]; do
    line="${line%$'\r'}"
    case "$line" in ''|\#*) continue ;; esac
    key="${line%%=*}"
    val="${line#*=}"
    key="$(echo "$key" | tr -d '[:space:]')"
    val="${val%\"}"; val="${val#\"}"; val="${val%\'}"; val="${val#\'}"
    case "$key" in DEPLOY_USER|DEPLOY_HOST|DEPLOY_PATH) export "$key=$val" ;; esac
  done < .env
fi

fail() { echo "Error: $*" >&2; exit 1; }

[ -n "${DEPLOY_USER:-}" ] && [ -n "${DEPLOY_HOST:-}" ] && [ -n "${DEPLOY_PATH:-}" ] \
  || fail "DEPLOY_USER, DEPLOY_HOST and DEPLOY_PATH must be set in .env"

[[ "$DEPLOY_USER" =~ ^[A-Za-z0-9._][A-Za-z0-9._-]*$ ]] || fail "DEPLOY_USER has unsafe characters"
[[ "$DEPLOY_HOST" =~ ^[A-Za-z0-9][A-Za-z0-9.:-]*$ ]] || fail "DEPLOY_HOST has unsafe characters"

validate_path() {
  local p="$1"
  [[ "$p" == /* ]] || fail "DEPLOY_PATH must be absolute: $p"
  [[ "$p" != *" "* ]] || fail "DEPLOY_PATH must not contain spaces"
  [[ "$p" != *".."* ]] || fail "DEPLOY_PATH must not contain '..'"
  [[ "$p" != */ ]] || fail "DEPLOY_PATH must not end in '/'"
  [[ "$p" =~ ^/[A-Za-z0-9_-][A-Za-z0-9._-]*(/[A-Za-z0-9_-][A-Za-z0-9._-]*){2,}$ ]] \
    || fail "DEPLOY_PATH needs at least three segments, each starting with a letter, digit, _ or -: $p"
  case "$p" in /var|/var/www|/root) fail "DEPLOY_PATH is a protected directory: $p" ;; esac
  [[ "$p" != "/home/$DEPLOY_USER" && "$p" != "/Users/$DEPLOY_USER" ]] || fail "DEPLOY_PATH must not be a home directory: $p"
}
validate_path "$DEPLOY_PATH"

TS="$(date +%Y%m%d%H%M%S)"
NEW="${DEPLOY_PATH}.new-${TS}"
PREV="${DEPLOY_PATH}.prev"
TARGET="${DEPLOY_USER}@${DEPLOY_HOST}"

REMOTE_PREP="set -eu; mkdir '${NEW}'"
read -r -d '' REMOTE_SWAP <<REMOTE || true
set -eu
trap '' HUP
restore() { if [ ! -e '${DEPLOY_PATH}' ] && [ -e '${PREV}' ]; then mv -- '${PREV}' '${DEPLOY_PATH}'; fi; }
trap restore EXIT
find '${NEW}' -type d -exec chmod 755 {} +
find '${NEW}' -type f -exec chmod 644 {} +
if [ -e '${DEPLOY_PATH}' ]; then
  if [ -e '${PREV}' ]; then rm -rf -- '${PREV}'; fi
  mv -- '${DEPLOY_PATH}' '${PREV}'
fi
mv -- '${NEW}' '${DEPLOY_PATH}'
trap - EXIT
REMOTE

echo "Building project..."
npm run build
[ -d dist ] || fail "dist/ not found after build"

echo
echo "Deploy plan for ${TARGET}:"
echo "  1. ssh: ${REMOTE_PREP}"
echo "  2. scp -r dist/. ${TARGET}:'${NEW}/'"
echo "  3. ssh sh -s <<'EOF'"
echo "${REMOTE_SWAP}" | sed 's/^/     /'
echo "     EOF"
echo

if [ "$DRY_RUN" -eq 1 ]; then
  echo "Dry run: nothing executed."
  exit 0
fi

ssh "$TARGET" "$REMOTE_PREP"
# From here on a failure must not leave the uploaded copy behind (a no-op once the swap has moved it).
cleanup_new() { ssh "$TARGET" "rm -rf -- '${NEW}'" || true; }
trap cleanup_new ERR
(cd dist && scp -r . "${TARGET}:${NEW}/")
echo "$REMOTE_SWAP" | ssh "$TARGET" "sh -s"
trap - ERR
echo "Deployment successful!"
