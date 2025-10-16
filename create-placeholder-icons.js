// 创建小程序占位图标脚本
const fs = require('fs');
const path = require('path');

// 图标 SVG 模板
const icons = {
  'home': `<svg width="81" height="81" viewBox="0 0 81 81" xmlns="http://www.w3.org/2000/svg">
    <rect width="81" height="81" fill="#666666"/>
    <text x="40.5" y="50" font-family="Arial" font-size="40" text-anchor="middle" fill="white">🏠</text>
  </svg>`,
  'home-active': `<svg width="81" height="81" viewBox="0 0 81 81" xmlns="http://www.w3.org/2000/svg">
    <rect width="81" height="81" fill="#dc2626"/>
    <text x="40.5" y="50" font-family="Arial" font-size="40" text-anchor="middle" fill="white">🏠</text>
  </svg>`,
  'article': `<svg width="81" height="81" viewBox="0  81" xmlns="http://www.w3.org/2000/svg">
    <rect width="81" height="81" fill="#666666"/>
    <text x="40.5" y="50" font-family="Arial" font-size="40" text-anchor="middle" fill="white">📄</text>
  </svg>`,
  'article-active': `<svg width="81" height="81" viewBox="0 0 81 81" xmlns="http://www.w3.org/2000/svg">
    <rect width="81" height="81" fill="#dc2626"/>
    <text x="40.5" y="50" font-family="Arial" font-size="40" text-anchor="middle" fill="white">📄</text>
  </svg>`,
  'resource': `<svg width="81" height="81" viewBox="0 0 81 81" xmlns="http://www.w3.org/2000/svg">
    <rect width="81" height="81" fill="#666666"/>
    <text x="40.5" y="50" font-family="Arial" font-size="40" text-anchor="middle" fill="white">📦</text>
  </svg>`,
  'resource-active': `<svg width="81" height="81" viewBox="0 0 81 81" xmlns="http://www.w3.org/2000/svg">
    <rect width="81" height="81" fill="#dc2626"/>
    <text x="40.5" y="50" font-family="Arial" font-size="40" text-anchor="middle" fill="white">📦</text>
  </svg>`,
  'about': `<svg width="81" height="81" viewBox="0 0 81 81" xmlns="http://www.w3.org/2000/svg">
    <rect width="81" height="81" fill="#666666"/>
    <text x="40.5" y="50" font-family="Arial" font-size="40" text-anchor="middle" fill="white">👤</text>
  </svg>`,
  'about-active': `<svg width="81" height="81" viewBox="0 0 81 81" xmlns="http://www.w3.org/2000/svg">
    <rect width="81" height="81" fill="#dc2626"/>
    <text x="40.5" y="50" font-family="Arial" font-size="40" text-anchor="middle" fill="white">👤</text>
  </svg>`
};

// 创建图标目录
const imagesDir = path.join(__dirname, 'miniprogram', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 创建所有图标文件
Object.entries(icons).forEach(([name, svg]) => {
  const filePath = path.join(imagesDir, `${name}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✅ 创建图标: ${name}.svg`);
});

console.log('\n🎉 所有占位图标已创建完成！');
console.log('📝 注意：这些是 SVG 格式的占位图标，建议后续替换为 PNG 格式的正式图标。');
