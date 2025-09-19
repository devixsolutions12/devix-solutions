const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Devix Solutions - Build Troubleshooter');
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

// Function to check if file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Check Node.js and npm versions
console.log('Checking environment...\n');

try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
  console.log('❌ Node.js not found');
}

try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' });
  console.log(`npm version: ${npmVersion.trim()}\n`);
} catch (error) {
  console.log('❌ npm not found\n');
}

// Check required files
console.log('Checking required files...\n');

const requiredFiles = [
  'package.json',
  'next.config.ts',
  'tsconfig.json',
  'src/app/page.tsx'
];

requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fileExists(fullPath)) {
    console.log(`✅ Found: ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
  }
});

console.log('');

// Check package.json scripts
console.log('Checking package.json scripts...\n');

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  
  const requiredScripts = ['build', 'build:vercel', 'clean'];
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`✅ Script found: ${script} -> ${packageJson.scripts[script]}`);
    } else {
      console.log(`❌ Script missing: ${script}`);
    }
  });
  
  console.log('');
} catch (error) {
  console.log(`❌ Error reading package.json: ${error.message}\n`);
}

// Check dependencies
console.log('Checking dependencies...\n');

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  
  const requiredDeps = ['next', 'react', 'react-dom'];
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ Dependency found: ${dep} -> ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ Dependency missing: ${dep}`);
    }
  });
  
  const requiredDevDeps = ['rimraf'];
  requiredDevDeps.forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`✅ Dev dependency found: ${dep} -> ${packageJson.devDependencies[dep]}`);
    } else {
      console.log(`❌ Dev dependency missing: ${dep}`);
    }
  });
  
  console.log('');
} catch (error) {
  console.log(`❌ Error reading package.json: ${error.message}\n`);
}

// Try to clean build directory
console.log('Cleaning build directory...\n');
const cleanResult = execCommand('npm run clean', { stdio: 'pipe' });
if (cleanResult.success) {
  console.log('✅ Build directory cleaned\n');
} else {
  console.log('⚠️  Failed to clean build directory (may not exist)\n');
}

// Try to install dependencies
console.log('Installing dependencies...\n');
const installResult = execCommand('npm install', { stdio: 'pipe' });
if (installResult.success) {
  console.log('✅ Dependencies installed\n');
} else {
  console.log('❌ Failed to install dependencies\n');
  process.exit(1);
}

// Try to build the project
console.log('Building project...\n');
const buildResult = execCommand('npm run build:vercel', { stdio: 'pipe' });
if (buildResult.success) {
  console.log('✅ Project built successfully!\n');
  console.log('🎉 Your Devix Solutions website is ready for deployment!');
} else {
  console.log('❌ Build failed\n');
  console.log('🔧 Troubleshooting steps:');
  console.log('1. Check for TypeScript errors in your code');
  console.log('2. Verify all dependencies are correctly installed');
  console.log('3. Check the error messages above for specific issues');
  console.log('4. Try running "npm run build" locally to see detailed errors');
  process.exit(1);
}