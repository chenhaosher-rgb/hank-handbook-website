# OnePanel 安装指南

本文档提供在 OnePanel 面板中安装和配置"红人汉克手册" WordPress 主题的详细步骤。

## 目录

1. [环境准备](#环境准备)
2. [安装 WordPress](#安装-wordpress)
3. [上传主题](#上传主题)
4. [配置主题](#配置主题)
5. [性能优化](#性能优化)
6. [安全设置](#安全设置)
7. [常见问题](#常见问题)

---

## 环境准备

### 系统要求

- **操作系统**: Linux (推荐 CentOS 7+ 或 Ubuntu 18.04+)
- **Web 服务器**: Apache 2.4+ 或 Nginx 1.14+
- **PHP 版本**: 7.4 或更高版本
- **MySQL 版本**: 5.6 或更高版本 / MariaDB 10.2+
- **磁盘空间**: 至少 500MB 可用空间
- **内存**: 建议 512MB 以上

### PHP 扩展要求

确保以下 PHP 扩展已安装：

- `mysqli` 或 `pdo_mysql`
- `gd` 或 `imagick`
- `curl`
- `zip`
- `mbstring`
- `xml`
- `json`
- `openssl`

---

## 安装 WordPress

### 步骤 1: 登录 OnePanel

1. 访问您的 OnePanel 管理面板地址（通常是 `http://your-server-ip:8888`）
2. 使用管理员账号和密码登录

### 步骤 2: 创建网站

1. 在 OnePanel 左侧菜单中，点击 **"网站"**
2. 点击页面右上角的 **"添加站点"** 或 **"创建网站"** 按钮
3. 填写网站信息：
   - **域名**: 输入您的域名（例如：`example.com` 或 `www.example.com`）
   - **备注**: 红人汉克手册网站
   - **根目录**: 使用默认或自定义路径
   - **FTP**: 可选，如需 FTP 访问请创建

### 步骤 3: 创建数据库

1. 在 OnePanel 中点击 **"数据库"** 菜单
2. 点击 **"添加数据库"**
3. 填写数据库信息：
   - **数据库名**: `hank_handbook` (或自定义名称)
   - **用户名**: 创建数据库用户
   - **密码**: 设置强密码
   - **访问权限**: 本地服务器
4. 记录数据库名、用户名和密码，稍后配置 WordPress 时需要使用

### 步骤 4: 安装 WordPress

#### 方法 A: 使用 OnePanel 一键安装（如果支持）

1. 在网站管理页面，找到刚创建的网站
2. 点击 **"设置"** 或 **"管理"**
3. 查找 **"一键部署"** 或 **"应用安装"** 选项
4. 选择 **WordPress** 并点击安装
5. 按照提示完成安装

#### 方法 B: 手动安装

1. **下载 WordPress**
   ```bash
   cd /tmp
   wget https://cn.wordpress.org/latest-zh_CN.tar.gz
   ```

2. **解压并移动文件**
   ```bash
   tar -xzf latest-zh_CN.tar.gz
   # 假设网站根目录为 /www/wwwroot/example.com
   cp -r wordpress/* /www/wwwroot/example.com/
   ```

3. **设置文件权限**
   ```bash
   cd /www/wwwroot/example.com/
   chown -R www:www *
   chmod -R 755 *
   ```

4. **访问网站完成安装**
   - 在浏览器中访问您的域名
   - 按照 WordPress 安装向导完成配置
   - 输入之前创建的数据库信息

---

## 上传主题

### 方法 1: 使用 OnePanel 文件管理器

1. 在 OnePanel 中点击 **"文件"** 菜单
2. 导航到 WordPress 主题目录：`/www/wwwroot/example.com/wp-content/themes/`
3. 点击 **"上传"** 按钮
4. 上传主题文件夹的 ZIP 压缩包（需先将主题文件夹压缩）
5. 上传完成后，点击 ZIP 文件右侧的 **"解压"** 按钮
6. 确保解压后的文件夹名称为有效的主题名（建议使用英文，如 `hank-handbook`）

### 方法 2: 使用 FTP

1. 使用 FTP 客户端（如 FileZilla）连接到服务器
2. FTP 连接信息：
   - **主机**: 您的服务器 IP
   - **用户名**: 在 OnePanel 中创建的 FTP 用户
   - **密码**: FTP 密码
   - **端口**: 21 (默认)
3. 导航到 `/wp-content/themes/` 目录
4. 上传整个主题文件夹

### 方法 3: 通过 WordPress 后台上传

1. 登录 WordPress 后台（`http://yourdomain.com/wp-admin`）
2. 导航到 **外观 > 主题**
3. 点击 **"添加新主题"**
4. 点击 **"上传主题"**
5. 选择主题 ZIP 文件并上传
6. 点击 **"现在安装"**

---

## 配置主题

### 步骤 1: 启用主题

1. 登录 WordPress 后台
2. 导航到 **外观 > 主题**
3. 找到"红人汉克手册"主题
4. 点击 **"启用"** 按钮

### 步骤 2: 基础设置

1. 导航到 **外观 > 自定义**
2. 配置以下选项：

#### 站点身份
- 上传 Logo
- 设置网站标题和副标题
- 上传网站图标（Favicon）

#### Hero 区域设置
- Hero 标签：例如"红人汉克"
- Hero 标题：例如"少工作. 多赚钱. 享受生活."
- Hero 描述：网站简介
- CTA 按钮文字：例如"订阅"

#### 资源区域设置
- 资源标签：例如"资源"
- 资源区标题：例如"精选资源"

#### 博客区域设置
- 博客标签：例如"博客"
- 博客区标题：例如"探索你的好奇心"
- 博客描述：博客区简介

#### 社交媒体链接
- 填写您的社交媒体链接（Twitter、YouTube、LinkedIn、Instagram）

3. 点击 **"发布"** 保存设置

### 步骤 3: 创建菜单

1. 导航到 **外观 > 菜单**
2. 创建新菜单，命名为"主菜单"
3. 添加页面、文章或自定义链接
4. 将菜单分配到"主导航菜单"位置
5. 保存菜单

### 步骤 4: 添加资源

1. 导航到 **资源 > 添加资源**
2. 填写资源信息：
   - 标题：资源名称
   - 内容：资源描述
   - 资源链接：目标 URL
   - 按钮文字：自定义按钮文字
   - 是否设为重点推荐
3. 发布资源

### 步骤 5: 发布文章

1. 导航到 **文章 > 写文章**
2. 撰写您的内容
3. 设置特色图片（可选）
4. 选择分类和标签
5. 发布文章

---

## 性能优化

### 1. 启用 PHP OPcache

在 OnePanel 中启用 OPcache：

1. 点击 **"软件商店"** 或 **"PHP 设置"**
2. 找到您使用的 PHP 版本
3. 点击 **"设置"**
4. 在 **"扩展"** 或 **"配置"** 中启用 OPcache
5. 重启 PHP 服务

### 2. 安装缓存插件

推荐使用 **WP Super Cache** 或 **W3 Total Cache**：

1. 在 WordPress 后台，导航到 **插件 > 安装插件**
2. 搜索"WP Super Cache"
3. 点击 **"现在安装"**
4. 安装完成后点击 **"启用"**
5. 导航到 **设置 > WP Super Cache** 进行配置
6. 启用缓存功能

### 3. 配置 Nginx/Apache 缓存（可选）

#### Nginx 静态文件缓存

编辑 OnePanel 中的网站配置：

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    access_log off;
    add_header Cache-Control "public, immutable";
}
```

#### Apache 配置

主题已包含 `.htaccess` 文件，自动启用：
- GZIP 压缩
- 浏览器缓存
- 安全头部

### 4. 优化数据库

1. 安装 **WP-Optimize** 插件
2. 定期清理数据库
3. 在 OnePanel 中使用 phpMyAdmin 优化数据库表

### 5. 图片优化

1. 安装 **Smush** 或 **EWWW Image Optimizer** 插件
2. 自动压缩上传的图片
3. 使用 WebP 格式（如果服务器支持）

### 6. CDN 配置

1. 选择 CDN 服务商（如阿里云 OSS、腾讯云 COS、又拍云等）
2. 安装 CDN 插件或手动配置
3. 将静态资源（图片、CSS、JS）托管到 CDN

---

## 安全设置

### 1. 更改 WordPress 管理员用户名

默认的 `admin` 用户名容易被攻击：

1. 创建新的管理员账户
2. 使用新账户登录
3. 删除旧的 `admin` 账户

### 2. 使用强密码

- 密码长度至少 12 位
- 包含大小写字母、数字和特殊字符
- 定期更换密码

### 3. 安装安全插件

推荐安装 **Wordfence Security** 或 **iThemes Security**：

1. 在 WordPress 后台安装插件
2. 启用防火墙
3. 配置登录安全（限制登录尝试次数）
4. 启用双因素认证（可选）

### 4. 隐藏 WordPress 版本

在 `functions.php` 中添加（主题已包含）：

```php
remove_action('wp_head', 'wp_generator');
```

### 5. 禁用文件编辑

在 `wp-config.php` 中添加：

```php
define('DISALLOW_FILE_EDIT', true);
```

### 6. 定期备份

在 OnePanel 中设置自动备份：

1. 点击 **"计划任务"**
2. 添加备份任务
3. 设置备份频率（建议每天或每周）
4. 选择备份内容（网站文件 + 数据库）

或使用 WordPress 备份插件如 **UpdraftPlus**。

### 7. SSL 证书

启用 HTTPS 加密：

1. 在 OnePanel 中为网站申请 SSL 证书（Let's Encrypt 免费证书）
2. 启用 HTTPS 强制跳转
3. 在 WordPress 设置中将网站 URL 改为 `https://`

---

## 常见问题

### Q1: 主题上传后无法启用？

**解决方案**：
- 检查文件权限：`chmod -R 755 /path/to/theme`
- 确保主题文件夹结构正确，`style.css` 必须在根目录
- 查看 WordPress 错误日志

### Q2: 图片无法上传？

**解决方案**：
- 检查 `wp-content/uploads` 目录权限：`chmod -R 755 uploads`
- 增加 PHP 上传文件大小限制（在 OnePanel PHP 设置中）
- 检查磁盘空间是否充足

### Q3: 网站加载缓慢？

**解决方案**：
- 启用缓存插件
- 优化图片大小
- 使用 CDN
- 升级服务器配置

### Q4: 邮件订阅不工作？

**解决方案**：
- 安装邮件服务插件（如 WP Mail SMTP）
- 配置 SMTP 设置
- 或集成第三方邮件服务（Mailchimp、ConvertKit）

### Q5: 404 错误（固定链接不工作）？

**解决方案**：
- 在 WordPress 后台，导航到 **设置 > 固定链接**
- 重新保存固定链接设置
- 确保服务器支持 URL 重写（Apache 需要 mod_rewrite）

### Q6: 主题样式不显示？

**解决方案**：
- 清除浏览器缓存
- 清除 WordPress 缓存（如果使用缓存插件）
- 检查 `style.css` 文件是否存在
- 查看浏览器控制台是否有 CSS 加载错误

### Q7: AJAX 加载更多不工作？

**解决方案**：
- 确保 JavaScript 文件已正确加载
- 检查浏览器控制台是否有 JavaScript 错误
- 验证 WordPress AJAX URL 配置正确

### Q8: 如何备份主题设置？

**解决方案**：
- 使用 **Customizer Export/Import** 插件导出主题设置
- 定期备份整个网站（使用 OnePanel 或 UpdraftPlus）

---

## 技术支持

如需进一步帮助：

1. **OnePanel 文档**: [OnePanel 官方文档]
2. **WordPress 支持**: [WordPress 中文支持论坛](https://cn.forums.wordpress.org/)
3. **主题支持**: [联系主题开发者]

---

## 更新日志

**版本 1.0.0** - 2025-10-09
- 初始发布
- OnePanel 完全兼容
- 完整的安装和配置文档

---

**祝您使用愉快！** 🎉

