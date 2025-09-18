#!/usr/bin/env node

// Automated deployment script for Devix Solutions to Vercel
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting automated deployment of Devix Solutions to Vercel...\n');

try {
  // Check if we're in the correct directory
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('❌ package.json not found. Please run this script from the project root directory.');
  }

  // Check if Vercel CLI is installed
  try {
    execSync('vercel --version', { stdio: 'pipe' });
    console.log('✅ Vercel CLI is installed');
  } catch (error) {
    console.log('⚠️  Vercel CLI not found. Installing...');
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully');
  }

  // Clean previous builds
  console.log('\n🧹 Cleaning previous builds...');
  try {
    execSync('rm -rf .next out', { stdio: 'pipe' });
    console.log('✅ Build directories cleaned');
  } catch (error) {
    // Windows compatibility
    try {
      execSync('Remove-Item -Recurse -Force .next,out -ErrorAction SilentlyContinue', { stdio: 'pipe' });
      console.log('✅ Build directories cleaned');
    } catch (winError) {
      console.log('ℹ️  No previous builds to clean');
    }
  }

  // Build the project
  console.log('\n🏗️  Building the project...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Project built successfully');

  // Check if user is logged in to Vercel
  console.log('\n🔐 Checking Vercel login status...');
  try {
    execSync('vercel whoami', { stdio: 'pipe' });
    console.log('✅ Already logged in to Vercel');
  } catch (error) {
    console.log('⚠️  Not logged in to Vercel. Please log in now:');
    console.log('ℹ️  A browser window will open for you to log in');
    console.log('ℹ️  After logging in, return to this terminal\n');
    
    try {
      execSync('vercel login', { stdio: 'inherit' });
      console.log('✅ Logged in to Vercel successfully');
    } catch (loginError) {
      console.log('⚠️  Login process completed or skipped');
    }
  }

  // Deploy to Vercel with --yes flag to skip prompts
  console.log('\n🚀 Deploying to Vercel...');
  console.log('ℹ️  Deploying with default settings...');
  
  // Run vercel deploy command with --yes flag
  execSync('vercel --yes --public', { stdio: 'inherit' });
  
  console.log('\n🎉 Deployment completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Visit your deployed website using the URL provided above');
  console.log('2. Test the contact form - it should work exactly like on localhost');
  console.log('3. Access the admin panel at /admin/login with credentials:');
  console.log('   Username: admin');
  console.log('   Password: devix2025');
  console.log('4. All messages submitted through the contact form will be visible in the admin panel');
  
} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('1. Make sure you have an internet connection');
  console.log('2. Check if Node.js is installed: node --version');
  console.log('3. Try manually logging in: vercel login');
  console.log('4. Try manual deployment: vercel --yes');
  process.exit(1);
}