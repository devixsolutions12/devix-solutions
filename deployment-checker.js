const fs = require('fs');
const path = require('path');

console.log('🔍 Devix Solutions - Deployment Checker');
console.log('========================================\n');

// Check if we're in the right directory
const requiredFiles = [
  'package.json',
  'next.config.ts',
  'vercel.json',
  'src/app/page.tsx',
  'src/components/Header.tsx',
  'src/components/Footer.tsx'
];

const missingFiles = [];
const foundFiles = [];

console.log('Checking required files...\n');

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ Found: ${file}`);
    foundFiles.push(file);
  } else {
    console.log(`❌ Missing: ${file}`);
    missingFiles.push(file);
  }
});

console.log('\n' + '='.repeat(40));

if (missingFiles.length === 0) {
  console.log('🎉 All required files are present!');
  console.log('✅ Your project is ready for deployment.');
  console.log('\nNext steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run build');
  console.log('3. Run: npx vercel --prod --yes');
} else {
  console.log(`⚠️  ${missingFiles.length} file(s) are missing:`);
  missingFiles.forEach(file => console.log(`   - ${file}`));
  console.log('\nPlease check your project structure.');
}

console.log('\n' + '='.repeat(40));
console.log('Project location: ' + __dirname);