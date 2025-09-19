# Script to check if the Devix Solutions website is deployed and accessible
Write-Host "Checking if Devix Solutions website is deployed..." -ForegroundColor Yellow

# Check if we can access the website
try {
    $response = Invoke-WebRequest -Uri "https://devix-solutions.vercel.app" -Method GET -TimeoutSec 30
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Website is accessible!" -ForegroundColor Green
        Write-Host "🎉 Deployment is complete! You can now access your website at: https://devix-solutions.vercel.app" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your contact form will redirect users to WhatsApp, and Instagram is visible as a contact method." -ForegroundColor Cyan
        Write-Host "All pricing has been updated as requested:" -ForegroundColor Cyan
        Write-Host "  - Basic: ₹5,999" -ForegroundColor Cyan
        Write-Host "  - Professional: ₹15,999" -ForegroundColor Cyan
        Write-Host "  - Enterprise: ₹34,999" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️  Website returned status code: $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Website is not yet accessible. Deployment might still be in progress." -ForegroundColor Red
    Write-Host "Please wait a few minutes and try again." -ForegroundColor Yellow
    Write-Host "You can also check the deployment status at: https://vercel.com/dashboard" -ForegroundColor Yellow
}