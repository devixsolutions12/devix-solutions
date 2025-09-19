const { exec } = require('child_process');

console.log('🔍 Checking GitHub Actions Status...');
console.log('===================================');

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

async function checkStatus() {
  try {
    console.log('📝 Recent Git History:');
    const gitLog = await runCommand('git log --oneline -5');
    console.log(gitLog.stdout);
    
    console.log('\n🔄 GitHub Repository:');
    console.log('   https://github.com/devixsolutions12/devix-solutions');
    
    console.log('\n📋 To Check Deployment Status:');
    console.log('   1. Visit: https://github.com/devixsolutions12/devix-solutions/actions');
    console.log('   2. Look for the most recent workflow run');
    console.log('   3. Click on it to see detailed logs');
    
    console.log('\n🔧 Common Fixes If Still Failing:');
    console.log('   1. Check if all dependencies are properly installed');
    console.log('   2. Ensure vercel.json has "public": true');
    console.log('   3. Check for any build errors in the logs');
    console.log('   4. Verify all environment variables are set');
    
    console.log('\n🌐 Current Website (may not be updated yet):');
    console.log('   https://devix-solutions-6ni7iavft-om-anands-projects-f7ff15cb.vercel.app');
    
  } catch (error) {
    console.error('❌ Error checking status:', error.message);
  }
}

checkStatus();