# Devix Solutions - Website Launcher
# This script will deploy your website to Vercel with minimal effort

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  🚀 Devix Solutions - Website Launcher  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Confirm we're in the right directory
$expectedPath = "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"
$currentPath = Get-Location

if ($currentPath.Path -ne $expectedPath) {
    Write-Host "Navigating to project directory..." -ForegroundColor Yellow
    Set-Location $expectedPath
    Write-Host "Current directory: $(Get-Location)" -ForegroundColor Green
} else {
    Write-Host "Already in correct directory: $currentPath" -ForegroundColor Green
}

Write-Host ""
Write-Host "Ready to deploy your Devix Solutions website!" -ForegroundColor Green
Write-Host ""

# Ask for confirmation
$confirmation = Read-Host "Do you want to proceed with deployment? (y/n)"
if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "Deployment cancelled." -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "[1/4] Installing dependencies..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Write-Host "Please check that Node.js is installed and try again" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "[2/4] Building the project..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build the project" -ForegroundColor Red
    Write-Host "Please check the error messages above" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Project built successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "[3/4] Preparing for Vercel deployment..." -ForegroundColor Cyan
Write-Host "You may need to authenticate with Vercel in your browser" -ForegroundColor Yellow
Write-Host "Press any key when ready..." -ForegroundColor Gray
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "[4/4] Deploying to Vercel..." -ForegroundColor Cyan
npx vercel --prod --yes

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    Write-Host "Try running 'npx vercel login' first, then run this script again" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  🎉 SUCCESS! Your website is live!     " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Your Devix Solutions website has been successfully deployed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Visit the URL provided above to see your live website" -ForegroundColor Gray
Write-Host "2. Test the contact form by filling it out" -ForegroundColor Gray
Write-Host "3. Visit /admin to access your admin panel" -ForegroundColor Gray
Write-Host ""

Write-Host "Thank you for using Devix Solutions!" -ForegroundColor Green
Write-Host "Press any key to exit..." -ForegroundColor Gray
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")