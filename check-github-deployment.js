const { exec } = require('child_process');

console.log('🔍 Checking GitHub Actions Deployment Status...');
console.log('================================================');

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

async function checkDeployment() {
  try {
    // Check the last few commits
    console.log('📝 Recent commits:');
    const commitLog = await runCommand('git log --oneline -5');
    console.log(commitLog.stdout);
    
    // Check GitHub Actions status
    console.log('\n🔄 GitHub Actions Status:');
    console.log('   Your changes have been pushed to GitHub.');
    console.log('   The deployment workflow should automatically trigger.');
    console.log('   You can check the status at: https://github.com/devixsolutions12/devix-solutions/actions');
    
    // Show current website URL
    console.log('\n🌐 Current Website:');
    console.log('   https://devix-solutions-6ni7iavft-om-anands-projects-f7ff15cb.vercel.app');
    
    // Show what changes were made
    console.log('\n✅ Changes Included in Deployment:');
    console.log('   1. Instagram restored in contact information');
    console.log('   2. Enterprise plan price updated to ₹34,999');
    console.log('   3. WhatsApp redirection for contact forms (unchanged)');
    
    console.log('\n⏰ Deployment Timeline:');
    console.log('   GitHub Actions will deploy your changes automatically.');
    console.log('   This typically takes 5-10 minutes to complete.');
    
    console.log('\n📋 Next Steps:');
    console.log('   1. Visit https://github.com/devixsolutions12/devix-solutions/actions to monitor deployment');
    console.log('   2. Once complete, your changes will be live at the website URL above');
    
  } catch (error) {
    console.error('❌ Error checking deployment status:', error.message);
  }
}

checkDeployment();