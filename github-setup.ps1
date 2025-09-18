# PowerShell GitHub setup script for Devix Solutions
Write-Host "🚀 GitHub Setup and Deployment Automation for Devix Solutions" -ForegroundColor Green
Write-Host ""

Set-Location -Path $PSScriptRoot

node github-setup.js

Write-Host ""
Write-Host "Press any key to exit..."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")