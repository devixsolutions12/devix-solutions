@echo off
TITLE Devix Solutions - Automated Deployment
COLOR 0A

echo ========================================
echo   Devix Solutions - Automated Deployment
echo ========================================
echo.

echo Setting up environment...
cd /d "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"
echo Current directory: %cd%
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js and try again.
    pause
    exit /b 1
)
echo ✅ Node.js is installed

echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install Node.js (which includes npm) and try again.
    pause
    exit /b 1
)
echo ✅ npm is installed

echo Verifying project structure...
if not exist "package.json" (
    echo ❌ Missing required file: package.json
    pause
    exit /b 1
)
if not exist "next.config.ts" (
    echo ❌ Missing required file: next.config.ts
    pause
    exit /b 1
)
if not exist "vercel.json" (
    echo ❌ Missing required file: vercel.json
    pause
    exit /b 1
)
if not exist "src\app\page.tsx" (
    echo ❌ Missing required file: src/app/page.tsx
    pause
    exit /b 1
)
echo ✅ Project structure verified

echo Checking build status...
if not exist ".next" (
    echo Building project...
    call npm run build:vercel
    if %errorlevel% neq 0 (
        echo ❌ Build failed. Check error messages above.
        pause
        exit /b 1
    )
    echo ✅ Project built successfully
) else (
    echo ✅ Project already built
)

echo Checking Vercel CLI...
npx vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Vercel CLI...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Failed to install Vercel CLI
        pause
        exit /b 1
    )
    echo ✅ Vercel CLI installed successfully
) else (
    echo ✅ Vercel CLI is ready
)

echo.
echo ========================================
echo   🚀 Deploying to Vercel
echo ========================================
echo.
echo This may take a few minutes...
echo.

call npx vercel --prod --yes
if %errorlevel% neq 0 (
    echo.
    echo ❌ Deployment failed. Check error messages above.
    echo.
    echo Troubleshooting tips:
    echo 1. Check your internet connection
    echo 2. Verify you can access https://vercel.com
    echo 3. Try running "npx vercel login" manually
    echo 4. Check Vercel status: https://vercel.statuspage.io/
    pause
    exit /b 1
)

echo.
echo ========================================
echo   🎉 Deployment completed successfully!
echo ========================================
echo.
echo ✅ Your Devix Solutions website is now live!
echo.
echo Next steps:
echo 1. Visit the URL provided above to see your live website
echo 2. Test the contact form by filling it out
echo 3. Visit /admin to access your admin panel
echo 4. Share your website with the world!
echo.
echo Thank you for using Devix Solutions!
pause