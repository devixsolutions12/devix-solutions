@echo off
TITLE Devix Solutions - Go Live Deployment
COLOR 0A

echo ========================================
echo   Devix Solutions - Go Live Deployment  
echo ========================================
echo.

echo Current directory: %cd%
echo.

echo [1/4] Installing dependencies...
echo ========================================
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo Dependencies installed successfully!
echo.

echo [2/4] Building the project...
echo ========================================
npm run build
if %errorlevel% neq 0 (
    echo ERROR: Failed to build the project
    pause
    exit /b 1
)
echo Project built successfully!
echo.

echo [3/4] Login to Vercel
echo ========================================
echo Please complete the following steps:
echo.
echo 1. A browser window will open for Vercel authentication
echo 2. Sign in to your Vercel account
echo 3. Authorize the CLI access
echo 4. Return to this window after authentication
echo.
pause
npx vercel login
if %errorlevel% neq 0 (
    echo ERROR: Failed to login to Vercel
    pause
    exit /b 1
)
echo Successfully logged in to Vercel!
echo.

echo [4/4] Deploying to production...
echo ========================================
echo Deploying your website to Vercel...
npx vercel --prod --yes
if %errorlevel% neq 0 (
    echo ERROR: Failed to deploy to Vercel
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS! Your website is now live!   
echo ========================================
echo.
echo Your Devix Solutions website has been successfully deployed!
echo.
echo Press any key to view deployment instructions...
pause >nul

type FINAL_DEPLOYMENT_STEPS.md
echo.
echo Press any key to exit...
pause >nul