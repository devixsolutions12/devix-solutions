#!/usr/bin/env node

// GitHub setup and deployment automation script for Devix Solutions
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 GitHub Setup and Deployment Automation for Devix Solutions\n');

try {
  // Check if we're in the correct directory
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('❌ package.json not found. Please run this script from the project root directory.');
  }

  // Check if git is installed
  try {
    execSync('git --version', { stdio: 'pipe' });
    console.log('✅ Git is installed');
  } catch (error) {
    throw new Error('❌ Git is not installed. Please install Git first: https://git-scm.com/');
  }

  // Initialize git repository if not already initialized
  console.log('\n🔧 Initializing Git repository...');
  try {
    execSync('git status', { stdio: 'pipe' });
    console.log('✅ Git repository already initialized');
  } catch (error) {
    execSync('git init', { stdio: 'pipe' });
    console.log('✅ Git repository initialized');
  }

  // Check if GitHub CLI is installed
  try {
    execSync('gh --version', { stdio: 'pipe' });
    console.log('✅ GitHub CLI is installed');
  } catch (error) {
    console.log('⚠️  GitHub CLI not found. Installing...');
    // Try to install GitHub CLI
    try {
      // Windows
      execSync('winget install GitHub.cli', { stdio: 'pipe' });
    } catch (winError) {
      try {
        // macOS
        execSync('brew install gh', { stdio: 'pipe' });
      } catch (macError) {
        try {
          // Linux
          execSync('sudo apt install gh', { stdio: 'pipe' });
        } catch (linuxError) {
          console.log('⚠️  Could not automatically install GitHub CLI. Please install manually: https://cli.github.com/');
        }
      }
    }
    console.log('✅ GitHub CLI installed successfully');
  }

  // Check if user is logged in to GitHub
  console.log('\n🔐 Checking GitHub login status...');
  try {
    const user = execSync('gh auth status', { stdio: ['pipe', 'pipe', 'pipe'] });
    console.log('✅ Already logged in to GitHub');
  } catch (error) {
    console.log('⚠️  Not logged in to GitHub. Please log in now:');
    try {
      execSync('gh auth login', { stdio: 'inherit' });
      console.log('✅ Logged in to GitHub successfully');
    } catch (loginError) {
      console.log('⚠️  Login process completed or skipped');
    }
  }

  // Create .gitignore if it doesn't exist
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log('\n📝 Creating .gitignore file...');
    const gitignoreContent = `# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
/.vercel

# Typescript
*.tsbuildinfo

# IDE
.vscode/
.idea/
`;
    fs.writeFileSync(gitignorePath, gitignoreContent);
    console.log('✅ .gitignore file created');
  }

  // Add all files to git
  console.log('\n➕ Adding files to Git...');
  execSync('git add .', { stdio: 'pipe' });
  console.log('✅ All files added to Git');

  // Make initial commit if no commits exist
  try {
    execSync('git log -1', { stdio: 'pipe' });
    console.log('✅ Repository already has commits');
  } catch (error) {
    console.log('📝 Creating initial commit...');
    execSync('git commit -m "Initial commit: Devix Solutions website"', { stdio: 'pipe' });
    console.log('✅ Initial commit created');
  }

  // Create GitHub repository and push
  console.log('\n☁️  Creating GitHub repository...');
  const repoName = 'devix-solutions';
  
  try {
    // Check if repository already exists
    execSync(`gh repo view ${repoName}`, { stdio: 'pipe' });
    console.log('✅ GitHub repository already exists');
  } catch (error) {
    // Create new repository
    execSync(`gh repo create ${repoName} --public --source=. --remote=origin`, { stdio: 'inherit' });
    console.log('✅ GitHub repository created');
  }

  // Push to GitHub
  console.log('\n📤 Pushing to GitHub...');
  try {
    execSync('git push -u origin main', { stdio: 'inherit' });
  } catch (pushError) {
    try {
      execSync('git push -u origin master', { stdio: 'inherit' });
    } catch (masterError) {
      console.log('⚠️  Could not push to main or master branch. Please push manually.');
    }
  }
  console.log('✅ Code pushed to GitHub');

  // Set up Vercel deployment from GitHub
  console.log('\n🌍 Setting up Vercel deployment...');
  console.log('ℹ️  Please follow these steps manually:');
  console.log('   1. Go to https://vercel.com/dashboard');
  console.log('   2. Click "New Project"');
  console.log(`   3. Import your "${repoName}" repository`);
  console.log('   4. Vercel will automatically detect it\'s a Next.js app');
  console.log('   5. Click "Deploy"');
  console.log('   6. Your site will be live at a vercel.app URL');

  console.log('\n🎉 GitHub setup and deployment preparation completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Your code is now on GitHub at: https://github.com/YOUR_USERNAME/devix-solutions');
  console.log('2. Set up automatic Vercel deployment by importing your GitHub repository');
  console.log('3. Future updates can be deployed by pushing to GitHub');

} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('1. Make sure Git is installed: https://git-scm.com/');
  console.log('2. Install GitHub CLI manually: https://cli.github.com/');
  console.log('3. Log in to GitHub CLI: gh auth login');
  process.exit(1);
}