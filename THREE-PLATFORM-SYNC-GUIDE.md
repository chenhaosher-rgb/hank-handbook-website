# 三平台同步开发指南 🚀

## 📋 概述

本项目包含**三个平台版本**，需要保持内容和功能同步：

1. **WordPress 官网**（主站，动态内容管理）
2. **静态网站**（本地预览和快速部署）
3. **微信小程序**（移动端原生体验）

## 🎯 三平台特点对比

| 特性 | WordPress | 静态网站 | 微信小程序 |
|------|-----------|----------|------------|
| **用途** | 官方网站 | 本地预览/备用 | 移动端原生 |
| **技术栈** | PHP + MySQL | HTML/CSS/JS | WXML/WXSS/JS |
| **内容管理** | 后台管理 | 手动编辑 | 手动编辑/API |
| **部署方式** | OnePanel 部署 | 静态托管 | 微信开发者工具 |
| **更新方式** | 后台更新 | 文件更新 | 代码更新 |
| **适用场景** | SEO/博客 | 快速预览 | 移动端体验 |

## 📁 项目目录结构

```
红人汉克手册网站/
├── 📂 WordPress 主题文件（根目录）
│   ├── index.php                  # 首页模板
│   ├── header.php                 # 头部模板
│   ├── footer.php                 # 底部模板
│   ├── functions.php              # 主题函数
│   ├── style.css                  # 主题样式
│   ├── js/main.js                 # 主题 JS
│   └── ...其他 WordPress 文件
│
├── 📂 static-site/                # 静态网站
│   ├── index.html                 # 首页
│   ├── blog-post.html             # 文章详情页
│   ├── css/style.css              # 样式
│   ├── js/main.js                 # 脚本
│   └── resources/                 # 资源文件
│
├── 📂 miniprogram/                # 微信小程序
│   ├── app.js                     # 小程序入口
│   ├── app.json                   # 小程序配置
│   ├── app.wxss                   # 全局样式
│   ├── pages/                     # 页面
│   │   ├── index/                 # 首页
│   │   ├── articles/              # 文章列表
│   │   ├── search/                # 搜索页
│   │   ├── resources/             # 资源页
│   │   └── about/                 # 关于页
│   └── utils/                     # 工具函数
│       └── searchDatabase.js      # 搜索数据库
│
└── 📂 wp-content/uploads/resources/  # 资源文件库
    ├── 用户增长/
    ├── 内容创作/
    └── 变现策略/
```

## 🔄 同步开发流程

### 1️⃣ 内容更新流程

#### A. 文章内容更新

```mermaid
WordPress (后台发布) 
    ↓
静态网站 (手动同步 HTML)
    ↓
小程序 (如需要，手动更新或通过 API)
```

**操作步骤**：
1. 在 WordPress 后台发布新文章
2. 复制文章内容到 `static-site/blog-post.html`（如需要）
3. 如果小程序需要离线内容，更新小程序页面
4. 推荐：使用 WordPress REST API 让静态网站和小程序动态获取内容

#### B. 资源文件更新

**统一资源库**：`/wp-content/uploads/resources/`

```bash
# 上传新资源到指定分类目录
wp-content/uploads/resources/
├── 用户增长/
│   └── 新资源.pdf
├── 内容创作/
│   └── 新工具.zip
└── 变现策略/
    └── 新手册.docx
```

**同步到三个平台**：
1. WordPress：上传到 `/wp-content/uploads/resources/`
2. 静态网站：复制到 `static-site/resources/`
3. 小程序：更新 `miniprogram/utils/searchDatabase.js` 中的下载链接

### 2️⃣ 功能更新流程

#### A. 搜索数据库更新

**核心文件**：
- WordPress: `js/main.js` → `enhancedOperationsDatabase`
- 静态网站: `static-site/js/main.js` → `enhancedOperationsDatabase`
- 小程序: `miniprogram/utils/searchDatabase.js` → `operationsDatabase`

