# 红人汉克手册 WordPress 主题

一个现代、简洁的知识库 WordPress 主题，专为内容创作者和个人品牌设计。

## 主题特点

- 🎨 **现代简洁设计** - 灵感来自优秀的内容创作者网站
- 📱 **完全响应式** - 在所有设备上都能完美显示
- ⚡ **性能优化** - 快速加载，优秀的用户体验
- 🔧 **高度可定制** - 通过 WordPress 定制器轻松配置
- 📝 **自定义文章类型** - 内置资源管理系统
- 💌 **邮件订阅** - 集成邮件订阅表单
- 🌐 **SEO 友好** - 优化的结构和语义化 HTML
- 🎯 **OnePanel 兼容** - 可在 OnePanel 面板中完美运行

## 安装方法

### 方法一：在 WordPress 后台安装

1. 将整个主题文件夹上传到 `/wp-content/themes/` 目录
2. 登录 WordPress 后台
3. 导航到 **外观 > 主题**
4. 找到"红人汉克手册"主题并点击"启用"

### 方法二：通过 ZIP 文件安装

1. 将主题文件夹压缩为 ZIP 文件
2. 登录 WordPress 后台
3. 导航到 **外观 > 主题 > 添加新主题**
4. 点击"上传主题"按钮
5. 选择 ZIP 文件并点击"现在安装"
6. 安装完成后点击"启用"

## OnePanel 部署说明

### 环境要求

- PHP 7.4 或更高版本
- MySQL 5.6 或更高版本
- WordPress 5.0 或更高版本
- Apache 或 Nginx Web 服务器

### 在 OnePanel 中安装 WordPress

1. **登录 OnePanel 面板**
   - 访问您的 OnePanel 管理地址
   - 使用管理员账号登录

2. **创建网站**
   - 点击"网站"菜单
   - 点击"创建网站"
   - 选择"WordPress"作为应用类型
   - 填写域名、数据库信息等
   - 点击"确定"创建

3. **上传主题**
   - 使用 FTP 或 OnePanel 文件管理器
   - 将主题文件夹上传到 `/wp-content/themes/` 目录
   - 或在 WordPress 后台上传主题 ZIP 文件

4. **启用主题**
   - 登录 WordPress 后台
   - 导航到 **外观 > 主题**
   - 启用"红人汉克手册"主题

### OnePanel 性能优化建议

1. **开启 OPcache**
   - 在 OnePanel 中启用 PHP OPcache 加速
   - 提升 PHP 执行效率

2. **配置缓存**
   - 安装 WordPress 缓存插件（如 WP Super Cache）
   - 在 OnePanel 中配置 Nginx 静态文件缓存

3. **CDN 配置**
   - 使用 CDN 加速静态资源
   - 在主题中配置 CDN URL

4. **数据库优化**
   - 定期优化 WordPress 数据库
   - 使用 OnePanel 的数据库管理工具

## 主题配置

### 1. 基础设置

导航到 **外观 > 自定义**，您可以配置以下选项：

#### Hero 区域设置
- **Hero 标签** - 页面顶部的小标签文字
- **Hero 标题** - 主标题文字
- **Hero 描述** - 描述文字
- **CTA 按钮文字** - 订阅按钮的文字

#### 资源区域设置
- **资源标签** - 资源区的小标签
- **资源区标题** - 资源区的主标题

#### 博客区域设置
- **博客标签** - 博客区的小标签
- **博客区标题** - 博客区的主标题
- **博客描述** - 博客区的描述文字

#### 社交媒体链接
- Twitter URL
- YouTube URL
- LinkedIn URL
- Instagram URL

### 2. 菜单设置

导航到 **外观 > 菜单**：

1. 创建新菜单或编辑现有菜单
2. 添加页面、文章、自定义链接等
3. 将菜单分配到"主导航菜单"或"页脚菜单"位置

### 3. Logo 设置

导航到 **外观 > 自定义 > 站点身份**：

- 上传您的 Logo 图片
- 设置网站标题和副标题
- 添加网站图标（Favicon）

### 4. 添加资源

主题包含自定义的"资源"文章类型：

1. 导航到 **资源 > 添加资源**
2. 填写资源标题
3. 添加资源描述（在内容编辑器中）
4. 填写资源详情：
   - **资源链接** - 资源的目标 URL
   - **按钮文字** - 自定义按钮文字
   - **设为重点推荐** - 勾选以突出显示

