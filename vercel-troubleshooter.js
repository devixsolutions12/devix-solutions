const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Vercel Deployment Troubleshooter for Devix Solutions');
console.log('=====================================================\n');

// Function to check if a file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Function to run a command and return output
function runCommand(command) {
  try {
    const output = execSync(command, { cwd: __dirname, encoding: 'utf8' });
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error.message, output: error.stdout || '', stderr: error.stderr || '' };
  }
}

// Check 1: Required files
console.log('✅ Check 1: Verifying required files...\n');

const requiredFiles = [
  'package.json',
  'next.config.ts',
  'vercel.json',
  'src/app/page.tsx',
  'src/components/Header.tsx',
  'src/components/Footer.tsx'
];

let missingFiles = [];
requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fileExists(fullPath)) {
    console.log(`  ✅ Found: ${file}`);
  } else {
    console.log(`  ❌ Missing: ${file}`);
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.log(`\n❌ Critical Error: ${missingFiles.length} required files are missing.`);
  console.log('Please check your project structure.\n');
  process.exit(1);
} else {
  console.log('\n✅ All required files are present.\n');
}

// Check 2: Node.js and npm versions
console.log('✅ Check 2: Verifying Node.js and npm versions...\n');

const nodeVersion = runCommand('node --version');
const npmVersion = runCommand('npm --version');

if (nodeVersion.success) {
  console.log(`  Node.js version: ${nodeVersion.output.trim()}`);
} else {
  console.log(`  ❌ Failed to get Node.js version: ${nodeVersion.error}`);
}

if (npmVersion.success) {
  console.log(`  npm version: ${npmVersion.output.trim()}\n`);
} else {
  console.log(`  ❌ Failed to get npm version: ${npmVersion.error}\n`);
}

// Check 3: Package.json content
console.log('✅ Check 3: Verifying package.json content...\n');

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  
  console.log(`  Name: ${packageJson.name}`);
  console.log(`  Version: ${packageJson.version}`);
  console.log(`  Private: ${packageJson.private}`);
  
  if (packageJson.scripts) {
    console.log('  Scripts:');
    Object.keys(packageJson.scripts).forEach(script => {
      console.log(`    ${script}: ${packageJson.scripts[script]}`);
    });
  }
  
  if (packageJson.dependencies) {
    console.log('\n  Dependencies:');
    Object.keys(packageJson.dependencies).forEach(dep => {
      console.log(`    ${dep}: ${packageJson.dependencies[dep]}`);
    });
  }
  
  console.log('');
} catch (error) {
  console.log(`  ❌ Error reading package.json: ${error.message}\n`);
}

// Check 4: Vercel configuration
console.log('✅ Check 4: Verifying Vercel configuration...\n');

if (fileExists(path.join(__dirname, 'vercel.json'))) {
  try {
    const vercelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8'));
    console.log('  vercel.json content:');
    console.log(`    Version: ${vercelConfig.version}`);
    console.log(`    Build command: ${vercelConfig.buildCommand || 'Not specified (using default)'}`);
    console.log(`    Install command: ${vercelConfig.installCommand || 'Not specified (using default)'}`);
    
    if (vercelConfig.routes) {
      console.log(`    Routes: ${vercelConfig.routes.length} route(s) configured`);
    }
    
    console.log('');
  } catch (error) {
    console.log(`  ❌ Error reading vercel.json: ${error.message}\n`);
  }
} else {
  console.log('  ❌ vercel.json not found\n');
}

// Check 5: Next.js configuration
console.log('✅ Check 5: Verifying Next.js configuration...\n');

if (fileExists(path.join(__dirname, 'next.config.ts'))) {
  console.log('  ✅ next.config.ts found\n');
} else {
  console.log('  ❌ next.config.ts not found\n');
}

// Check 6: Try to install dependencies
console.log('✅ Check 6: Installing dependencies...\n');

const installResult = runCommand('npm install');
if (installResult.success) {
  console.log('  ✅ Dependencies installed successfully\n');
} else {
  console.log('  ❌ Failed to install dependencies:');
  console.log(`    Error: ${installResult.error}`);
  console.log(`    Output: ${installResult.output}`);
  console.log(`    Stderr: ${installResult.stderr}\n`);
}

// Check 7: Try to build the project
console.log('✅ Check 7: Building the project...\n');

const buildResult = runCommand('npm run build');
if (buildResult.success) {
  console.log('  ✅ Project built successfully\n');
} else {
  console.log('  ❌ Failed to build the project:');
  console.log(`    Error: ${buildResult.error}`);
  console.log(`    Output: ${buildResult.output}`);
  console.log(`    Stderr: ${buildResult.stderr}\n`);
}

// Check 8: Vercel CLI status
console.log('✅ Check 8: Checking Vercel CLI status...\n');

const vercelStatus = runCommand('npx vercel --version');
if (vercelStatus.success) {
  console.log('  ✅ Vercel CLI is available:');
  console.log(`    ${vercelStatus.output.trim().split('\n')[0]}\n`);
} else {
  console.log('  ❌ Vercel CLI is not available:');
  console.log(`    Error: ${vercelStatus.error}\n`);
  console.log('  To install Vercel CLI, run: npm install -g vercel\n');
}

console.log('=====================================================');
console.log('🔧 Troubleshooting Complete');
console.log('=====================================================\n');

console.log('Next steps:');
console.log('1. If dependencies failed to install, check your internet connection and try again');
console.log('2. If build failed, check the error messages above for specific issues');
console.log('3. If Vercel CLI is not available, install it with: npm install -g vercel');
console.log('4. For authentication issues, run: npx vercel login');
console.log('5. For deployment issues, run: npx vercel --prod --debug\n');

console.log('For more detailed help, check the documentation files in your project folder.');