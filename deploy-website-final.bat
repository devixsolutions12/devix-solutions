@echo off
TITLE Devix Solutions - Final Deployment
COLOR 0A

echo =====================================================
echo    Devix Solutions - Final Deployment Script        
echo =====================================================
echo.
echo This script will deploy your website to Vercel.
echo Make sure you have an internet connection.
echo.

REM Navigate to the correct directory
echo [1/5] Setting up environment...
cd /d "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"
echo Current directory: %cd%
echo.

REM Clean install dependencies
echo [2/5] Installing dependencies...
echo This may take a few minutes...
call npm ci
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

REM Build the project
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

REM Deploy to Vercel
echo [4/5] Deploying to Vercel...
echo This will open a browser window for authentication if needed
echo.
echo Please follow these steps:
echo 1. If a browser window opens, sign in to your Vercel account
echo 2. Authorize the CLI access
echo 3. Return to this window and wait for deployment to complete
echo.
pause
call npx vercel --prod --yes
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to deploy to Vercel
    echo Try running 'npx vercel login' first, then run this script again
    echo.
    pause
    exit /b 1
)

echo.
echo [5/5] Deployment completed!
echo =====================================================
echo.
echo 🎉 SUCCESS! Your website is now live!
echo.
echo Your Devix Solutions website has been deployed to Vercel.
echo Visit the URL provided above to see your live website.
echo.
echo Key features of your website:
echo  ✅ Professional design with animations
echo  ✅ Contact form with admin panel
echo  ✅ Responsive layout for all devices
echo  ✅ API endpoints for all functionality
echo.
echo To test your website:
echo  1. Visit the URL shown above
echo  2. Try the contact form
echo  3. Visit /admin to see messages (login required)
echo.
echo For support, visit: https://vercel.com/support
echo.
echo Press any key to exit...
pause >nul