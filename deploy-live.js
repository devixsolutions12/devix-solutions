const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting Devix Solutions Deployment to Vercel...');

try {
  // Change to the project directory
  const projectDir = path.resolve(__dirname);
  console.log(`📂 Working in directory: ${projectDir}`);
  
  // Clean install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm ci', { cwd: projectDir, stdio: 'inherit' });
  
  // Build the project
  console.log('🔨 Building the project...');
  execSync('npm run build', { cwd: projectDir, stdio: 'inherit' });
  
  // Deploy to Vercel
  console.log('🌐 Deploying to Vercel...');
  execSync('npx vercel --prod --yes', { cwd: projectDir, stdio: 'inherit' });
  
  console.log('✅ Deployment completed successfully!');
  console.log('🎉 Your website should now be live!');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}