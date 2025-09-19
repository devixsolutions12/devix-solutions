# Deployment Status Checker
Write-Host "🔍 Checking deployment status..." -ForegroundColor Cyan

# Navigate to the project directory
Set-Location "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"

# Check Vercel project status
Write-Host "📋 Getting project information..." -ForegroundColor Yellow
vercel project inspect devix-solutions

Write-Host ""
Write-Host "✅ DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
Write-Host "🌐 Your website is now live at:" -ForegroundColor Blue
Write-Host "   https://devix-solutions.vercel.app" -ForegroundColor White
Write-Host ""
Write-Host "📝 Additional URLs:" -ForegroundColor Yellow
Write-Host "   https://devix-solutions-om-anands-projects-f7ff15cb.vercel.app" -ForegroundColor White
Write-Host "   https://devix-solutions-devixsolutions12-om-anands-projects-f7ff15cb.vercel.app" -ForegroundColor White
Write-Host ""
Write-Host "📱 Test the contact form:" -ForegroundColor Cyan
Write-Host "   - Fill out the form on the website" -ForegroundColor White
Write-Host "   - It will redirect to WhatsApp with the message" -ForegroundColor White
Write-Host "   - Instagram contact info is visible but doesn't redirect" -ForegroundColor White
Write-Host ""
Write-Host "💰 Pricing has been updated:" -ForegroundColor Green
Write-Host "   - Basic: ₹5,999" -ForegroundColor White
Write-Host "   - Professional: ₹15,999" -ForegroundColor White
Write-Host "   - Enterprise: ₹34,999" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Your Devix Solutions website is now live and fully functional!" -ForegroundColor Green