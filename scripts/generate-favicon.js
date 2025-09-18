const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Read the SVG favicon
const svgPath = path.join(__dirname, '../public/favicon.svg');
const outputDir = path.join(__dirname, '../public');

// Sizes for different favicon formats
const sizes = [16, 32, 48, 64, 128, 256, 512];

async function generateFavicons() {
  try {
    // Generate PNG favicons in different sizes
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `favicon-${size}x${size}.png`);
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`Generated ${size}x${size} favicon`);
    }

    // Generate a 32x32 favicon.ico file
    const icoPath = path.join(outputDir, 'favicon.ico');
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(icoPath);
    console.log('Generated favicon.ico');

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();