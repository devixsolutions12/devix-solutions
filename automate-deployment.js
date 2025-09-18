#!/usr/bin/env node

// Script to automate deployment by making a small change and pushing to GitHub
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Full paths to Git
const GIT_PATH = 'C:\\Program Files\\Git\\bin\\git.exe';

console.log('🚀 Automating Deployment to Vercel via GitHub Actions\n');

try {
  // Check if we're in the correct directory
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('❌ package.json not found. Please run this script from the project root directory.');
  }

  // Add all files (in case there are any changes)
  console.log('➕ Adding any changed files...');
  execSync(`"${GIT_PATH}" add .`, { stdio: 'pipe' });
  console.log('✅ All files added');

  // Create a small change to ensure we have something to commit
  const timestamp = new Date().toISOString();
  const deploymentLogPath = path.join(process.cwd(), 'DEPLOYMENT_LOG.md');
  
  // Create or update deployment log
  const logContent = `# Deployment Log

## Latest Deployment
- Timestamp: ${timestamp}
- Status: Automated deployment initiated

This file is automatically updated to trigger deployments.
`;
  
  fs.writeFileSync(deploymentLogPath, logContent);
  console.log('📝 Updated deployment log');

  // Add the deployment log
  execSync(`"${GIT_PATH}" add DEPLOYMENT_LOG.md`, { stdio: 'pipe' });
  console.log('✅ Deployment log added to Git');

  // Commit the changes
  console.log('📝 Creating commit...');
  execSync(`"${GIT_PATH}" commit -m "Automated deployment trigger - ${timestamp}"`, { stdio: 'pipe' });
  console.log('✅ Commit created');

  // Push to GitHub (this will trigger the GitHub Actions workflow)
  console.log('\n📤 Pushing to GitHub to trigger deployment...');
  try {
    execSync(`"${GIT_PATH}" push origin master`, { stdio: 'inherit' });
    console.log('✅ Code pushed to GitHub');
    console.log('\n🎉 Deployment initiated successfully!');
    console.log('\n🔄 GitHub Actions will now:');
    console.log('   1. Build your Next.js project');
    console.log('   2. Deploy to Vercel using your secrets');
    console.log('   3. Make your site live at your Vercel URL');
    console.log('\n🔗 Check your deployment progress at: https://github.com/devixsolutions12/devix-solutions/actions');
  } catch (pushError) {
    console.log('⚠️  Push failed. You may need to set up your Git credentials.');
    console.log('🔧 Try running: git push origin master');
    throw pushError;
  }

} catch (error) {
  console.error('\n❌ Deployment automation failed:', error.message);
  process.exit(1);
}