**同步步骤**：
```bash
# 1. 更新 WordPress 版本
编辑: js/main.js
找到: const enhancedOperationsDatabase = { ... }
添加新的解决方案

# 2. 同步到静态网站
复制相同内容到: static-site/js/main.js

# 3. 同步到小程序
转换格式后更新到: miniprogram/utils/searchDatabase.js
```

#### B. 样式和布局更新

**颜色主题统一**：
```css
/* 三个平台使用相同的颜色变量 */
--color-red: #dc2626;        /* 主题红色 */
--color-black: #1a1a1a;      /* 主题黑色 */
--color-white: #ffffff;      /* 主题白色 */
```

**同步位置**：
- WordPress: `style.css`
- 静态网站: `static-site/css/style.css`
- 小程序: `miniprogram/app.wxss`

### 3️⃣ 联系方式更新

**微信二维码位置**：
- WordPress: `/wechat-qr.png`
- 静态网站: `static-site/images/wechat-qr.jpg`
- 小程序: `miniprogram/images/wechat-qr.jpg`

**更新步骤**：
```bash
# 1. 准备新的微信二维码图片
# 2. 替换三个位置的图片文件
# 3. 确保文件名一致或更新代码中的引用
```

## 🛠️ 开发工具和命令

### WordPress 开发

```bash
# 本地开发（通过 OnePanel）
# 访问：http://47.108.70.67

# 打包主题
zip -r "红人汉克手册主题.zip" . \
  -x "*.git*" "static-site/*" "miniprogram/*" "node_modules/*"
```

### 静态网站开发

```bash
# 启动本地服务器
cd static-site
python3 -m http.server 8000

# 访问：http://localhost:8000

# 或使用提供的脚本
./start-server.sh
```

### 小程序开发

```bash
# 使用微信开发者工具打开 miniprogram 目录

# 配置 AppID
# 在 微信开发者工具 > 详情 > 基本信息 中配置

# 预览和调试
# 点击 "编译" 和 "预览" 按钮
```

## 📝 常见更新场景

### 场景 1：添加新文章

1. **WordPress**：
   - 登录后台 > 文章 > 写文章
   - 发布文章

2. **静态网站**：
   - 更新 `index.html` 中的文章列表
   - 创建新的 `blog-post-[id].html`

3. **小程序**：
   - 更新 `pages/articles/articles.js` 中的文章数据
   - 或配置 API 动态获取

### 场景 2：添加新资源

1. **上传资源文件**：
   ```bash
   # WordPress
   上传到: /wp-content/uploads/resources/[分类]/

   # 静态网站
   复制到: static-site/resources/[分类]/
   ```

2. **更新搜索数据库**：
   - WordPress: `js/main.js`
   - 静态网站: `static-site/js/main.js`
   - 小程序: `miniprogram/utils/searchDatabase.js`

3. **添加资源信息**：
   ```javascript
   resources: [
     {
       id: X,
       name: "资源名称",
       type: "guide", // guide/tools/template/cases
       size: "文件大小",
       description: "资源描述",
       downloadUrl: "/path/to/resource",
       preview: true/false
     }
   ]
   ```

### 场景 3：修改样式

1. **确定修改位置**：
   - 全局样式：修改 CSS 变量
   - 组件样式：修改对应组件的样式

2. **同步到三个平台**：
   ```bash
   # WordPress
   编辑: style.css

   # 静态网站
   编辑: static-site/css/style.css

   # 小程序
   编辑: miniprogram/app.wxss 或对应页面的 .wxss
   ```

### 场景 4：更新搜索功能

1. **添加新的解决方案**：
   ```javascript
   "新分类": {
     id: "new_category",
     title: "解决方案标题",
     description: "详细描述",
     tags: ["标签1", "标签2"],
     keywords: ["关键词1", "关键词2"],
     difficulty: "初级/中级/高级",
     timeEstimate: "时间估计",
     resources: [ /* 资源列表 */ ],
     related: ["相关分类"],
     successCases: ["成功案例"]
   }
   ```

