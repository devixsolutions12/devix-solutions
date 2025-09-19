# Devix Solutions - Vercel Build Script for Windows
# This script properly sets environment variables on Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Devix Solutions - Vercel Build Script   " -ForegroundColor Cyan
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

# Clean build directory
Write-Host "Cleaning build directory..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    Write-Host "✅ Build directory cleaned" -ForegroundColor Green
} else {
    Write-Host "✅ No build directory to clean" -ForegroundColor Green
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
if (-not (Test-CommandSuccess)) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green

# Set environment variables for Windows
$env:NEXT_TELEMETRY_DISABLED = "1"

# Build the project
Write-Host "Building project with Vercel environment variables..." -ForegroundColor Yellow
next build
if (-not (Test-CommandSuccess)) {
    Write-Host "❌ Build failed. Check error messages above." -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting tips:" -ForegroundColor Yellow
    Write-Host "1. Check for TypeScript errors in your code" -ForegroundColor Gray
    Write-Host "2. Verify all dependencies are correctly installed" -ForegroundColor Gray
    Write-Host "3. Run 'npx tsc --noEmit' to check for TypeScript errors" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Project built successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Your Devix Solutions website is ready for Vercel deployment!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Deploy to Vercel with: npx vercel --prod" -ForegroundColor Gray
Write-Host "2. Or use the automated deployment scripts" -ForegroundColor Gray