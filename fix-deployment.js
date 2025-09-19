#!/usr/bin/env node

// Script to fix common deployment issues
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Common Deployment Issues...\n');

try {
  // Check if we're in the correct directory
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('❌ package.json not found. Please run this script from the project root directory.');
  }

  // Fix package-lock.json issues
  console.log('🗑️  Removing package-lock.json...');
  if (fs.existsSync('package-lock.json')) {
    fs.unlinkSync('package-lock.json');
    console.log('✅ package-lock.json removed');
  }

  // Fix node_modules issues
  console.log('🗑️  Removing node_modules...');
  if (fs.existsSync('node_modules')) {
    fs.rmSync('node_modules', { recursive: true, force: true });
    console.log('✅ node_modules removed');
  }

  // Clean npm cache
  console.log('🧹 Cleaning npm cache...');
  try {
    execSync('npm cache clean --force', { stdio: 'pipe' });
    console.log('✅ npm cache cleaned');
  } catch (error) {
    console.log('⚠️  Could not clean npm cache');
  }

  // Install dependencies
  console.log('📥 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');

  // Build project
  console.log('🏗️  Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Project built successfully');

  console.log('\n🎉 All deployment issues fixed!');
  console.log('\n🚀 Next steps:');
  console.log('1. Commit and push to GitHub to trigger deployment');
  console.log('2. Or deploy directly with: vercel --prod');

} catch (error) {
  console.error('\n❌ Fix failed:', error.message);
  process.exit(1);
}