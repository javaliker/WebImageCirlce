const sharp = require('sharp');
const path = require('path');

const sizes = [
  { size: 16, filename: 'favicon-16x16.png' },
  { size: 32, filename: 'favicon-32x32.png' },
  { size: 180, filename: 'apple-touch-icon.png' },
  { size: 192, filename: 'android-chrome-192x192.png' },
  { size: 512, filename: 'android-chrome-512x512.png' },
];

const svgPath = path.join(__dirname, 'public', 'icon-template.svg');

async function generatePng(size, filename) {
  const outputPath = path.join(__dirname, 'public', filename);
  await sharp(svgPath)
    .resize(size, size)
    .png()
    .toFile(outputPath);
  console.log(`✅ 生成 ${filename}`);
}

(async () => {
  for (const { size, filename } of sizes) {
    await generatePng(size, filename);
  }
  console.log('\n🎉 所有 PNG 图标已生成到 public 目录！');
})(); 