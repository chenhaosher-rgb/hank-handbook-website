# 小程序图片资源说明

## 📁 需要准备的图片

### 1. 底部导航图标 (TabBar Icons)

**规格**：81px × 81px，PNG 格式，建议使用 SVG 转换

#### 首页图标
- `home.png` - 首页图标（未选中）
- `home-active.png` - 首页图标（选中，红色 #dc2626）

#### 文章图标
- `article.png` - 文章图标（未选中）
- `article-active.png` - 文章图标（选中，红色 #dc2626）

#### 资源图标
- `resource.png` - 资源图标（未选中）
- `resource-active.png` - 资源图标（选中，红色 #dc2626）

#### 关于图标
- `about.png` - 关于图标（未选中）
- `about-active.png` - 关于图标（选中，红色 #dc2626）

**图标建议**：
- 首页：🏠 房子
- 文章：📄 文档
- 资源：📦 盒子
- 关于：👤 人物

### 2. 内容图片

#### 文章封面图
- `article-1.jpg` - 文章封面 1（750px × 400px）
- `article-2.jpg` - 文章封面 2（750px × 400px）
- `article-3.jpg` - 文章封面 3（750px × 400px）

**建议内容**：运营相关的配图，如数据图表、成长曲线等

#### 个人信息
- `avatar.jpg` - 个人头像（200px × 200px，圆形）
- `wechat-qr.jpg` - 微信二维码（400px × 400px）

#### 分享图
- `share-cover.jpg` - 分享封面图（500px × 400px）

**建议内容**：
- 包含 "汉克运营知识库" 文字
- 红色主题设计
- 简洁醒目

### 3. 占位图片

如果暂时没有图片，可以使用占位符：

```javascript
// 在代码中使用占位图片服务
'https://via.placeholder.com/750x400/dc2626/ffffff?text=Article+Cover'
```

## 🎨 设计规范

### 颜色
- 主色：#dc2626 (红色)
- 辅色：#1a1a1a (黑色)
- 背景：#ffffff (白色)

### 风格
- 简洁现代
- 扁平化设计
- 统一的视觉风格

## 🛠️ 制作工具推荐

### 在线工具
- [Canva](https://www.canva.com/) - 图片设计
- [iconfont](https://www.iconfont.cn/) - 图标下载
- [草料二维码](https://cli.im/) - 二维码生成

### 桌面工具
- Figma - 专业设计工具
- Sketch - Mac 设计工具
- Photoshop - 图片处理

## 📝 使用说明

1. **准备图片后**，放入 `images` 目录
2. **确保文件名**与代码中引用的一致
3. **优化图片大小**，减小小程序体积
4. **测试显示效果**，确保清晰度

## ⚠️ 注意事项

1. 图片格式建议使用 PNG（图标）和 JPG（照片）
2. 控制图片大小，单张不超过 500KB
3. 使用在线压缩工具减小文件大小：
   - [TinyPNG](https://tinypng.com/)
   - [智图](https://zhitu.isux.us/)

4. 如果使用网络图片，确保：
   - 使用 HTTPS 协议
   - 域名已在小程序后台配置

---

**当前状态**：图片资源待补充，请按照上述规范准备图片。
