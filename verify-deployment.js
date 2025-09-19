#!/usr/bin/env node

// Script to verify deployment is working
const { execSync } = require('child_process');

console.log('🔍 Verifying Deployment Setup...\n');

try {
  // Check if Git is working
  console.log('✅ Checking Git...');
  execSync('git --version', { stdio: 'pipe' });
  
  // Check if Node.js is working
  console.log('✅ Checking Node.js...');
  execSync('node --version', { stdio: 'pipe' });
  
  // Check if npm is working
  console.log('✅ Checking npm...');
  execSync('npm --version', { stdio: 'pipe' });
  
  // Check if Vercel CLI is installed
  console.log('✅ Checking Vercel CLI...');
  execSync('vercel --version', { stdio: 'pipe' });
  
  console.log('\n🎉 All tools are properly installed!');
  console.log('\n🚀 Your deployment should now work correctly.');
  console.log('\n🔗 Visit https://github.com/devixsolutions12/devix-solutions/actions to monitor deployment progress.');
  
} catch (error) {
  console.error('\n❌ Verification failed:', error.message);
  console.log('\n🔧 Please install the missing tools and try again.');
}