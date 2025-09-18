@echo off
echo 🚀 GitHub Setup and Deployment Automation for Devix Solutions
echo.

cd /d "%~dp0"

node github-setup.js

echo.
echo Press any key to exit...
pause >nul