### 5. 小工具设置

导航到 **外观 > 小工具**：

主题提供以下小工具区域：
- **页脚区域 1** - 页脚第一列
- **页脚区域 2** - 页脚第二列
- **页脚区域 3** - 页脚第三列

## 主题文件结构

```
红人汉克手册网站/
├── style.css              # 主样式文件
├── functions.php          # 主题功能文件
├── index.php              # 首页模板
├── header.php             # 头部模板
├── footer.php             # 页脚模板
├── single.php             # 单篇文章模板
├── page.php               # 页面模板
├── archive.php            # 存档页面模板
├── search.php             # 搜索结果模板
├── 404.php                # 404 错误页面
├── screenshot.png         # 主题缩略图
├── README.md              # 说明文档
├── js/
│   └── main.js            # JavaScript 文件
└── template-parts/
    └── content-post-card.php  # 文章卡片模板
```

## 推荐插件

为了获得最佳体验，建议安装以下插件：

### 必备插件
- **Contact Form 7** - 联系表单
- **Yoast SEO** - SEO 优化
- **Akismet** - 反垃圾评论

### 可选插件
- **WP Super Cache** - 页面缓存
- **Mailchimp for WordPress** - 邮件订阅集成
- **Advanced Custom Fields** - 自定义字段
- **WP Smush** - 图片优化
- **Google Analytics Dashboard for WP** - 数据分析

## 邮件订阅集成

主题内置邮件订阅表单，您可以通过以下方式集成：

1. **使用 Mailchimp**
   - 安装 "Mailchimp for WordPress" 插件
   - 配置 API 密钥
   - 修改 `functions.php` 中的订阅处理代码

2. **使用 ConvertKit**
   - 安装 ConvertKit 插件
   - 配置 API 设置
   - 更新表单处理逻辑

3. **自定义实现**
   - 在 `functions.php` 中添加 AJAX 处理函数
   - 集成您选择的邮件服务提供商 API

## 自定义开发

### 修改样式

编辑 `style.css` 文件或添加子主题的自定义 CSS。

CSS 变量定义在 `:root` 中，您可以轻松修改：

```css
:root {
    --color-primary: #000000;    /* 主色调 */
    --color-secondary: #ffffff;  /* 次色调 */
    --color-accent: #f5f5f5;     /* 强调色 */
    --font-primary: ...;         /* 主字体 */
}
```

### 添加新功能

在 `functions.php` 中添加您的自定义功能：

```php
// 添加自定义短代码
function my_custom_shortcode() {
    return '<div>自定义内容</div>';
}
add_shortcode('my_shortcode', 'my_custom_shortcode');
```

### 修改模板

创建子主题以避免主题更新时丢失修改：

1. 创建子主题文件夹
2. 添加 `style.css` 和 `functions.php`
3. 复制需要修改的模板文件到子主题

## 常见问题

### Q: 如何更改主题颜色？

A: 编辑 `style.css` 文件中的 CSS 变量，或在 WordPress 定制器中添加自定义 CSS。

### Q: 如何添加更多社交媒体链接？

A: 编辑 `functions.php` 中的 `hank_handbook_customize_register` 函数，添加新的社交媒体设置。

### Q: 主题支持多语言吗？

A: 主题准备好了翻译功能。您可以使用 Loco Translate 插件或手动创建翻译文件。

### Q: 如何在 OnePanel 中备份网站？

A: 使用 OnePanel 的备份功能，或安装 WordPress 备份插件如 UpdraftPlus。

### Q: 加载更多按钮不工作怎么办？

A: 确保 JavaScript 已正确加载，检查浏览器控制台是否有错误。验证 AJAX URL 配置正确。

## 技术支持

如需技术支持或有任何问题，请通过以下方式联系：

- 网站：[您的网站 URL]
- 邮箱：[您的邮箱]

## 更新日志

### 版本 1.0.0 - 2025-10-09
- 初始版本发布
- 现代简洁的设计
- 响应式布局
- 自定义资源文章类型
- OnePanel 完全兼容
- 邮件订阅表单
- AJAX 加载更多功能

## 许可证

本主题基于 GNU General Public License v2 或更高版本发布。

## 致谢

设计灵感来自优秀的内容创作者和知识分享者。

---

© 2025 红人汉克手册. 保留所有权利.

