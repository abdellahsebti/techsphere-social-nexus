const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Generate Developer Avatar (200x200)
const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, 200, 200);
gradient.addColorStop(0, '#1a365d'); // tech-blue
gradient.addColorStop(1, '#4c1d95'); // tech-purple
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 200, 200);

// Add initials "SA" for Sebti Abdellah
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 80px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('SA', 100, 100);

// Save the image
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(publicDir, 'developer-avatar.jpg'), buffer);

console.log('Developer avatar generated successfully!'); 