import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '../public');

async function optimizeImage() {
  const inputImage = join(publicDir, 'abdellah.jpg');
  const outputWebP = join(publicDir, 'abdellah.webp');

  try {
    // Create WebP version
    await sharp(inputImage)
      .resize(400, 400, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 80 })
      .toFile(outputWebP);

    // Optimize original JPEG
    await sharp(inputImage)
      .resize(400, 400, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 80,
        progressive: true
      })
      .toFile(join(publicDir, 'abdellah-optimized.jpg'));

    // Replace original with optimized version
    fs.unlinkSync(inputImage);
    fs.renameSync(join(publicDir, 'abdellah-optimized.jpg'), inputImage);

    console.log('Images optimized successfully!');
  } catch (err) {
    console.error('Error optimizing images:', err);
  }
}

optimizeImage(); 