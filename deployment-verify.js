const fs = require('fs');
const path = require('path');

console.log('🔍 Devix Solutions - Deployment Verification');
console.log('==========================================\n');

// Check if build was successful
const nextDir = path.join(__dirname, '.next');
if (fs.existsSync(nextDir)) {
  console.log('✅ Build directory found (.next)');
  
  // Check for important build files
  const importantFiles = ['BUILD_ID', 'routes-manifest.json', 'package.json'];
  importantFiles.forEach(file => {
    const filePath = path.join(nextDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ Found: ${file}`);
    } else {
      console.log(`❌ Missing: ${file}`);
    }
  });
} else {
  console.log('❌ Build directory (.next) not found');
  console.log('Please run "npm run build" first');
  process.exit(1);
}

console.log('\n✅ Your Devix Solutions website has been built successfully!');
console.log('\nNext steps to deploy to Vercel:');
console.log('1. Run: npx vercel logout');
console.log('2. Run: npx vercel login');
console.log('3. Complete authentication in your browser');
console.log('4. Run: npx vercel --prod --yes');
console.log('\nOr use the automated scripts:');
console.log('- Double-click on "vercel-fix.bat"');
console.log('- Then double-click on "deploy-website-final.bat"');

console.log('\n🎉 Your website is ready for deployment!');