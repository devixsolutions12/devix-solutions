@echo off
TITLE Devix Solutions - Vercel Fix
COLOR 0A

echo ========================================
echo   Devix Solutions - Vercel Fix Script   
echo ========================================
echo.

echo [1/5] Setting up environment...
cd /d "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"
echo Current directory: %cd%
echo.

echo [2/5] Installing dependencies...
echo This may take a few minutes...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies
    echo Please make sure Node.js is installed and try again
    echo.
    pause
    exit /b 1
)
echo Dependencies installed successfully!
echo.

echo [3/5] Building the project...
echo This may take 2-3 minutes...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to build the project
    echo Check the error messages above
    echo.
    pause
    exit /b 1
)
echo Project built successfully!
echo.

echo [4/5] Installing Vercel CLI...
echo This ensures you have the latest version...
call npm install -g vercel
if %errorlevel% neq 0 (
    echo.
    echo WARNING: Failed to install Vercel CLI globally
    echo Continuing with npx vercel...
    echo.
)
echo Vercel CLI check completed!
echo.

echo [5/5] Fixing Vercel authentication...
echo You will need to authenticate with Vercel
echo A browser window will open for authentication
echo.
echo Please follow these steps:
echo 1. Complete authentication in your browser
echo 2. Return to this window after authentication
echo.
pause
echo Logging out of Vercel (to clear any invalid tokens)...
call npx vercel logout
echo Logging in to Vercel...
call npx vercel login
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to login to Vercel
    echo Please check your internet connection and try again
    echo.
    pause
    exit /b 1
)
echo Successfully logged in to Vercel!
echo.

echo Deployment preparation completed!
echo.
echo Next steps:
echo 1. Run deploy-website-final.bat to deploy your website
echo 2. Or run: npx vercel --prod --yes
echo.
echo Your Devix Solutions website is now ready for deployment!
echo.
pause