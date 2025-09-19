const fs = require('fs');
const path = require('path');

console.log('🔧 Devix Solutions - Vercel Build Configuration Fix');
console.log('================================================\n');

// Function to update vercel.json with Vercel-compatible settings
function updateVercelConfig() {
  const vercelConfigPath = path.join(__dirname, 'vercel.json');
  
  if (!fs.existsSync(vercelConfigPath)) {
    console.log('❌ vercel.json not found');
    return false;
  }
  
  try {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
    
    // Remove unsupported properties
    delete vercelConfig.nodeVersion;
    delete vercelConfig.regions;
    delete vercelConfig.buildEnv;
    
    // Ensure supported properties
    vercelConfig.version = 2;
    vercelConfig.buildCommand = "npm run build:vercel";
    vercelConfig.installCommand = "npm install";
    vercelConfig.outputDirectory = ".next";
    
    // Write updated config
    fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));
    console.log('✅ vercel.json updated with Vercel-compatible settings');
    return true;
  } catch (error) {
    console.log(`❌ Error updating vercel.json: ${error.message}`);
    return false;
  }
}

// Function to update package.json with robust build scripts
function updatePackageScripts() {
  const packagePath = path.join(__dirname, 'package.json');
  
  if (!fs.existsSync(packagePath)) {
    console.log('❌ package.json not found');
    return false;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Ensure build scripts exist
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts['build'] = 'next build';
    packageJson.scripts['build:vercel'] = 'next build';
    packageJson.scripts['build:ci'] = 'npm run clean && next build';
    packageJson.scripts['clean'] = 'rimraf .next';
    
    // Ensure rimraf is in devDependencies
    packageJson.devDependencies = packageJson.devDependencies || {};
    if (!packageJson.devDependencies.rimraf) {
      packageJson.devDependencies.rimraf = '^5.0.0';
    }
    
    // Write updated package.json
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('✅ package.json updated with robust build scripts');
    return true;
  } catch (error) {
    console.log(`❌ Error updating package.json: ${error.message}`);
    return false;
  }
}

// Function to create a Vercel build script
function createVercelBuildScript() {
  const buildScript = `#!/bin/bash
# Devix Solutions - Vercel Build Script

# Set environment variables
export NEXT_TELEMETRY_DISABLED=1

# Clean previous builds
if [ -d ".next" ]; then
  echo " Cleaning previous build..."
  rm -rf .next
fi

# Install dependencies
echo " Installing dependencies..."
npm install

# Build the project
echo " Building project..."
npm run build:vercel

echo " Build completed successfully!"
`;
  
  const scriptPath = path.join(__dirname, 'vercel-build.sh');
  fs.writeFileSync(scriptPath, buildScript);
  console.log('✅ Created vercel-build.sh script');
  return true;
}

// Execute all fixes
console.log('Applying Vercel build fixes...\n');

const vercelConfigSuccess = updateVercelConfig();
const packageScriptsSuccess = updatePackageScripts();
const buildScriptSuccess = createVercelBuildScript();

if (vercelConfigSuccess && packageScriptsSuccess && buildScriptSuccess) {
  console.log('\n🎉 All Vercel build fixes applied successfully!');
  console.log('\nNext steps:');
  console.log('1. Commit these changes to your repository');
  console.log('2. Push to GitHub to trigger a new Vercel deployment');
  console.log('3. Or redeploy manually with: npx vercel --prod');
  console.log('\nYour build should now succeed on Vercel!');
} else {
  console.log('\n❌ Some fixes failed to apply. Check the error messages above.');
  process.exit(1);
}