Write-Host "🚀 Triggering automated deployment to Vercel..." -ForegroundColor Green
Write-Host ""

Set-Location -Path "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"
node automate-deployment.js

Write-Host ""
Write-Host "🎉 Deployment process initiated!" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 Check your deployment progress at: https://github.com/devixsolutions12/devix-solutions/actions" -ForegroundColor Blue
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Yellow
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")