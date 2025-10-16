# OnePanel WordPress 404 错误解决方案

## 🔍 问题诊断

### 当前状况：
- **错误**：404 Not Found
- **服务器**：openresty (基于 Nginx)
- **可能原因**：
  1. WordPress 未正确安装
  2. 文件路径不正确
  3. 域名/端口配置问题
  4. 虚拟主机配置错误

## 🛠️ 解决步骤

### 步骤 1：检查 OnePanel 应用状态

1. **登录 OnePanel**：
   - 地址：http://您的IP:8090/panel
   - 用户：6ihvjwwo2i
   - 密码：xkbjlocn1m

2. **检查应用列表**：
   - 找到 WordPress 应用
   - 查看状态是否为"运行中"
   - 记录应用的访问地址和端口

### 步骤 2：检查 WordPress 安装状态

#### 方法 A：通过 OnePanel 重新安装
1. 如果 WordPress 状态异常，尝试重启
2. 如果重启无效，删除并重新安装
3. 确保选择正确的安装路径

#### 方法 B：检查文件结构
通过 OnePanel 文件管理器检查：
```
/www/
├── html/          # 或 /wwwroot/
│   ├── index.php  # WordPress 主文件
│   ├── wp-admin/
│   ├── wp-content/
│   └── wp-includes/
```

### 步骤 3：配置正确的访问地址

#### 常见访问方式：
1. **IP 访问**：http://您的服务器IP
2. **端口访问**：http://您的服务器IP:端口号
3. **域名访问**：http://您的域名（如果已配置）

### 步骤 4：手动安装 WordPress（如果自动安装失败）

#### 下载 WordPress：
1. 访问 https://wordpress.org/download/
2. 下载最新版本
3. 解压到网站根目录

#### 配置数据库：
1. 在 OnePanel 创建 MySQL 数据库
2. 记录数据库信息：
   - 数据库名
   - 用户名
   - 密码
   - 主机地址

#### 运行安装向导：
1. 访问 http://您的IP/wp-admin/install.php
2. 按照向导完成安装
3. 设置管理员账户

## 🔧 快速修复脚本

### 创建 WordPress 安装检查脚本

```php
<?php
// wp-check.php - WordPress 安装检查工具
echo "<h1>WordPress 安装状态检查</h1>";

// 检查文件是否存在
$wp_files = [
    'wp-config.php',
    'wp-admin/index.php',
    'wp-includes/wp-db.php',
    'index.php'
];

echo "<h2>文件检查：</h2>";
foreach ($wp_files as $file) {
    if (file_exists($file)) {
        echo "✅ $file 存在<br>";
    } else {
        echo "❌ $file 缺失<br>";
    }
}

// 检查数据库连接
echo "<h2>数据库检查：</h2>";
if (file_exists('wp-config.php')) {
    require_once('wp-config.php');
    
    $connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    
    if ($connection->connect_error) {
        echo "❌ 数据库连接失败：" . $connection->connect_error . "<br>";
    } else {
        echo "✅ 数据库连接成功<br>";
        
        // 检查表是否存在
        $tables = ['wp_users', 'wp_posts', 'wp_options'];
        foreach ($tables as $table) {
            $result = $connection->query("SHOW TABLES LIKE '$table'");
            if ($result->num_rows > 0) {
                echo "✅ 表 $table 存在<br>";
            } else {
                echo "❌ 表 $table 缺失<br>";
            }
        }
    }
} else {
    echo "❌ wp-config.php 不存在，请先配置数据库<br>";
}

echo "<h2>服务器信息：</h2>";
echo "PHP 版本：" . phpversion() . "<br>";
echo "当前目录：" . getcwd() . "<br>";
echo "服务器软件：" . $_SERVER['SERVER_SOFTWARE'] . "<br>";
?>
```

## 📞 紧急解决方案

### 如果所有方法都失败：

1. **完全重新安装**：
   - 删除现有 WordPress 文件
   - 通过 OnePanel 重新安装 WordPress
   - 或手动下载安装

2. **联系技术支持**：
   - 提供 OnePanel 面板截图
   - 提供服务器配置信息
   - 提供错误日志

3. **使用备用方案**：
   - 考虑使用静态网站版本
   - 或使用其他 CMS 系统

## 🔐 安装完成后的安全配置

1. **删除检查文件**：删除 wp-check.php
2. **修改默认设置**：
   - 更改管理员用户名
   - 设置强密码
   - 更改登录地址
3. **安装安全插件**
4. **配置备份策略**

---

**下一步**：请先尝试通过 OnePanel 检查 WordPress 应用状态，然后告诉我具体的错误信息！
