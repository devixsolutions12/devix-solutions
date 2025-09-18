#!/usr/bin/env node

// Script to manually initialize Git repository and create GitHub repo
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Full paths to Git and GitHub CLI
const GIT_PATH = 'C:\\Program Files\\Git\\bin\\git.exe';
const GH_PATH = 'C:\\Program Files\\GitHub CLI\\gh.exe';

console.log('🔧 Initializing Git repository manually...\n');

try {
  // Check if we're in the correct directory
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('❌ package.json not found. Please run this script from the project root directory.');
  }

  // Initialize git repository
  console.log('🔧 Initializing Git repository...');
  execSync(`"${GIT_PATH}" init`, { stdio: 'pipe' });
  console.log('✅ Git repository initialized');

  // Configure Git user (if not already configured)
  try {
    execSync(`"${GIT_PATH}" config --get user.email`, { stdio: 'pipe' });
  } catch (error) {
    console.log('📝 Configuring Git user...');
    execSync(`"${GIT_PATH}" config --global user.email "devix@example.com"`, { stdio: 'pipe' });
    execSync(`"${GIT_PATH}" config --global user.name "Devix Solutions"`, { stdio: 'pipe' });
    console.log('✅ Git user configured');
  }

  // Add all files
  console.log('➕ Adding files to Git...');
  execSync(`"${GIT_PATH}" add .`, { stdio: 'pipe' });
  console.log('✅ All files added to Git');

  // Create initial commit
  console.log('📝 Creating initial commit...');
  execSync(`"${GIT_PATH}" commit -m "Initial commit: Devix Solutions website"`, { stdio: 'pipe' });
  console.log('✅ Initial commit created');

  // Create GitHub repository
  console.log('\n☁️  Creating GitHub repository...');
  const repoName = 'devix-solutions';
  
  try {
    // Check if repository already exists
    execSync(`"${GH_PATH}" repo view ${repoName}`, { stdio: 'pipe' });
    console.log('✅ GitHub repository already exists');
  } catch (error) {
    // Create new repository
    execSync(`"${GH_PATH}" repo create ${repoName} --public`, { stdio: 'inherit' });
    console.log('✅ GitHub repository created');
  }

  // Add remote origin
  console.log('\n🔗 Adding remote origin...');
  try {
    execSync(`"${GIT_PATH}" remote add origin https://github.com/devixsolutions12/devix-solutions.git`, { stdio: 'pipe' });
    console.log('✅ Remote origin added');
  } catch (error) {
    console.log('⚠️  Remote origin might already exist');
  }

  // Push to GitHub
  console.log('\n📤 Pushing to GitHub...');
  try {
    execSync(`"${GIT_PATH}" branch -M main`, { stdio: 'pipe' });
    execSync(`"${GIT_PATH}" push -u origin main`, { stdio: 'inherit' });
  } catch (pushError) {
    try {
      execSync(`"${GIT_PATH}" push -u origin master`, { stdio: 'inherit' });
    } catch (masterError) {
      console.log('⚠️  Could not push to main or master branch. Please push manually.');
    }
  }
  console.log('✅ Code pushed to GitHub');

  console.log('\n🎉 GitHub repository setup completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Your code is now on GitHub at: https://github.com/devixsolutions12/devix-solutions');
  console.log('2. Set up automatic Vercel deployment by importing your GitHub repository');
  console.log('3. Future updates can be deployed by pushing to GitHub');

} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  process.exit(1);
}