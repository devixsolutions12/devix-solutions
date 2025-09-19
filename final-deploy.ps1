# Final Deployment Script
Write-Host "🚀 Initiating final deployment..." -ForegroundColor Cyan

# Navigate to the project directory
Set-Location "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"

# Check git status
Write-Host "🔍 Checking git status..." -ForegroundColor Yellow
git status

# Add all changes
Write-Host "➕ Adding all changes..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "Final fixes: Instagram contact info restored, pricing updated, WhatsApp redirection implemented"

# Push to GitHub to trigger deployment
Write-Host "📤 Pushing to GitHub to trigger deployment..." -ForegroundColor Yellow
git push origin master

Write-Host "✅ Changes pushed successfully!" -ForegroundColor Green
Write-Host "🌐 GitHub Actions will now deploy the updated website" -ForegroundColor Blue
Write-Host "🔗 Check deployment status at: https://github.com/devixsolutions12/devix-solutions/actions" -ForegroundColor White
Write-Host ""
Write-Host "📋 Summary of changes:" -ForegroundColor Cyan
Write-Host "   • Instagram contact info restored (visible but non-redirecting)" -ForegroundColor White
Write-Host "   • Pricing updated (Basic: ₹5,999, Professional: ₹15,999, Enterprise: ₹34,999)" -ForegroundColor White
Write-Host "   • Contact form submissions redirect to WhatsApp with pre-filled message" -ForegroundColor White
Write-Host ""
Write-Host "⏳ Deployment typically takes 2-5 minutes to complete" -ForegroundColor Yellow