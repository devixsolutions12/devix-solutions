@echo off
echo 🚀 Starting automated deployment of Devix Solutions to Vercel...
echo.

cd /d "%~dp0"

node deploy.js

echo.
echo Press any key to exit...
pause >nul