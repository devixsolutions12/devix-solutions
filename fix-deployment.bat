@echo off
echo 🔧 Fixing deployment issues...
echo.

REM Navigate to the project directory
cd /d "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions"

REM Check if there are any merge conflicts
echo 🔍 Checking for merge conflicts...
git status

REM Abort any ongoing merge
echo 🔄 Aborting any ongoing merge...
git merge --abort 2>nul

REM Reset to the latest commit
echo 🔄 Resetting to latest commit...
git reset --hard HEAD

REM Pull the latest changes
echo 📥 Pulling latest changes...
git pull origin master

REM Remove any conflicting files
echo 🧹 Cleaning up conflicting files...
if exist "package.json" del "package.json"

REM Create a clean package.json file
echo 📄 Creating clean package.json...
echo {
echo   "name": "devix-solutions",
echo   "version": "0.1.0",
echo   "private": true,
echo   "scripts": {
echo     "dev": "next dev --turbopack",
echo     "build": "next build",
echo     "build:vercel": "next build",
echo     "build:ci": "npm run clean && next build",
echo     "clean": "rimraf .next",
echo     "start": "next start",
echo     "lint": "eslint",
echo     "favicon": "node scripts/generate-favicon.js",
echo     "deploy": "node deploy.js",
echo     "dev-util": "node dev.js",
echo     "github-setup": "node github-setup.js",
echo     "github-setup-fixed": "node github-setup-fixed.js",
echo     "init-git-repo": "node init-git-repo.js",
echo     "setup-actions": "node setup-actions.js",
echo     "automate-deployment": "node automate-deployment.js",
echo     "check-deployment": "node check-deployment.js",
echo     "fix-deployment": "node fix-deployment.js",
echo     "robust-fix-deployment": "node robust-fix-deployment.js",
echo     "verify-deployment": "node verify-deployment.js",
echo     "simple-deploy": "node simple-deploy.js",
echo     "deploy-live": "node deploy-live.js"
echo   },
echo   "dependencies": {
echo     "framer-motion": "^12.23.14",
echo     "lucide-react": "^0.544.0",
echo     "next": "15.5.3",
echo     "react": "19.1.0",
echo     "react-dom": "19.1.0",
echo     "react-intersection-observer": "^9.16.0"
echo   },
echo   "devDependencies": {
echo     "@eslint/eslintrc": "^3",
echo     "@tailwindcss/postcss": "^4",
echo     "@types/node": "^20",
echo     "@types/react": "^19",
echo     "@types/react-dom": "^19",
echo     "eslint": "^9",
echo     "eslint-config-next": "15.5.3",
echo     "rimraf": "^5.0.0",
echo     "sharp": "^0.32.6",
echo     "tailwindcss": "^4",
echo     "typescript": "^5"
echo   }
echo } > package.json

REM Add all changes
echo ➕ Adding all changes...
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Fix deployment configuration and resolve merge conflicts"

REM Push changes
echo 🚀 Pushing changes to GitHub...
git push origin master

echo ✅ Deployment fix complete! Check GitHub Actions for deployment status.
echo 🔗 Visit: https://github.com/devixsolutions12/devix-solutions/actions
pause