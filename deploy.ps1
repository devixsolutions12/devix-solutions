# PowerShell deployment script for Devix Solutions
Write-Host "🚀 Starting automated deployment of Devix Solutions to Vercel..." -ForegroundColor Green
Write-Host ""

Set-Location -Path $PSScriptRoot

node deploy.js

Write-Host ""
Write-Host "Press any key to exit..."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")