# Atomic deploy of dist/ to DEPLOY_USER@DEPLOY_HOST:DEPLOY_PATH (values from .env).
#
# The build is uploaded to DEPLOY_PATH.new-<timestamp>, then swapped into place
# (current -> DEPLOY_PATH.prev, new -> DEPLOY_PATH). One previous copy is kept as
# DEPLOY_PATH.prev for rollback; the copy before that is removed.
# The whole server folder is REPLACED on every deploy: anything that must survive
# a deploy has to be part of the build output (put it in public/).
#
# Usage: powershell scripts/deploy.ps1 [-DryRun]   (-DryRun builds and prints the remote commands only)
param([switch]$DryRun)

$ErrorActionPreference = 'Stop'

function Fail($msg) {
    Write-Host "Error: $msg" -ForegroundColor Red
    exit 1
}

if (Test-Path .env) {
    foreach ($line in Get-Content .env) {
        if ($line -match '^\s*(DEPLOY_USER|DEPLOY_HOST|DEPLOY_PATH)\s*=(.*)$') {
            $value = $matches[2].Trim().Trim('"').Trim("'")
            [Environment]::SetEnvironmentVariable($matches[1], $value, 'Process')
        }
    }
}

$user = $env:DEPLOY_USER
$deployHost = $env:DEPLOY_HOST
$path = $env:DEPLOY_PATH

if (-not $user -or -not $deployHost -or -not $path) {
    Fail 'DEPLOY_USER, DEPLOY_HOST and DEPLOY_PATH must be set in .env'
}
if ($user -notmatch '^[A-Za-z0-9._][A-Za-z0-9._-]*$') { Fail 'DEPLOY_USER has unsafe characters' }
if ($deployHost -notmatch '^[A-Za-z0-9][A-Za-z0-9.:-]*$') { Fail 'DEPLOY_HOST has unsafe characters' }

if (-not $path.StartsWith('/')) { Fail "DEPLOY_PATH must be absolute: $path" }
if ($path -match '\s') { Fail 'DEPLOY_PATH must not contain spaces' }
if ($path.Contains('..')) { Fail "DEPLOY_PATH must not contain '..'" }
if ($path.EndsWith('/')) { Fail "DEPLOY_PATH must not end in '/'" }
if ($path -notmatch '^/[A-Za-z0-9_-][A-Za-z0-9._-]*(/[A-Za-z0-9_-][A-Za-z0-9._-]*){2,}$') {
    Fail "DEPLOY_PATH needs at least three segments, each starting with a letter, digit, _ or -: $path"
}
if (@('/var', '/var/www', '/root') -contains $path) { Fail "DEPLOY_PATH is a protected directory: $path" }
if ($path -eq "/home/$user" -or $path -eq "/Users/$user") { Fail "DEPLOY_PATH must not be a home directory: $path" }

$ts = Get-Date -Format 'yyyyMMddHHmmss'
$new = "$path.new-$ts"
$prev = "$path.prev"
$target = "$user@$deployHost"

$prep = "set -eu; mkdir '$new'"
$swap = @"
set -eu
trap '' HUP
restore() { if [ ! -e '$path' ] && [ -e '$prev' ]; then mv -- '$prev' '$path'; fi; }
trap restore EXIT
find '$new' -type d -exec chmod 755 {} +
find '$new' -type f -exec chmod 644 {} +
if [ -e '$path' ]; then
  if [ -e '$prev' ]; then rm -rf -- '$prev'; fi
  mv -- '$path' '$prev'
fi
mv -- '$new' '$path'
trap - EXIT
"@
$swap = $swap -replace "`r`n", "`n"

function Invoke-Native([scriptblock]$cmd, [string]$what, [switch]$CleanupNew) {
    & $cmd
    if ($LASTEXITCODE -ne 0) {
        $code = $LASTEXITCODE
        # A failed upload or swap must not leave the uploaded copy behind (a no-op once the swap has moved it).
        if ($CleanupNew) { ssh $target "rm -rf -- '$new'" }
        Fail "$what failed with exit code $code"
    }
}

Write-Host 'Building project...'
Invoke-Native { npm run build } 'Build'
if (-not (Test-Path dist)) { Fail 'dist/ not found after build' }

Write-Host ''
Write-Host "Deploy plan for ${target}:"
Write-Host "  1. ssh ${target}: $prep"
Write-Host "  2. scp -r dist/. ${target}:'$new/'"
Write-Host "  3. ssh ${target} sh -s <<'EOF'"
$swap.TrimEnd("`n").Split("`n") | ForEach-Object { Write-Host "     $_" }
Write-Host '     EOF'
Write-Host ''

if ($DryRun) {
    Write-Host 'Dry run: nothing executed.'
    exit 0
}

Invoke-Native { ssh $target $prep } 'Remote mkdir'

Push-Location dist
try {
    Invoke-Native { scp -r . "${target}:${new}/" } 'Upload' -CleanupNew
}
finally {
    Pop-Location
}

# The script is sent base64-encoded so no CRLF or quoting issue can reach the remote shell.
$b64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($swap))
Invoke-Native { ssh $target "echo $b64 | base64 -d | sh" } 'Remote swap' -CleanupNew

Write-Host 'Deployment successful!'
