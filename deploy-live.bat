@echo off
echo 🚀 Starting Devix Solutions Deployment to Vercel...
echo 📂 Working in directory: %cd%

echo 📦 Installing dependencies...
npm ci

echo 🔨 Building the project...
npm run build

echo 🌐 Deploying to Vercel...
npx vercel --prod --yes

echo ✅ Deployment completed successfully!
echo 🎉 Your website should now be live!
pause