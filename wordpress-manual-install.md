# WordPress 手动安装指南

## 📥 下载 WordPress

1. **访问官网**：https://wordpress.org/download/
2. **下载最新版本**：wordpress-x.x.x.zip
3. **解压文件**：解压到网站根目录

## 🗄️ 配置数据库

### 通过 OnePanel 创建数据库：

1. **登录 OnePanel**
2. **进入数据库管理**
3. **创建新数据库**：
   - 数据库名：`wp_hank_handbook`
   - 用户名：`wp_user`
   - 密码：`strong_password_123`
   - 主机：`localhost`

## ⚙️ 配置 WordPress

### 1. 重命名配置文件
```bash
cp wp-config-sample.php wp-config.php
```

### 2. 编辑 wp-config.php
```php
// ** MySQL 设置 - 具体信息来自您正在使用的主机 ** //
/** WordPress数据库的名称 */
define( 'DB_NAME', 'wp_hank_handbook' );

/** MySQL数据库用户名 */
define( 'DB_USER', 'wp_user' );

/** MySQL数据库密码 */
define( 'DB_PASSWORD', 'strong_password_123' );

/** MySQL主机 */
define( 'DB_HOST', 'localhost' );

/** 创建数据表时默认的文字编码 */
define( 'DB_CHARSET', 'utf8' );

/** 数据库整理类型。如不确定请勿更改 */
define( 'DB_COLLATE', '' );

/**#@+
 * 身份认证密钥与盐。
 * 在 https://api.wordpress.org/secret-key/1.1/salt/
 * 生成密钥
 */
define( 'AUTH_KEY',         'put your unique phrase here' );
define( 'SECURE_AUTH_KEY',  'put your unique phrase here' );
define( 'LOGGED_IN_KEY',    'put your unique phrase here' );
define( 'NONCE_KEY',        'put your unique phrase here' );
define( 'AUTH_SALT',        'put your unique phrase here' );
define( 'SECURE_AUTH_SALT', 'put your unique phrase here' );
define( 'LOGGED_IN_SALT',   'put your unique phrase here' );
define( 'NONCE_SALT',       'put your unique phrase here' );

/**#@-*/

/**
 * WordPress数据表前缀。
 */
$table_prefix = 'wp_';

/**
 * 开发者专用：WordPress调试模式。
 */
define( 'WP_DEBUG', false );

/* 好了！请不要再继续编辑。请保存本文件。使用愉快！ */
```

### 3. 设置文件权限
```bash
chmod 755 wp-content/
chmod 644 wp-config.php
```

## 🚀 运行安装向导

1. **访问安装页面**：
   - http://您的IP/wp-admin/install.php

2. **填写安装信息**：
   - 网站标题：汉克运营知识库·搞钱计划
   - 用户名：admin
   - 密码：设置强密码
   - 邮箱：您的邮箱地址

3. **完成安装**

## 🔧 安装后配置

### 1. 上传主题
- 下载我们之前打包的主题文件
- 通过 WordPress 后台 > 外观 > 主题 > 上传主题

### 2. 配置基本设置
- 设置 > 常规：配置网站信息
- 设置 > 固定链接：选择美观的链接结构
- 用户 > 个人资料：完善个人信息

### 3. 安全配置
- 更改默认管理员用户名
- 安装安全插件
- 设置备份策略

## 📞 如果安装失败

### 常见问题：
1. **数据库连接失败**：检查数据库配置信息
2. **文件权限问题**：调整文件和目录权限
3. **内存不足**：增加 PHP 内存限制
4. **版本兼容性**：检查 PHP 和 MySQL 版本

### 获取帮助：
- 查看错误日志
- 联系服务器技术支持
- 使用诊断工具检查问题
