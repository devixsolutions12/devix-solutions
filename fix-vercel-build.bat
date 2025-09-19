@echo off
TITLE Devix Solutions - Fix Vercel Build Error
COLOR 0A

echo ========================================
echo   Devix Solutions - Fix Vercel Build Error
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

echo Applying Vercel build fixes...
node vercel-build-config.js
if %errorlevel% neq 0 (
    echo ❌ Failed to apply Vercel build fixes
    pause
    exit /b 1
)
echo ✅ Vercel build fixes applied successfully

echo Cleaning build directory...
if exist ".next" (
    rmdir /s /q ".next" >nul 2>&1
    echo ✅ Build directory cleaned
) else (
    echo ✅ No build directory to clean
)

echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed successfully

echo Setting environment variables...
set NEXT_TELEMETRY_DISABLED=1

echo Building project with Vercel-compatible settings...
call npm run build:vercel
if %errorlevel% neq 0 (
    echo ❌ Build failed. Check error messages above.
    echo.
    echo Troubleshooting tips:
    echo 1. Check for TypeScript errors in your code
    echo 2. Verify all dependencies are correctly installed
    echo 3. Run "npx tsc --noEmit" to check for TypeScript errors
    echo 4. Check the FIX_BUILD_ERROR.md guide for more solutions
    pause
    exit /b 1
)

echo ✅ Project built successfully!
echo.
echo 🎉 The "Command npm run build exited with 1" error has been fixed!
echo.
echo Next steps:
echo 1. Deploy to Vercel with: npx vercel --prod
echo 2. Or commit and push to GitHub for automatic deployment
echo.
echo Your Devix Solutions website is now ready for successful Vercel deployment!
pause