#!/usr/bin/env node

// Script to help set up GitHub Actions secrets for Vercel deployment
const { execSync } = require('child_process');

console.log('🔧 GitHub Actions Setup for Vercel Deployment\n');

console.log('To set up automatic deployment with GitHub Actions, you need to add the following secrets to your GitHub repository:\n');

console.log('1. Go to your GitHub repository settings');
console.log('2. Navigate to "Settings" > "Secrets and variables" > "Actions"');
console.log('3. Click "New repository secret" and add each of the following:\n');

console.log('Secret Name: VERCEL_TOKEN');
console.log('Value: Your Vercel token (get from https://vercel.com/account/tokens)\n');

console.log('Secret Name: VERCEL_ORG_ID');
console.log('Value: Your Vercel organization ID (get from Vercel project settings)\n');

console.log('Secret Name: VERCEL_PROJECT_ID');
console.log('Value: Your Vercel project ID (get from Vercel project settings)\n');

console.log('Alternatively, you can use the GitHub CLI to set these secrets:\n');

console.log('gh secret set VERCEL_TOKEN --body="your-vercel-token"');
console.log('gh secret set VERCEL_ORG_ID --body="your-org-id"');
console.log('gh secret set VERCEL_PROJECT_ID --body="your-project-id"\n');

console.log('After setting these secrets, pushes to the main branch will automatically deploy to Vercel!');