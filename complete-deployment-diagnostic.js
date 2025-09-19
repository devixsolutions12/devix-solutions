const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Devix Solutions - Complete Deployment Diagnostic');
console.log('==================================================\n');

// Function to execute command with error handling
function execCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      cwd: __dirname,
      stdio: 'pipe',
      ...options
    });
    return { success: true, output: result.toString() };
  } catch (error) {
    return { success: false, error: error.message, output: error.stdout ? error.stdout.toString() : '', stderr: error.stderr ? error.stderr.toString() : '' };
  }
}

// Function to check if file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Function to check directory contents
function checkDirectory(dirPath, expectedFiles = []) {
  try {
    const files = fs.readdirSync(dirPath);
    console.log(`📁 ${path.basename(dirPath)} directory contents (${files.length} items):`);
    
    if (expectedFiles.length > 0) {
      expectedFiles.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (files.includes(file)) {
          console.log(`  ✅ ${file}`);
        } else {
          console.log(`  ❌ ${file} (MISSING)`);
        }
      });
      
      // Show any additional files
      const additionalFiles = files.filter(f => !expectedFiles.includes(f));
      if (additionalFiles.length > 0) {
        console.log(`  ℹ️  Additional files: ${additionalFiles.join(', ')}`);
      }
    } else {
      files.slice(0, 10).forEach(file => {
        console.log(`  📄 ${file}`);
      });
      if (files.length > 10) {
        console.log(`  ... and ${files.length - 10} more files`);
      }
    }
    console.log('');
  } catch (error) {
    console.log(`❌ Error reading ${path.basename(dirPath)} directory: ${error.message}\n`);
  }
}

// 1. Check project structure
console.log('📋 PROJECT STRUCTURE CHECK\n');

const requiredFiles = [
  'package.json',
  'vercel.json',
  'next.config.ts',
  'tsconfig.json'
];

requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fileExists(fullPath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} (CRITICAL MISSING FILE)`);
  }
});

console.log('');

// 2. Check src directory structure
console.log('📂 SOURCE DIRECTORY STRUCTURE\n');
checkDirectory(path.join(__dirname, 'src'), ['app', 'components', 'hooks', 'lib']);

// 3. Check app directory
console.log('📱 APP DIRECTORY STRUCTURE\n');
checkDirectory(path.join(__dirname, 'src', 'app'), ['page.tsx', 'layout.tsx', 'api']);

// 4. Check components directory
console.log('🧩 COMPONENTS DIRECTORY STRUCTURE\n');
const expectedComponents = [
  'Header.tsx', 'Hero.tsx', 'Services.tsx', 'Portfolio.tsx', 
  'Testimonials.tsx', 'Contact.tsx', 'Footer.tsx'
];
checkDirectory(path.join(__dirname, 'src', 'components'), expectedComponents);

// 5. Check API routes
console.log('🔌 API ROUTES STRUCTURE\n');
if (fileExists(path.join(__dirname, 'src', 'app', 'api'))) {
  checkDirectory(path.join(__dirname, 'src', 'app', 'api'));
} else {
  console.log('❌ API directory missing\n');
}

// 6. Check dependencies
console.log('📦 DEPENDENCIES CHECK\n');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  
  const criticalDeps = ['next', 'react', 'react-dom'];
  criticalDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep}: MISSING`);
    }
  });
  
  const devDeps = ['typescript', 'rimraf'];
  devDeps.forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.devDependencies[dep]}`);
    } else {
      console.log(`❌ ${dep}: MISSING`);
    }
  });
  
  console.log('');
} catch (error) {
  console.log(`❌ Error reading package.json: ${error.message}\n`);
}

// 7. Check build scripts
console.log('⚙️  BUILD SCRIPTS CHECK\n');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  
  const requiredScripts = ['build', 'build:vercel', 'clean'];
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`✅ ${script}: ${packageJson.scripts[script]}`);
    } else {
      console.log(`❌ ${script}: MISSING`);
    }
  });
  
  console.log('');
} catch (error) {
  console.log(`❌ Error reading package.json: ${error.message}\n`);
}

// 8. Check vercel.json configuration
console.log('⚙️  VERCEL CONFIGURATION CHECK\n');
try {
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8'));
  
  const requiredKeys = ['version', 'builds', 'buildCommand', 'outputDirectory', 'installCommand'];
  requiredKeys.forEach(key => {
    if (vercelConfig[key] !== undefined) {
      console.log(`✅ ${key}: ${JSON.stringify(vercelConfig[key])}`);
    } else {
      console.log(`❌ ${key}: MISSING`);
    }
  });
  
  console.log('');
} catch (error) {
  console.log(`❌ Error reading vercel.json: ${error.message}\n`);
}

// 9. Check TypeScript compilation
console.log('_typeDefinition TYPESCRIPT COMPILATION CHECK\n');
const tsCheck = execCommand('npx tsc --noEmit');
if (tsCheck.success) {
  console.log('✅ TypeScript compilation successful');
} else {
  console.log('❌ TypeScript compilation failed:');
  console.log(tsCheck.stderr || tsCheck.output);
}
console.log('');

// 10. Check Node.js and npm versions
console.log('🔧 ENVIRONMENT CHECK\n');
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js: ${nodeVersion.trim()}`);
} catch (error) {
  console.log('❌ Node.js: NOT FOUND');
}

try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' });
  console.log(`✅ npm: ${npmVersion.trim()}`);
} catch (error) {
  console.log('❌ npm: NOT FOUND');
}

console.log('');

// 11. Summary
console.log('📋 DIAGNOSTIC SUMMARY\n');
console.log('If all checks passed, try this deployment sequence:');
console.log('1. npm run clean');
console.log('2. rm -rf node_modules package-lock.json (or delete manually)');
console.log('3. npm install');
console.log('4. npm run build:vercel');
console.log('5. npx vercel --prod');
console.log('');
console.log('If deployment still fails, please share the exact error message from Vercel logs.');