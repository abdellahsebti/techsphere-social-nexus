import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const blogImages = [
  {
    name: 'web-dev',
    title: 'Web Development',
    color: '#3B82F6', // tech-blue
  },
  {
    name: 'ai-education',
    title: 'AI in Education',
    color: '#8B5CF6', // tech-purple
  },
  {
    name: 'portfolio',
    title: 'Developer Portfolio',
    color: '#10B981', // green
  },
];

async function generateBlogImage(image) {
  const width = 800;
  const height = 400;
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${image.color}20"/>
      <text
        x="50%"
        y="50%"
        font-family="Arial"
        font-size="48"
        fill="${image.color}"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${image.title}
      </text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .resize(width, height)
    .jpeg({ quality: 90 })
    .toFile(path.join(__dirname, '../public/blog', `${image.name}.jpg`));
}

async function generateAllBlogImages() {
  for (const image of blogImages) {
    console.log(`Generating ${image.name}.jpg...`);
    await generateBlogImage(image);
  }
  console.log('All blog images generated successfully!');
}

generateAllBlogImages().catch(console.error); 