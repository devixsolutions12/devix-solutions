# Check Website Status
Write-Host "🔍 Checking website status..." -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "https://devix-solutions.vercel.app" -Method HEAD -TimeoutSec 15
    Write-Host "✅ Website is accessible!" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🌐 Your website is now live at:" -ForegroundColor Blue
    Write-Host "   https://devix-solutions.vercel.app" -ForegroundColor White
    Write-Host ""
    Write-Host "📋 Please verify the following:" -ForegroundColor Cyan
    Write-Host "   1. Instagram contact info is visible but doesn't redirect" -ForegroundColor White
    Write-Host "   2. Pricing has been updated:" -ForegroundColor White
    Write-Host "      - Basic: ₹5,999" -ForegroundColor White
    Write-Host "      - Professional: ₹15,999" -ForegroundColor White
    Write-Host "      - Enterprise: ₹34,999" -ForegroundColor White
    Write-Host "   3. Contact form redirects to WhatsApp" -ForegroundColor White
}
catch {
    Write-Host "⏳ Website is still deploying or not yet accessible" -ForegroundColor Yellow
    Write-Host "This is normal as deployments can take 3-5 minutes to complete" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🔄 Please check back in a few minutes" -ForegroundColor Yellow
    Write-Host "🔗 You can monitor deployment progress at:" -ForegroundColor Blue
    Write-Host "   https://github.com/devixsolutions12/devix-solutions/actions" -ForegroundColor White
    Write-Host ""
    Write-Host "🌐 Your website will be available at:" -ForegroundColor Blue
    Write-Host "   https://devix-solutions.vercel.app" -ForegroundColor White
}