# Devix Solutions - Vercel Deployment Script
# This script will help deploy your website to Vercel with proper error handling

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Devix Solutions - Vercel Deployment   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set the correct directory
Set-Location "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"
Write-Host "Working directory: $(Get-Location)" -ForegroundColor Green
Write-Host ""

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

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install dependencies: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Building the project..." -ForegroundColor Yellow
try {
    npm run build
    Write-Host "✅ Project built successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to build the project. Check the error messages above." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Checking Vercel CLI..." -ForegroundColor Yellow
try {
    $vercelVersion = npx vercel --version
    Write-Host "✅ Vercel CLI is available" -ForegroundColor Green
} catch {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    try {
        npm install -g vercel
        Write-Host "✅ Vercel CLI installed successfully!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to install Vercel CLI: $_" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "You may need to authenticate with Vercel in your browser." -ForegroundColor Yellow
Write-Host "If a browser window doesn't open automatically, visit the URL shown in the terminal." -ForegroundColor Yellow
Write-Host ""

try {
    # First try to login
    Write-Host "Attempting to login to Vercel..." -ForegroundColor Yellow
    npx vercel login
    
    Write-Host ""
    Write-Host "Deploying to production..." -ForegroundColor Yellow
    npx vercel --prod --yes --debug
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  🎉 Deployment completed successfully!  " -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Your Devix Solutions website is now live!" -ForegroundColor Green
} catch {
    Write-Host "❌ Deployment failed: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting tips:" -ForegroundColor Yellow
    Write-Host "1. Make sure you have an internet connection" -ForegroundColor Gray
    Write-Host "2. Check that you can access https://vercel.com in your browser" -ForegroundColor Gray
    Write-Host "3. Try running 'npx vercel login' manually first" -ForegroundColor Gray
    Write-Host "4. Check your Vercel account settings" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")