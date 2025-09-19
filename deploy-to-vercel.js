const { exec } = require('child_process');
const path = require('path');

console.log('🚀 Starting Vercel deployment process...');

// Function to execute commands
function runCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, { ...options, cwd: path.join(__dirname) }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error executing command: ${command}`);
        console.error(stderr);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

async function deployToVercel() {
  try {
    // Check if Vercel CLI is installed
    console.log('🔍 Checking Vercel CLI installation...');
    await runCommand('vercel --version');
    
    // Deploy to Vercel
    console.log('🚀 Deploying to Vercel...');
    await runCommand('vercel --prod --confirm --token=$VERCEL_TOKEN', {
      env: { ...process.env }
    });
    
    console.log('✅ Deployment completed successfully!');
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    
    // Try alternative deployment method
    console.log('🔄 Trying alternative deployment method...');
    try {
      await runCommand('npx vercel --prod --confirm');
      console.log('✅ Alternative deployment completed successfully!');
    } catch (altError) {
      console.error('❌ Alternative deployment also failed:', altError.message);
      console.log('📝 Please ensure you have:');
      console.log('   1. Vercel CLI installed (npm install -g vercel)');
      console.log('   2. Logged into Vercel (vercel login)');
      console.log('   3. Correct project linked (vercel link)');
    }
  }
}

// Run deployment
deployToVercel();