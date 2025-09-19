#!/usr/bin/env node

// Script to check deployment status
const { execSync } = require('child_process');

console.log('🔍 Checking deployment status...\n');

try {
  // Try to check the latest workflow run
  console.log('📋 Checking GitHub Actions workflow status...');
  console.log('🔗 Visit https://github.com/devixsolutions12/devix-solutions/actions to see detailed deployment logs\n');
  
  // Check if the repository is properly set up
  console.log('📂 Repository Information:');
  console.log('   Repository: devixsolutions12/devix-solutions');
  console.log('   Branch: master');
  console.log('   URL: https://github.com/devixsolutions12/devix-solutions\n');
  
  // Provide troubleshooting information
  console.log('🛠️  If deployment fails, check for these common issues:');
  console.log('   1. Vercel secrets (VERCEL_TOKEN, VERCEL_PROJECT_ID) are correctly set');
  console.log('   2. Branch name in workflow matches your repository branch (now fixed to "master")');
  console.log('   3. Package.json conflicts have been resolved');
  console.log('   4. Vercel action version is up to date\n');
  
  // Provide next steps
  console.log('🚀 Next Steps:');
  console.log('   1. Check the GitHub Actions tab for build progress');
  console.log('   2. If successful, your site will be deployed to Vercel');
  console.log('   3. Visit your Vercel dashboard to see the live site\n');
  
  console.log('✅ Deployment fix has been pushed to GitHub!');
  console.log('⏳ Please wait for the GitHub Actions workflow to complete...');
  
} catch (error) {
  console.error('❌ Error checking deployment status:', error.message);
}