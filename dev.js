#!/usr/bin/env node

// Development utility script for Devix Solutions
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Devix Solutions Development Utility\n');

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'start':
    startDevServer();
    break;
  case 'build':
    buildProject();
    break;
  case 'clean':
    cleanBuild();
    break;
  case 'deploy':
    deployProject();
    break;
  case 'help':
  default:
    showHelp();
}

function showHelp() {
  console.log('Available commands:');
  console.log('  start   - Start the development server');
  console.log('  build   - Build the project for production');
  console.log('  clean   - Clean build directories');
  console.log('  deploy  - Deploy to Vercel');
  console.log('  help    - Show this help message');
  console.log('\nUsage: node dev.js <command>');
}

function startDevServer() {
  console.log('🚀 Starting development server...');
  try {
    execSync('npm run dev', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to start development server:', error.message);
  }
}

function buildProject() {
  console.log('🏗️  Building project...');
  try {
    cleanBuild();
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Project built successfully');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
  }
}

function cleanBuild() {
  console.log('🧹 Cleaning build directories...');
  try {
    execSync('rm -rf .next out', { stdio: 'pipe' });
  } catch (error) {
    // Windows compatibility
    try {
      execSync('Remove-Item -Recurse -Force .next,out -ErrorAction SilentlyContinue', { stdio: 'pipe' });
    } catch (winError) {
      // Ignore errors
    }
  }
  console.log('✅ Build directories cleaned');
}

function deployProject() {
  console.log('🚀 Deploying project...');
  try {
    execSync('node deploy.js', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
  }
}