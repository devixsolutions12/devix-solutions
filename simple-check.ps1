# Simple Website Check
Write-Host "🔍 Checking if website is accessible..." -ForegroundColor Cyan

$response = Invoke-WebRequest -Uri "https://devix-solutions.vercel.app" -Method HEAD -TimeoutSec 10 -ErrorAction SilentlyContinue

if ($response.StatusCode -eq 200) {
    Write-Host "✅ Website is accessible!" -ForegroundColor Green
    Write-Host "🌐 Visit: https://devix-solutions.vercel.app" -ForegroundColor Blue
} else {
    Write-Host "⏳ Website may still be deploying" -ForegroundColor Yellow
    Write-Host "⏰ Please wait a few more minutes and try again" -ForegroundColor Cyan
    Write-Host "🔗 Monitor: https://github.com/devixsolutions12/devix-solutions/actions" -ForegroundColor White
}