const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Devix Solutions - Robust Deployment Fix');
console.log('========================================\n');

// Function to execute command with error handling
function execCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      cwd: __dirname,
      stdio: 'inherit',
      ...options
    });
    return { success: true, result };
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    return { success: false, error };
  }
}

// Function to safely remove directory
function removeDirectory(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      console.log(`🗑️  Removing ${path.basename(dirPath)}...`);
      
      // Try different approaches to remove directory
      const approaches = [
        () => execSync(`rd /s /q "${dirPath}"`, { cwd: __dirname, stdio: 'ignore' }),
        () => execSync(`rmdir /s /q "${dirPath}"`, { cwd: __dirname, stdio: 'ignore' }),
        () => fs.rmSync(dirPath, { recursive: true, force: true })
      ];
      
      for (const approach of approaches) {
        try {
          approach();
          if (!fs.existsSync(dirPath)) {
            console.log(`✅ ${path.basename(dirPath)} removed`);
            return true;
          }
        } catch (error) {
          // Continue to next approach
        }
      }
      
      // If all approaches failed
      console.log(`⚠️  Could not remove ${path.basename(dirPath)}, please remove manually`);
      return false;
    } else {
      console.log(`✅ No ${path.basename(dirPath)} to remove`);
      return true;
    }
  } catch (error) {
    console.log(`⚠️  Error removing ${path.basename(dirPath)}: ${error.message}`);
    return false;
  }
}

// Function to remove file
function removeFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      console.log(`🗑️  Removing ${path.basename(filePath)}...`);
      fs.unlinkSync(filePath);
      console.log(`✅ ${path.basename(filePath)} removed`);
    } else {
      console.log(`✅ No ${path.basename(filePath)} to remove`);
    }
  } catch (error) {
    console.log(`⚠️  Could not remove ${path.basename(filePath)}: ${error.message}`);
  }
}

// Function to check for duplicate files in parent directories
function checkForDuplicateFiles() {
  console.log('🔍 Checking for duplicate configuration files...\n');
  
  const parentDir = path.join(__dirname, '..');
  const duplicateFiles = ['package.json', 'package-lock.json'];
  
  duplicateFiles.forEach(file => {
    const parentFilePath = path.join(parentDir, file);
    if (fs.existsSync(parentFilePath)) {
      console.log(`⚠️  Duplicate ${file} found in parent directory`);
      console.log(`   Location: ${parentFilePath}`);
      console.log(`   Recommendation: Remove this file to prevent conflicts\n`);
    }
  });
}

// Main fix process
console.log('Starting robust deployment fix...\n');

// 1. Check for duplicate files
checkForDuplicateFiles();

// 2. Remove package-lock.json
removeFile(path.join(__dirname, 'package-lock.json'));

// 3. Remove node_modules (with multiple approaches)
removeDirectory(path.join(__dirname, 'node_modules'));

// 4. Remove .next directory
removeDirectory(path.join(__dirname, '.next'));

// 5. Clean npm cache
console.log('🧼 Cleaning npm cache...');
const cleanCacheResult = execCommand('npm cache clean --force', { stdio: 'pipe' });
if (cleanCacheResult.success) {
  console.log('✅ npm cache cleaned');
} else {
  console.log('⚠️  Failed to clean npm cache (may not be an issue)');
}

// 6. Install dependencies
console.log('\n📥 Installing dependencies...');
const installResult = execCommand('npm install', { stdio: 'pipe' });
if (installResult.success) {
  console.log('✅ Dependencies installed successfully');
} else {
  console.log('❌ Failed to install dependencies');
  console.log('Trying alternative installation method...\n');
  
  // Try ci installation
  const ciResult = execCommand('npm ci', { stdio: 'pipe' });
  if (ciResult.success) {
    console.log('✅ Dependencies installed with npm ci');
  } else {
    console.log('❌ Both npm install and npm ci failed');
    console.log('Please check your internet connection and try again');
    process.exit(1);
  }
}

// 7. Verify configuration files
console.log('\n📋 Verifying configuration files...\n');

const configFiles = ['package.json', 'vercel.json', 'next.config.ts'];
configFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} found`);
  } else {
    console.log(`❌ ${file} missing - this may cause deployment issues`);
  }
});

console.log('\n🎉 Robust deployment fix completed!');
console.log('\nNext steps:');
console.log('1. Run: npm run build:vercel');
console.log('2. Run: npx vercel --prod');
console.log('\nIf deployment still fails, check the FIX_BUILD_ERROR.md guide for more solutions.');