const fs = require('fs');

// 生成图标的函数
function generateIcon(size, filename) {
  console.log(`生成 ${filename} (${size}x${size})...`);
  
  try {
    // 创建 SVG 内容
    const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="#3B82F6" stroke="#1E40AF" stroke-width="${Math.max(1, size/16)}"/>
      <circle cx="${size/2}" cy="${size/2 - size/8}" r="${size/8}" fill="#FFFFFF"/>
      <path d="M${size/4} ${size*3/4} Q${size/2} ${size*2/3} ${size*3/4} ${size*3/4}" fill="#FFFFFF"/>
      <circle cx="${size/3}" cy="${size/4}" r="${Math.max(1, size/32)}" fill="#FFFFFF" opacity="0.8"/>
      <circle cx="${size*2/3}" cy="${size/4}" r="${Math.max(1, size/32)}" fill="#FFFFFF" opacity="0.8"/>
    </svg>`;
    
    // 写入文件
    fs.writeFileSync(`public/${filename}`, svg);
    console.log(`✅ ${filename} 生成成功`);
  } catch (error) {
    console.error(`❌ 生成 ${filename} 失败:`, error.message);
  }
}

// 主函数
function main() {
  console.log('🎨 开始生成 ImageCircleMaker 图标...');
  
  // 确保 public 目录存在
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }
  
  // 需要生成的图标列表
  const icons = [
    { size: 16, filename: 'favicon-16x16.png' },
    { size: 32, filename: 'favicon-32x32.png' },
    { size: 180, filename: 'apple-touch-icon.png' },
    { size: 192, filename: 'android-chrome-192x192.png' },
    { size: 512, filename: 'android-chrome-512x512.png' }
  ];
  
  // 生成所有图标
  icons.forEach(icon => {
    generateIcon(icon.size, icon.filename);
  });
  
  console.log('\n🎉 所有图标生成完成！');
  console.log('📁 图标文件已保存到 public 目录');
  console.log('🔄 请刷新浏览器页面查看效果');
}

// 运行主函数
main(); 