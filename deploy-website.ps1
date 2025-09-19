# Devix Solutions Deployment Script for Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Devix Solutions - Vercel Deployment   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Navigate to project directory
Set-Location "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"

Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host "Building the project..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to build the project" -ForegroundColor Red
    exit 1
}

Write-Host "Build completed successfully!" -ForegroundColor Green

# Instructions for deployment
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Next Steps for Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. Run: npx vercel login" -ForegroundColor Yellow
Write-Host "2. Follow the authentication prompts" -ForegroundColor Yellow
Write-Host "3. Run: npx vercel --prod" -ForegroundColor Yellow
Write-Host "`nYour website will be deployed to Vercel!" -ForegroundColor Green

Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")