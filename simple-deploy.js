#!/usr/bin/env node

// Simple deployment script for Devix Solutions
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Simple Deployment Script for Devix Solutions\n');

try {
  // Check if we're in the correct directory
  if (!fs.existsSync('package.json')) {
    throw new Error('❌ package.json not found. Please run this script from the project root directory.');
  }

  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
    console.log('✅ Cleaned .next directory');
  }

  // Install dependencies
  console.log('📥 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build project
  console.log('🏗️  Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Project built successfully');

  console.log('\n🎉 Build completed successfully!');
  console.log('\nTo deploy to Vercel:');
  console.log('1. Run: vercel --prod');
  console.log('2. Follow the prompts to set up your project');
  console.log('3. When asked, select Next.js as the framework');

} catch (error) {
  console.error('\n❌ Deployment preparation failed:', error.message);
  process.exit(1);
}