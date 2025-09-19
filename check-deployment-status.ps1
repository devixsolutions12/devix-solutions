# Devix Solutions - Deployment Status Checker
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Devix Solutions - Deployment Status     " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set the correct directory
Set-Location "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"
Write-Host "Working directory: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Check if required files exist
Write-Host "Checking required files..." -ForegroundColor Yellow
$requiredFiles = @("package.json", "vercel.json", "next.config.ts")
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file found" -ForegroundColor Green
    } else {
        Write-Host "❌ $file missing" -ForegroundColor Red
    }
}

Write-Host ""

# Check build status
Write-Host "Checking build status..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Write-Host "✅ Build directory found" -ForegroundColor Green
    $buildFiles = (Get-ChildItem -Recurse -Path ".next" | Measure-Object).Count
    Write-Host "📊 Build contains $buildFiles files" -ForegroundColor Gray
} else {
    Write-Host "❌ Build directory not found" -ForegroundColor Red
}

Write-Host ""

# Check dependencies
Write-Host "Checking dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✅ node_modules directory found" -ForegroundColor Green
    $depCount = (Get-ChildItem -Directory -Path "node_modules" | Measure-Object).Count
    Write-Host "📊 node_modules contains $depCount directories" -ForegroundColor Gray
} else {
    Write-Host "❌ node_modules directory not found" -ForegroundColor Red
}

Write-Host ""

# Check for common issues
Write-Host "Checking for common issues..." -ForegroundColor Yellow

# Check parent directory for duplicate files
$parentDir = ".."
$duplicateFiles = @("package.json", "package-lock.json")
foreach ($file in $duplicateFiles) {
    $parentFile = Join-Path $parentDir $file
    if (Test-Path $parentFile) {
        Write-Host "⚠️  Duplicate $file found in parent directory" -ForegroundColor Yellow
        Write-Host "   Recommendation: Remove $parentFile" -ForegroundColor Gray
    }
}

Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deployment Status Summary              " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$issues = 0

if (-not (Test-Path "package.json")) { $issues++ }
if (-not (Test-Path "vercel.json")) { $issues++ }
if (-not (Test-Path "next.config.ts")) { $issues++ }
if (-not (Test-Path ".next")) { $issues++ }
if (-not (Test-Path "node_modules")) { $issues++ }

if ($issues -eq 0) {
    Write-Host "✅ All checks passed! Ready for deployment." -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Run: npx vercel --prod" -ForegroundColor Gray
} else {
    Write-Host "❌ $issues issues found that may prevent deployment" -ForegroundColor Red
    Write-Host ""
    Write-Host "Recommended actions:" -ForegroundColor Yellow
    if (-not (Test-Path "node_modules")) {
        Write-Host "1. Run: npm install" -ForegroundColor Gray
    }
    if (-not (Test-Path ".next")) {
        Write-Host "2. Run: npm run build:vercel" -ForegroundColor Gray
    }
    Write-Host "3. Run the fix scripts:" -ForegroundColor Gray
    Write-Host "   - npm run fix-deployment" -ForegroundColor Gray
    Write-Host "   - npm run robust-fix-deployment" -ForegroundColor Gray
}

Write-Host ""
Write-Host "For detailed troubleshooting, check:" -ForegroundColor Yellow
Write-Host "- FIX_BUILD_ERROR.md" -ForegroundColor Gray
Write-Host "- VERCEL_BUILD_TROUBLESHOOT.md" -ForegroundColor Gray