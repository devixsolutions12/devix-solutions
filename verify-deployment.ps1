# Verify Deployment Script
Write-Host "🔍 Verifying deployment..." -ForegroundColor Cyan

# Navigate to the project directory
Set-Location "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"

# Show latest commit
Write-Host "📋 Latest commit:" -ForegroundColor Yellow
git log --oneline -1

Write-Host ""
Write-Host "✅ DEPLOYMENT TRIGGERED SUCCESSFULLY!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 GitHub Actions is now deploying your website" -ForegroundColor Blue
Write-Host "🔗 Check deployment progress at: https://github.com/devixsolutions12/devix-solutions/actions" -ForegroundColor White
Write-Host ""
Write-Host "📋 Summary of fixes included in this deployment:" -ForegroundColor Cyan
Write-Host "   • Instagram contact info restored (visible but non-redirecting)" -ForegroundColor White
Write-Host "   • Pricing updated:" -ForegroundColor White
Write-Host "     - Basic: ₹5,999" -ForegroundColor White
Write-Host "     - Professional: ₹15,999" -ForegroundColor White
Write-Host "     - Enterprise: ₹34,999" -ForegroundColor White
Write-Host "   • Contact form submissions redirect to WhatsApp with pre-filled message" -ForegroundColor White
Write-Host "   • Removed admin panel to prevent errors" -ForegroundColor White
Write-Host ""
Write-Host "⏰ Timeline:" -ForegroundColor Yellow
Write-Host "   Deployment should complete in 3-5 minutes" -ForegroundColor White
Write-Host ""
Write-Host "📱 After deployment, test your website at:" -ForegroundColor Cyan
Write-Host "   https://devix-solutions.vercel.app" -ForegroundColor White
Write-Host ""
Write-Host "✅ What to expect after deployment:" -ForegroundColor Green
Write-Host "   1. Instagram visible in contact section but does not redirect" -ForegroundColor White
Write-Host "   2. Updated pricing on the pricing page" -ForegroundColor White
Write-Host "   3. Contact form redirects to WhatsApp with message pre-filled" -ForegroundColor White
Write-Host "   4. No admin panel errors" -ForegroundColor White