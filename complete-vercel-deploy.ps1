# Devix Solutions - Complete Vercel Deployment
# This script handles the entire deployment process

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Devix Solutions - Complete Deployment  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set the correct directory
Set-Location "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"
Write-Host "Working directory: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Function to check if a command succeeded
function Test-CommandSuccess {
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Command failed with exit code $LASTEXITCODE" -ForegroundColor Red
        return $false
    }
    return $true
}

# Step 1: Clean up previous builds
Write-Host "[1/6] Cleaning up previous builds..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    Write-Host "✅ Cleaned up .next directory" -ForegroundColor Green
} else {
    Write-Host "✅ No previous build found" -ForegroundColor Green
}

# Step 2: Install dependencies
Write-Host "[2/6] Installing dependencies..." -ForegroundColor Yellow
npm ci
if (-not (Test-CommandSuccess)) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Write-Host "Trying npm install instead..." -ForegroundColor Yellow
    npm install
    if (-not (Test-CommandSuccess)) {
        Write-Host "❌ Failed to install dependencies with npm install" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green

# Step 3: Build the project
Write-Host "[3/6] Building the project..." -ForegroundColor Yellow
npm run build
if (-not (Test-CommandSuccess)) {
    Write-Host "❌ Failed to build the project" -ForegroundColor Red
    Write-Host "Check the error messages above for details" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Project built successfully!" -ForegroundColor Green

# Step 4: Check Vercel CLI
Write-Host "[4/6] Checking Vercel CLI..." -ForegroundColor Yellow
try {
    $vercelVersion = npx vercel --version
    Write-Host "✅ Vercel CLI is available: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    if (-not (Test-CommandSuccess)) {
        Write-Host "❌ Failed to install Vercel CLI" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Vercel CLI installed successfully!" -ForegroundColor Green
}

# Step 5: Handle authentication
Write-Host "[5/6] Handling Vercel authentication..." -ForegroundColor Yellow
Write-Host "Logging out to clear any invalid tokens..." -ForegroundColor Yellow
npx vercel logout
Write-Host "Please authenticate with Vercel in your browser..." -ForegroundColor Yellow
Write-Host "A browser window will open shortly. If it doesn't, visit the URL shown in the terminal." -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key when ready to authenticate..." -ForegroundColor Gray
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

try {
    npx vercel login
    if (-not (Test-CommandSuccess)) {
        Write-Host "❌ Vercel login failed" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Successfully logged in to Vercel!" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel login failed: $_" -ForegroundColor Red
    exit 1
}

# Step 6: Deploy to production
Write-Host "[6/6] Deploying to Vercel production..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
Write-Host ""

try {
    npx vercel --prod --yes --debug
    if (-not (Test-CommandSuccess)) {
        Write-Host "❌ Deployment failed" -ForegroundColor Red
        Write-Host ""
        Write-Host "Troubleshooting tips:" -ForegroundColor Yellow
        Write-Host "1. Check your internet connection" -ForegroundColor Gray
        Write-Host "2. Verify you can access https://vercel.com" -ForegroundColor Gray
        Write-Host "3. Check the error messages above for specific issues" -ForegroundColor Gray
        Write-Host "4. Try running 'npx vercel' without --prod flag first" -ForegroundColor Gray
        exit 1
    }
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Deployment failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  🎉 SUCCESS! Your website is live!     " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your Devix Solutions website has been successfully deployed to Vercel!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Visit the URL provided above to see your live website" -ForegroundColor Gray
Write-Host "2. Test the contact form by filling it out" -ForegroundColor Gray
Write-Host "3. Visit /admin to access your admin panel" -ForegroundColor Gray
Write-Host "4. Share your website with the world!" -ForegroundColor Gray
Write-Host ""
Write-Host "Thank you for using Devix Solutions!" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")