2. **同步到三个平台**：
   - WordPress: `js/main.js`
   - 静态网站: `static-site/js/main.js`
   - 小程序: `miniprogram/utils/searchDatabase.js`

## 🔗 API 集成（推荐）

### 使用 WordPress REST API

WordPress 自带 REST API，可以让静态网站和小程序动态获取内容：

```javascript
// 获取文章列表
GET https://47.108.70.67/wp-json/wp/v2/posts

// 获取单篇文章
GET https://47.108.70.67/wp-json/wp/v2/posts/{id}

// 获取资源（自定义文章类型）
GET https://47.108.70.67/wp-json/wp/v2/resources
```

**在小程序中使用**：
```javascript
// miniprogram/app.js
globalData: {
  apiBaseUrl: 'https://47.108.70.67/wp-json/wp/v2'
}

// 在页面中调用
wx.request({
  url: `${app.globalData.apiBaseUrl}/posts`,
  success: (res) => {
    this.setData({ articles: res.data });
  }
});
```

## ✅ 同步检查清单

每次更新后，检查以下项目：

### 内容同步
- [ ] 文章标题和内容一致
- [ ] 资源文件已上传到所有平台
- [ ] 资源下载链接正确
- [ ] 搜索数据库已更新

### 样式同步
- [ ] 颜色主题一致
- [ ] 布局结构一致
- [ ] 响应式设计正常

### 功能同步
- [ ] 搜索功能正常
- [ ] 资源下载正常
- [ ] 联系方式正确
- [ ] 导航链接有效

### 测试检查
- [ ] WordPress 网站可以正常访问
- [ ] 静态网站本地预览正常
- [ ] 小程序编译无错误
- [ ] 所有功能在三个平台都能使用

## 🚀 部署流程

### WordPress 部署

1. 打包主题：
   ```bash
   cd /Users/hankchan/Downloads/Hank/红人汉克手册网站
   zip -r "红人汉克手册主题.zip" . \
     -x "*.git*" "static-site/*" "miniprogram/*"
   ```

2. 上传到 WordPress：
   - 登录 WordPress 后台
   - 外观 > 主题 > 上传主题
   - 上传 zip 文件并启用

### 静态网站部署

```bash
# 方法 1：本地服务器
cd static-site
python3 -m http.server 8000

# 方法 2：部署到静态托管服务
# - Netlify
# - Vercel
# - GitHub Pages
# 直接上传 static-site 目录
```

### 小程序部署

1. 打开微信开发者工具
2. 选择 `miniprogram` 目录
3. 点击 "上传"
4. 填写版本号和项目备注
5. 在微信公众平台提交审核

## 📞 技术支持

### 遇到问题？

1. **查看文档**：
   - WordPress: `WORDPRESS-UPLOAD-GUIDE.md`
   - 静态网站: `static-site/README.md`
   - 小程序: `miniprogram/README.md`（待创建）

2. **常见问题**：
   - 三个平台内容不一致：按本指南逐项检查
   - 搜索功能异常：检查 `searchDatabase` 格式
   - 样式显示问题：检查 CSS 变量定义

3. **Git 同步**：
   ```bash
   # 提交更改
   git add .
   git commit -m "描述更改内容"
   git push origin main
   ```

## 💡 最佳实践

1. **先更新 WordPress**：WordPress 作为主站，先在这里更新内容
2. **使用版本控制**：所有更改都要提交到 Git
3. **保持数据结构一致**：三个平台使用相同的数据结构
4. **定期同步**：每次更新后立即同步到其他平台
5. **测试后发布**：在本地测试通过后再部署到线上

## 🎯 下一步优化

1. **自动化同步**：
   - 使用 GitHub Actions 自动部署
   - WordPress 更新后自动触发静态网站重新生成

2. **API 驱动**：
   - 小程序和静态网站完全通过 API 获取内容
   - 只需在 WordPress 后台更新，其他平台自动同步

3. **内容管理优化**：
   - 使用 Headless CMS
   - 统一的内容管理后台

---

**记住**：保持三个平台同步是关键！每次更新都要检查所有平台。 🚀
