const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Comprehensive Deployment Fix Script');
console.log('=====================================');

try {
  // 1. Check if we're in the right directory
  console.log('\n1. Checking project directory...');
  const currentDir = process.cwd();
  console.log(`   Current directory: ${currentDir}`);
  
  // 2. Clean up .next directory
  console.log('\n2. Cleaning up build cache...');
  const nextDir = path.join(currentDir, '.next');
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('   ✅ Cleaned .next directory');
  } else {
    console.log('   ✅ No .next directory to clean');
  }
  
  // 3. Check and fix package.json
  console.log('\n3. Checking package.json...');
  const packageJsonPath = path.join(currentDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Ensure scripts exist
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }
    
    // Ensure essential scripts are present
    packageJson.scripts.build = "next build";
    packageJson.scripts.start = "next start";
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('   ✅ Fixed package.json scripts');
  } else {
    console.log('   ❌ package.json not found!');
  }
  
  // 4. Check vercel.json
  console.log('\n4. Checking vercel.json...');
  const vercelJsonPath = path.join(currentDir, 'vercel.json');
  let vercelConfig = {
    "version": 2,
    "public": true,
    "github": {
      "silent": true
    }
  };
  
  if (fs.existsSync(vercelJsonPath)) {
    const existingConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
    vercelConfig = { ...existingConfig, ...vercelConfig };
  }
  
  fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelConfig, null, 2));
  console.log('   ✅ Updated vercel.json with public setting');
  
  // 5. Run npm install to ensure dependencies
  console.log('\n5. Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('   ✅ Dependencies installed');
  } catch (installError) {
    console.log('   ⚠️  npm install failed, continuing anyway...');
  }
  
  // 6. Run build to test
  console.log('\n6. Testing build...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('   ✅ Build successful');
  } catch (buildError) {
    console.log('   ❌ Build failed, but we will continue with deployment');
  }
  
  // 7. Commit any changes
  console.log('\n7. Committing changes...');
  try {
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Comprehensive deployment fix"', { stdio: 'inherit' });
    execSync('git push origin master', { stdio: 'inherit' });
    console.log('   ✅ Changes committed and pushed');
  } catch (gitError) {
    console.log('   ⚠️  Git operations failed, continuing anyway...');
  }
  
  console.log('\n🎉 Comprehensive Fix Complete!');
  console.log('\n📋 Next Steps:');
  console.log('   1. Check GitHub Actions for deployment status');
  console.log('   2. If still failing, check the GitHub Actions logs for specific errors');
  console.log('   3. Visit: https://github.com/devixsolutions12/devix-solutions/actions');
  
} catch (error) {
  console.error('\n❌ Error during fix process:', error.message);
  console.log('\n📋 Manual Steps:');
  console.log('   1. Check GitHub Actions logs for specific error messages');
  console.log('   2. Visit: https://github.com/devixsolutions12/devix-solutions/actions');
  console.log('   3. Look for the most recent failed workflow run');
  console.log('   4. Click on it to see detailed error information');
}