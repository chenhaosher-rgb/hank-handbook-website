# 红人汉克手册 - 静态网站

一个现代、简洁的知识库静态网站，灵感来自 Dan Koe。

## 🚀 快速开始

### 方法 1: 使用 Python（推荐）

```bash
# 在 static-site 目录下
cd static-site
python3 -m http.server 8000
```

然后在浏览器中访问: `http://localhost:8000`

### 方法 2: 使用 Node.js

```bash
# 安装 http-server
npm install -g http-server

# 启动服务器
cd static-site
http-server -p 8000
```

### 方法 3: 使用 VS Code Live Server

1. 安装 "Live Server" 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

## 📁 文件结构

```
static-site/
├── index.html          # 首页
├── blog-post.html      # 文章页面示例
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # JavaScript 功能
└── README.md           # 说明文档
```

## ✨ 功能特性

- ✅ 完全响应式设计
- ✅ 现代简洁的 UI
- ✅ 移动端菜单
- ✅ 邮件订阅表单
- ✅ 平滑滚动
- ✅ 加载动画
- ✅ 无依赖（原生 HTML/CSS/JS）

## 🎨 自定义

### 修改颜色

编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
    --color-primary: #000000;
    --color-secondary: #ffffff;
    --color-accent: #f5f5f5;
    /* ... */
}
```

### 修改内容

直接编辑 HTML 文件即可。

## 📧 邮件订阅集成

目前邮件订阅是模拟功能。要集成真实的邮件服务：

1. 编辑 `js/main.js` 中的 `initEmailSignup` 函数
2. 添加您的邮件服务 API（Mailchimp、ConvertKit 等）

示例（Mailchimp）：

```javascript
// 在 initEmailSignup 函数中
fetch('YOUR_MAILCHIMP_API_URL', {
    method: 'POST',
    body: JSON.stringify({ email: email }),
    headers: { 'Content-Type': 'application/json' }
})
.then(response => response.json())
.then(data => {
    showMessage(form, '订阅成功！', 'success');
});
```

## 🌐 部署

### GitHub Pages

1. 将代码推送到 GitHub
2. 进入仓库设置 > Pages
3. 选择分支和 /static-site 目录
4. 保存

### Netlify

1. 拖放 `static-site` 文件夹到 Netlify
2. 或连接 Git 仓库自动部署

### Vercel

```bash
cd static-site
vercel
```

## 📱 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)
- 移动浏览器

## 📝 许可证

MIT License

## 🙏 致谢

设计灵感来自 Dan Koe 的网站。

