# Devix Solutions - Fully Automated Deployment
# This script handles the entire deployment process automatically

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Devix Solutions - Fully Automated Deploy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set the correct directory
Set-Location "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"
Write-Host "Working directory: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Function to test if a command succeeded
function Test-CommandSuccess {
    if ($LASTEXITCODE -ne 0) {
        return $false
    }
    return $true
}

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js and try again." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install Node.js (which includes npm) and try again." -ForegroundColor Red
    exit 1
}

# Check project structure
Write-Host "Verifying project structure..." -ForegroundColor Yellow
$requiredFiles = @(
    "package.json",
    "next.config.ts",
    "vercel.json",
    "src/app/page.tsx"
)

$allFilesFound = $true
foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "❌ Missing required file: $file" -ForegroundColor Red
        $allFilesFound = $false
    }
}

if (-not $allFilesFound) {
    Write-Host "❌ Critical error: Required files are missing" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Project structure verified" -ForegroundColor Green

# Check if build directory exists
Write-Host "Checking build status..." -ForegroundColor Yellow
if (-not (Test-Path ".next")) {
    Write-Host "Building project..." -ForegroundColor Yellow
    npm run build:vercel
    if (-not (Test-CommandSuccess)) {
        Write-Host "❌ Build failed. Check error messages above." -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Project built successfully" -ForegroundColor Green
} else {
    Write-Host "✅ Project already built" -ForegroundColor Green
}

# Check Vercel CLI
Write-Host "Checking Vercel CLI..." -ForegroundColor Yellow
try {
    $vercelVersion = npx vercel --version 2>$null
    Write-Host "✅ Vercel CLI is ready" -ForegroundColor Green
} catch {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    if (-not (Test-CommandSuccess)) {
        Write-Host "❌ Failed to install Vercel CLI" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Vercel CLI installed successfully" -ForegroundColor Green
}

# Deploy to Vercel
Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
Write-Host ""

npx vercel --prod --yes
if (-not (Test-CommandSuccess)) {
    Write-Host "❌ Deployment failed. Check error messages above." -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting tips:" -ForegroundColor Yellow
    Write-Host "1. Check your internet connection" -ForegroundColor Gray
    Write-Host "2. Verify you can access https://vercel.com" -ForegroundColor Gray
    Write-Host "3. Try running 'npx vercel login' manually" -ForegroundColor Gray
    Write-Host "4. Check Vercel status: https://vercel.statuspage.io/" -ForegroundColor Gray
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  🎉 Deployment completed successfully!  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Your Devix Solutions website is now live!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Visit the URL provided above to see your live website" -ForegroundColor Gray
Write-Host "2. Test the contact form by filling it out" -ForegroundColor Gray
Write-Host "3. Visit /admin to access your admin panel" -ForegroundColor Gray
Write-Host "4. Share your website with the world!" -ForegroundColor Gray
Write-Host ""
Write-Host "Thank you for using Devix Solutions!" -ForegroundColor Green