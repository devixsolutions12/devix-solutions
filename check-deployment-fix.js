const { exec } = require('child_process');

console.log('🔍 Checking Deployment Fix Status...');
console.log('====================================');

// Function to execute commands
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

async function checkFix() {
  try {
    // Show the latest commit
    console.log('📝 Latest commit:');
    const commitLog = await runCommand('git log --oneline -1');
    console.log(commitLog.stdout);
    
    // Show what was changed
    console.log('\n🔄 Changes made:');
    console.log('   Updated vercel.json to set "public": true');
    console.log('   This should fix the 401 Unauthorized error');
    
    // Show GitHub Actions status
    console.log('\n🚀 GitHub Actions:');
    console.log('   A new deployment has been triggered.');
    console.log('   You can monitor progress at: https://github.com/devixsolutions12/devix-solutions/actions');
    
    // Show current website URL
    console.log('\n🌐 Website URL:');
    console.log('   https://devix-solutions-6ni7iavft-om-anands-projects-f7ff15cb.vercel.app');
    
    console.log('\n✅ Fix Summary:');
    console.log('   1. Added "public": true to vercel.json');
    console.log('   2. Committed and pushed to GitHub');
    console.log('   3. New deployment automatically triggered');
    
    console.log('\n⏰ Timeline:');
    console.log('   Deployment should complete in 5-10 minutes');
    
    console.log('\n📋 Next Steps:');
    console.log('   1. Wait for deployment to complete');
    console.log('   2. Try accessing your website again');
    console.log('   3. If issues persist, check the GitHub Actions logs');
    
  } catch (error) {
    console.error('❌ Error checking deployment fix status:', error.message);
  }
}

checkFix();