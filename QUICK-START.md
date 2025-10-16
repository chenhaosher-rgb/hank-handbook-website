# 🚀 汉克运营知识库 - 快速启动指南

## 📋 项目概述

本项目包含**三个版本**的汉克运营知识库网站：

1. **WordPress 主题** - 用于部署到 OnePanel 的动态网站
2. **静态网站** - 用于本地预览和快速部署
3. **微信小程序** - 移动端原生应用

## 🎯 三个版本的使用场景

| 版本 | 用途 | 适合人群 |
|------|------|----------|
| **WordPress** | 官方网站，SEO 优化，后台管理内容 | 需要经常更新内容的用户 |
| **静态网站** | 快速预览，轻量部署，无需数据库 | 开发测试，静态托管 |
| **微信小程序** | 移动端体验，微信生态流量 | 希望获取微信用户的运营者 |

## 1️⃣ WordPress 版本（推荐用于生产环境）

### 快速部署

```bash
# 1. 打包主题
cd /Users/hankchan/Downloads/Hank/红人汉克手册网站
zip -r "红人汉克手册主题.zip" . \
  -x "*.git*" "static-site/*" "miniprogram/*" "node_modules/*"

# 2. 上传到 WordPress
# - 登录 WordPress 后台：http://47.108.70.67/wp-admin
# - 外观 > 主题 > 上传主题
# - 选择 zip 文件并启用
```

### 配置步骤

1. **登录 WordPress 后台**
2. **上传微信二维码**：
   - 媒体 > 添加
   - 上传 `wechat-qr.png`
3. **自定义主题设置**：
   - 外观 > 自定义
   - 修改首页标题、描述等
4. **发布文章和资源**

详细文档：[WORDPRESS-UPLOAD-GUIDE.md](./WORDPRESS-UPLOAD-GUIDE.md)

## 2️⃣ 静态网站（推荐用于本地预览）

### 快速启动

```bash
# 方法 1：使用 Python
cd static-site
python3 -m http.server 8000

# 方法 2：使用启动脚本
cd static-site
./start-server.sh

# 访问：http://localhost:8000
```

### 自定义内容

编辑以下文件：
- `index.html` - 首页内容
- `blog-post.html` - 文章页面
- `css/style.css` - 样式
- `js/main.js` - 功能和搜索数据库

详细文档：[static-site/README.md](./static-site/README.md)

## 3️⃣ 微信小程序（推荐用于移动端）

### 快速启动

1. **下载微信开发者工具**：
   - 访问：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

2. **打开项目**：
   - 启动微信开发者工具
   - 选择 "导入项目"
   - 选择 `miniprogram` 目录
   - 使用测试号或填写 AppID

3. **编译和预览**：
   - 点击 "编译" 按钮
   - 在模拟器中查看效果
   - 扫码在真机预览

### 准备工作

1. **准备图片资源**（详见 `miniprogram/images/README.md`）：
   - TabBar 图标（8 个文件）
   - 微信二维码
   - 文章封面图
   - 个人头像

2. **配置服务器域名**（如使用 API）：
   - 微信公众平台 > 开发 > 开发设置
   - 添加 `https://47.108.70.67`

详细文档：[miniprogram/README.md](./miniprogram/README.md)

## 🔄 三平台同步开发

### 核心原则

> **保持三个平台的内容和功能一致！**

### 同步流程

1. **WordPress 为主**：先在 WordPress 更新内容
2. **同步到静态网站**：复制内容到 HTML 文件
3. **同步到小程序**：更新数据或通过 API 获取

### 需要同步的内容

- ✅ 文章内容
- ✅ 资源文件
- ✅ 搜索数据库
- ✅ 样式和布局
- ✅ 联系方式（微信二维码）

详细文档：[THREE-PLATFORM-SYNC-GUIDE.md](./THREE-PLATFORM-SYNC-GUIDE.md)

## 📁 项目目录结构

```
红人汉克手册网站/
├── 📂 WordPress 主题（根目录）
│   ├── index.php
│   ├── functions.php
│   ├── style.css
│   └── js/main.js
│
├── 📂 static-site/          # 静态网站
│   ├── index.html
│   ├── css/
│   └── js/
│
├── 📂 miniprogram/          # 微信小程序
│   ├── app.js
│   ├── pages/
│   └── utils/
│
├── 📂 wp-content/uploads/resources/  # 资源文件
│   ├── 用户增长/
│   ├── 内容创作/
│   └── 变现策略/
│
└── 📄 文档
    ├── THREE-PLATFORM-SYNC-GUIDE.md      # 三平台同步指南
    ├── WORDPRESS-UPLOAD-GUIDE.md         # WordPress 上传指南
    ├── CURSOR-GITHUB-QUICK-START.md      # GitHub 协作指南
    └── README.md                         # 总体说明
```

## 🛠️ 常用命令

