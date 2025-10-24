#!/usr/bin/env node
/**
 * 生成小程序PNG图标文件
 * 使用Canvas API生成PNG格式的图标
 */

const fs = require('fs');
const path = require('path');

// 创建images目录
const imagesDir = path.join(__dirname, 'miniprogram', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 简单的PNG图标生成（使用Base64编码的1x1像素PNG）
const createSimplePNG = (color = '666666') => {
  // 这是一个1x1像素的PNG图片的Base64编码
  const base64PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  return Buffer.from(base64PNG, 'base64');
};

// 图标配置
const icons = [
  { name: 'home', color: '666666' },
  { name: 'home-active', color: 'dc2626' },
  { name: 'library', color: '666666' },
  { name: 'library-active', color: 'dc2626' },
  { name: 'search', color: '666666' },
  { name: 'search-active', color: 'dc2626' },
  { name: 'user', color: '666666' },
  { name: 'user-active', color: 'dc2626' }
];

// 生成PNG文件
icons.forEach(icon => {
  const pngPath = path.join(imagesDir, `${icon.name}.png`);
  const pngData = createSimplePNG(icon.color);
  fs.writeFileSync(pngPath, pngData);
  console.log(`✅ 生成图标: ${icon.name}.png`);
});

console.log('\n📱 小程序PNG图标已生成！');
console.log('注意：这些是占位图标，建议后续替换为专业设计的图标。');
console.log('\n💡 建议：');
console.log('• 使用设计工具创建24x24px的PNG图标');
console.log('• 保持简洁的设计风格');
console.log('• 确保图标在不同背景下清晰可见');
console.log('• 普通状态使用灰色，激活状态使用红色');
