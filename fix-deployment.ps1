# Fix Deployment Issues Script
Write-Host "🔧 Fixing deployment issues..." -ForegroundColor Yellow

# Navigate to the project directory
Set-Location "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions"

# Check if there are any merge conflicts
Write-Host "🔍 Checking for merge conflicts..." -ForegroundColor Cyan
git status

# Abort any ongoing merge
Write-Host "🔄 Aborting any ongoing merge..." -ForegroundColor Cyan
git merge --abort 2>$null

# Reset to the latest commit
Write-Host "🔄 Resetting to latest commit..." -ForegroundColor Cyan
git reset --hard HEAD

# Pull the latest changes
Write-Host "📥 Pulling latest changes..." -ForegroundColor Cyan
git pull origin master

# Remove any conflicting files
Write-Host "🧹 Cleaning up conflicting files..." -ForegroundColor Cyan
if (Test-Path "package.json") {
    Remove-Item "package.json" -Force
}

# Create a clean package.json file
Write-Host "📄 Creating clean package.json..." -ForegroundColor Cyan
$packageJson = @{
    name = "devix-solutions"
    version = "0.1.0"
    private = $true
    scripts = @{
        dev = "next dev --turbopack"
        build = "next build"
        "build:vercel" = "next build"
        "build:ci" = "npm run clean && next build"
        clean = "rimraf .next"
        start = "next start"
        lint = "eslint"
        favicon = "node scripts/generate-favicon.js"
        deploy = "node deploy.js"
        "dev-util" = "node dev.js"
        "github-setup" = "node github-setup.js"
        "github-setup-fixed" = "node github-setup-fixed.js"
        "init-git-repo" = "node init-git-repo.js"
        "setup-actions" = "node setup-actions.js"
        "automate-deployment" = "node automate-deployment.js"
        "check-deployment" = "node check-deployment.js"
        "fix-deployment" = "node fix-deployment.js"
        "robust-fix-deployment" = "node robust-fix-deployment.js"
        "verify-deployment" = "node verify-deployment.js"
        "simple-deploy" = "node simple-deploy.js"
        "deploy-live" = "node deploy-live.js"
    }
    dependencies = @{
        "framer-motion" = "^12.23.14"
        "lucide-react" = "^0.544.0"
        "next" = "15.5.3"
        "react" = "19.1.0"
        "react-dom" = "19.1.0"
        "react-intersection-observer" = "^9.16.0"
    }
    devDependencies = @{
        "@eslint/eslintrc" = "^3"
        "@tailwindcss/postcss" = "^4"
        "@types/node" = "^20"
        "@types/react" = "^19"
        "@types/react-dom" = "^19"
        "eslint" = "^9"
        "eslint-config-next" = "15.5.3"
        "rimraf" = "^5.0.0"
        "sharp" = "^0.32.6"
        "tailwindcss" = "^4"
        "typescript" = "^5"
    }
}

$packageJson | ConvertTo-Json -Depth 10 | Out-File -FilePath "package.json" -Encoding UTF8

# Add all changes
Write-Host "➕ Adding all changes..." -ForegroundColor Cyan
git add .

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Cyan
git commit -m "Fix deployment configuration and resolve merge conflicts"

# Push changes
Write-Host "🚀 Pushing changes to GitHub..." -ForegroundColor Cyan
git push origin master

Write-Host "✅ Deployment fix complete! Check GitHub Actions for deployment status." -ForegroundColor Green
Write-Host "🔗 Visit: https://github.com/devixsolutions12/devix-solutions/actions" -ForegroundColor Blue