### Git 操作

```bash
# 查看状态
git status

# 提交更改
git add .
git commit -m "描述更改内容"
git push origin main

# 拉取更新
git pull origin main
```

### 本地开发

```bash
# 启动静态网站
cd static-site && python3 -m http.server 8000

# 查看运行的服务
lsof -i :8000

# 停止服务
kill -9 $(lsof -t -i:8000)
```

### WordPress 打包

```bash
# 打包主题
zip -r "红人汉克手册主题.zip" . \
  -x "*.git*" "static-site/*" "miniprogram/*"

# 查看 zip 内容
unzip -l "红人汉克手册主题.zip" | head -20
```

## 🎨 主题配色方案

全平台统一使用以下颜色：

```css
--color-red: #dc2626;       /* 主题红色 */
--color-black: #1a1a1a;     /* 主题黑色 */
--color-white: #ffffff;     /* 主题白色 */
--color-gray: #666666;      /* 次要文字 */
--color-light-gray: #f5f5f5; /* 背景色 */
```

## 📝 常见任务

### 任务 1：添加新文章

1. WordPress：后台 > 文章 > 写文章
2. 静态网站：编辑 `index.html`，添加文章卡片
3. 小程序：更新 `pages/articles/articles.js` 数据

### 任务 2：添加新资源

1. 上传文件到 `/wp-content/uploads/resources/[分类]/`
2. 更新三个平台的搜索数据库：
   - WordPress: `js/main.js`
   - 静态网站: `static-site/js/main.js`
   - 小程序: `miniprogram/utils/searchDatabase.js`

### 任务 3：更新微信二维码

1. 准备新二维码图片
2. 替换三个位置的文件：
   - WordPress: `/wechat-qr.png`
   - 静态网站: `static-site/images/wechat-qr.jpg`
   - 小程序: `miniprogram/images/wechat-qr.jpg`

### 任务 4：修改样式

1. WordPress: 编辑 `style.css`
2. 静态网站: 编辑 `static-site/css/style.css`
3. 小程序: 编辑 `miniprogram/app.wxss`

## 🚨 故障排除

### WordPress 登录不了

1. 使用诊断工具：上传 `wp-diagnostic.php`
2. 重置密码：上传 `wp-admin-reset.php`
3. 查看：[wordpress-login-troubleshoot.md](./wordpress-login-troubleshoot.md)

### 静态网站端口被占用

```bash
# 查找进程
lsof -i :8000

# 杀死进程
kill -9 $(lsof -t -i:8000)

# 重新启动
cd static-site && python3 -m http.server 8000
```

### 小程序编译错误

1. 检查 `app.json` 配置是否正确
2. 确保所有页面文件都存在（.wxml, .wxss, .js, .json）
3. 查看控制台错误信息
4. 清除缓存重新编译

### GitHub 推送失败

```bash
# 检查 Git 配置
git config --global user.name
git config --global user.email

# 重新配置（如果需要）
git config --global user.name "chenhaosher-rgb"
git config --global user.email "chenhaosher@gmail.com"

# 重新推送
git push origin main
```

## 📞 获取帮助

### 文档资源
- WordPress 指南：`WORDPRESS-UPLOAD-GUIDE.md`
- 三平台同步：`THREE-PLATFORM-SYNC-GUIDE.md`
- GitHub 协作：`CURSOR-GITHUB-QUICK-START.md`
- 总体说明：`README.md`

### 服务器信息
- **服务器 IP**：47.108.70.67
- **OnePanel 面板**：http://47.108.70.67:8090/panel
- **WordPress 网站**：http://47.108.70.67

### GitHub 仓库
- **仓库地址**：https://github.com/chenhaosher-rgb/hank-handbook-website

## ✅ 上线检查清单

### WordPress 上线前
- [ ] 主题已上传并启用
- [ ] 微信二维码已上传
- [ ] 首页内容已自定义
- [ ] 至少发布 3 篇文章
- [ ] 资源文件已上传
- [ ] 搜索功能正常

### 静态网站上线前
- [ ] 所有内容已更新
- [ ] 图片资源已优化
- [ ] 链接全部有效
- [ ] 本地预览正常

### 小程序上线前
- [ ] 所有页面编译无错误
- [ ] 图片资源已准备
- [ ] 服务器域名已配置
- [ ] 真机预览正常
- [ ] 已提交审核

## 🎯 下一步计划

1. **完善内容**：
   - 发布更多文章
   - 上传更多资源
   - 完善搜索数据库

2. **优化功能**：
   - 集成 WordPress REST API
   - 实现自动同步
   - 添加数据统计

3. **推广运营**：
   - SEO 优化
   - 社交媒体推广
   - 用户反馈收集

---

**祝您使用愉快！** 🚀

如有问题，请查看详细文档或通过 GitHub Issues 反馈。
