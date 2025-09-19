const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Devix Solutions - Automated Deployment');
console.log('========================================\n');

// Function to execute command with error handling
function execCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      cwd: __dirname,
      stdio: 'inherit',
      ...options
    });
    return { success: true, result };
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    return { success: false, error };
  }
}

// Function to check if directory exists
function directoryExists(dirPath) {
  return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
}

// Function to check if file exists
function fileExists(filePath) {
  return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();
}

// Check project structure
console.log('🔍 Verifying project structure...');
const requiredFiles = [
  'package.json',
  'next.config.ts',
  'vercel.json',
  'src/app/page.tsx'
];

let allFilesFound = true;
requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (!fileExists(fullPath)) {
    console.log(`❌ Missing required file: ${file}`);
    allFilesFound = false;
  }
});

if (!allFilesFound) {
  console.log('\n❌ Critical error: Required files are missing');
  process.exit(1);
}

console.log('✅ Project structure verified\n');

// Check if build directory exists
console.log('🔍 Checking build status...');
const buildDir = path.join(__dirname, '.next');
if (!directoryExists(buildDir)) {
  console.log('🔨 Building project...');
  const buildResult = execCommand('npm run build:vercel');
  if (!buildResult.success) {
    console.log('\n❌ Build failed. Check error messages above.');
    process.exit(1);
  }
  console.log('✅ Project built successfully\n');
} else {
  console.log('✅ Project already built\n');
}

// Check Vercel CLI
console.log('🔍 Checking Vercel CLI...');
const vercelCheck = execCommand('npx vercel --version', { stdio: 'pipe' });
if (!vercelCheck.success) {
  console.log('📥 Installing Vercel CLI...');
  const installResult = execCommand('npm install -g vercel');
  if (!installResult.success) {
    console.log('❌ Failed to install Vercel CLI');
    process.exit(1);
  }
}

console.log('✅ Vercel CLI is ready\n');

// Deploy to Vercel
console.log('🚀 Deploying to Vercel...');
console.log('⚠️  If prompted, please authenticate in your browser\n');

const deployResult = execCommand('npx vercel --prod --yes --debug');
if (!deployResult.success) {
  console.log('\n❌ Deployment failed. Check error messages above.');
  console.log('\n🔧 Troubleshooting tips:');
  console.log('1. Check your internet connection');
  console.log('2. Verify you can access https://vercel.com');
  console.log('3. Try running "npx vercel login" manually');
  console.log('4. Check Vercel status: https://vercel.statuspage.io/');
  process.exit(1);
}

console.log('\n🎉 Deployment completed successfully!');
console.log('\n✅ Your Devix Solutions website is now live!');
console.log('\nNext steps:');
console.log('1. Visit the URL provided above to see your live website');
console.log('2. Test the contact form by filling it out');
console.log('3. Visit /admin to access your admin panel');
console.log('4. Share your website with the world!');