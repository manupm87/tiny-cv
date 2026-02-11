# scripts/deploy.ps1

# Check for .env file and load variables
if (Test-Path .env) {
    Get-Content .env | ForEach-Object {
        if ($_ -match '^([^#=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
}

# Retrieve environment variables
$env:DEPLOY_USER = [Environment]::GetEnvironmentVariable("DEPLOY_USER")
$env:DEPLOY_HOST = [Environment]::GetEnvironmentVariable("DEPLOY_HOST")
$env:DEPLOY_PATH = [Environment]::GetEnvironmentVariable("DEPLOY_PATH")

# Check for required variables
if (-not $env:DEPLOY_User -or -not $env:DEPLOY_HOST -or -not $env:DEPLOY_PATH) {
    Write-Error "Error: DEPLOY_USER, DEPLOY_HOST, or DEPLOY_PATH is not set in .env"
    exit 1
}

Write-Host "Building project..."
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed. Aborting deployment."
    exit 1
}

Write-Host "Deploying to $env:DEPLOY_HOST..."

# Use SCP to copy files. 
# Note: scp -r dist/* copies the CONTENTS of dist to the remote path.
# We use Resolve-Path to handle the wildcard expansion properly in PowerShell before passing to scp.
$distPath = Join-Path (Get-Location) "dist"
if (-not (Test-Path $distPath)) {
    Write-Error "Dist folder not found!"
    exit 1
}

# Construct SCP command
# We use * to copy contents. 
# Quote paths to handle spaces if necessary, though simpler is often better with scp scp quirks.
try {
    # Using 'dist/*' directly with scp in PowerShell might behave differently than bash globbing.
    # The safest way to copy contents of a dir to a remote dir effectively replacing it or merging it
    # without creating 'dist' folder inside 'dest' is tricky with scp.
    # Command: scp -r dist/* user@host:path
    
    # Let's try executing scp directly.
    # We escape the wildcard so PowerShell doesn't try to expand it locally if we want scp to handle it, 
    # BUT scp does not do globbing on local files, the shell does.
    # So we MUST let PowerShell expand it or pass individual files.
    
    # Better approach for recursive content copy without 'dist' parent folder:
    # Enter dist, copy all, exit.
    
    Push-Location dist
    scp -r * "${env:DEPLOY_USER}@${env:DEPLOY_HOST}:${env:DEPLOY_PATH}"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "File copy successful!"
        
        Write-Host "Fixing permissions on remote server..."
        # Set directories to 755 (leave files as is, to avoid execution bit on files)
        ssh "${env:DEPLOY_USER}@${env:DEPLOY_HOST}" "find ${env:DEPLOY_PATH} -type d -exec chmod 755 {} +"
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Deployment successful!"
        }
        else {
            Write-Error "Permission fix failed with exit code $LASTEXITCODE"
            exit 1
        }
    }
    else {
        throw "SCP failed with exit code $LASTEXITCODE"
    }
}
catch {
    Write-Error "Deployment failed: $_"
    exit 1
}
finally {
    Pop-Location
}
