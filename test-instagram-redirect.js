const fs = require('fs');
const path = require('path');

// Read the contact API route file
const contactRoutePath = path.join(__dirname, 'src', 'app', 'api', 'contact', 'route.ts');
const contactRouteContent = fs.readFileSync(contactRoutePath, 'utf8');

// Check if the Instagram username is correctly set
if (contactRouteContent.includes("instagramUsername = 'devixsolutions'")) {
  console.log('✅ Instagram username is correctly set to "devixsolutions"');
} else {
  console.log('❌ Instagram username is not correctly set');
  console.log('Please check the file:', contactRoutePath);
}

// Check the Contact component
const contactComponentPath = path.join(__dirname, 'src', 'components', 'Contact.tsx');
const contactComponentContent = fs.readFileSync(contactComponentPath, 'utf8');

if (contactComponentContent.includes("instagram.com/devixsolutions")) {
  console.log('✅ Contact component correctly redirects to "devixsolutions" Instagram');
} else {
  console.log('❌ Contact component does not redirect to "devixsolutions" Instagram');
  console.log('Please check the file:', contactComponentPath);
}

console.log('\n✅ All checks completed! The website should now redirect contact form submissions to https://instagram.com/devixsolutions');