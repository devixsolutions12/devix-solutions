Write-Host "🚀 Starting Devix Solutions Deployment to Vercel..." -ForegroundColor Green

try {
    # Change to the project directory
    $projectDir = Get-Location
    Write-Host "📂 Working in directory: $projectDir" -ForegroundColor Blue
    
    # Clean install dependencies
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm ci
    
    # Build the project
    Write-Host "🔨 Building the project..." -ForegroundColor Yellow
    npm run build
    
    # Deploy to Vercel
    Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Yellow
    npx vercel --prod --yes
    
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host "🎉 Your website should now be live!" -ForegroundColor Green
} catch {
    Write-Error "❌ Deployment failed: $($_.Exception.Message)"
    exit 1
}