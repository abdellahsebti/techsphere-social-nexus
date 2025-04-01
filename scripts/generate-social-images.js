const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Generate OG Image (1200x630)
const ogCanvas = createCanvas(1200, 630);
const ogCtx = ogCanvas.getContext('2d');

// Background gradient
const gradient = ogCtx.createLinearGradient(0, 0, 1200, 630);
gradient.addColorStop(0, '#1a365d'); // tech-blue
gradient.addColorStop(1, '#4c1d95'); // tech-purple
ogCtx.fillStyle = gradient;
ogCtx.fillRect(0, 0, 1200, 630);

// Logo
ogCtx.fillStyle = '#ffffff';
ogCtx.font = 'bold 72px Arial';
ogCtx.textAlign = 'center';
ogCtx.fillText('TechSphere Social', 600, 200);

// Tagline
ogCtx.font = '32px Arial';
ogCtx.fillText('The Gamified Skill-Sharing Network', 600, 300);

// Save OG image
const ogBuffer = ogCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogBuffer);

// Generate Favicon (32x32)
const favCanvas = createCanvas(32, 32);
const favCtx = favCanvas.getContext('2d');

// Background
favCtx.fillStyle = '#1a365d';
favCtx.fillRect(0, 0, 32, 32);

// Simple "T" logo
favCtx.fillStyle = '#ffffff';
favCtx.font = 'bold 24px Arial';
favCtx.textAlign = 'center';
favCtx.textBaseline = 'middle';
favCtx.fillText('T', 16, 16);

// Save favicon
const favBuffer = favCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(publicDir, 'favicon.png'), favBuffer);

// Generate Apple Touch Icon (180x180)
const appleCanvas = createCanvas(180, 180);
const appleCtx = appleCanvas.getContext('2d');

// Background
appleCtx.fillStyle = '#1a365d';
appleCtx.fillRect(0, 0, 180, 180);

// Logo
appleCtx.fillStyle = '#ffffff';
appleCtx.font = 'bold 48px Arial';
appleCtx.textAlign = 'center';
appleCtx.textBaseline = 'middle';
appleCtx.fillText('T', 90, 90);

// Save Apple Touch Icon
const appleBuffer = appleCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleBuffer);

console.log('Social images and favicons generated successfully!'); 