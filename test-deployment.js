const https = require('https');

// Test the deployed API endpoint
const options = {
  hostname: 'devix-solutions-808bo7n1l-om-anands-projects-f7ff15cb.vercel.app',
  port: 443,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const testData = JSON.stringify({
  name: 'Test User',
  email: 'test@example.com',
  message: 'This is a test message to verify Instagram redirection'
});

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  res.on('data', (d) => {
    try {
      const response = JSON.parse(d.toString());
      console.log('Response:', response);
      
      if (response.redirectUrl && response.redirectUrl.includes('instagram.com/devixsolutions')) {
        console.log('✅ SUCCESS: Instagram redirection is working correctly!');
        console.log(`Redirect URL: ${response.redirectUrl}`);
      } else {
        console.log('❌ WARNING: Instagram redirection may not be working as expected');
      }
    } catch (e) {
      console.log('Response data:', d.toString());
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error testing deployment:', error.message);
  console.log('This might be because the deployment is still initializing. Please try again in a few minutes.');
});

req.write(testData);
req.end();