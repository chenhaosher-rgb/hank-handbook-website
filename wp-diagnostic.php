<?php
/**
 * WordPress 安装诊断工具
 * 使用方法：上传到网站根目录，访问此文件进行诊断
 */

// 设置错误报告
error_reporting(E_ALL);
ini_set('display_errors', 1);

?>
<!DOCTYPE html>
<html>
<head>
    <title>WordPress 安装诊断工具</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f1f1f1; }
        .container { background: white; padding: 30px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .success { color: #28a745; }
        .error { color: #dc3545; }
        .warning { color: #ffc107; }
        .info { color: #17a2b8; }
        .section { margin: 20px 0; padding: 15px; border-left: 4px solid #007cba; background: #f8f9fa; }
        .file-list { background: #f8f9fa; padding: 10px; border-radius: 3px; margin: 10px 0; }
        .btn { background: #007cba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 3px; display: inline-block; margin: 5px; }
        .btn:hover { background: #005a87; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 WordPress 安装诊断工具</h1>
        
        <?php
        echo "<div class='section'>";
        echo "<h2>📊 服务器环境信息</h2>";
        echo "<table>";
        echo "<tr><th>项目</th><th>值</th></tr>";
        echo "<tr><td>PHP 版本</td><td>" . phpversion() . "</td></tr>";
        echo "<tr><td>服务器软件</td><td>" . ($_SERVER['SERVER_SOFTWARE'] ?? '未知') . "</td></tr>";
        echo "<tr><td>当前目录</td><td>" . getcwd() . "</td></tr>";
        echo "<tr><td>文档根目录</td><td>" . ($_SERVER['DOCUMENT_ROOT'] ?? '未知') . "</td></tr>";
        echo "<tr><td>访问地址</td><td>" . ($_SERVER['HTTP_HOST'] ?? '未知') . "</td></tr>";
        echo "<tr><td>请求 URI</td><td>" . ($_SERVER['REQUEST_URI'] ?? '未知') . "</td></tr>";
        echo "</table>";
        echo "</div>";

        echo "<div class='section'>";
        echo "<h2>📁 WordPress 文件检查</h2>";
        
        $wp_files = [
            'wp-config.php' => 'WordPress 配置文件',
            'index.php' => 'WordPress 主入口文件',
            'wp-admin/index.php' => 'WordPress 后台入口',
            'wp-includes/wp-db.php' => 'WordPress 数据库类',
            'wp-content/' => 'WordPress 内容目录',
            'wp-admin/' => 'WordPress 后台目录',
            'wp-includes/' => 'WordPress 核心文件目录'
        ];
        
        echo "<table>";
        echo "<tr><th>文件/目录</th><th>状态</th><th>说明</th></tr>";
        
        foreach ($wp_files as $file => $description) {
            if (file_exists($file)) {
                if (is_dir($file)) {
                    echo "<tr><td>$file</td><td class='success'>✅ 目录存在</td><td>$description</td></tr>";
                } else {
                    echo "<tr><td>$file</td><td class='success'>✅ 文件存在</td><td>$description</td></tr>";
                }
            } else {
                echo "<tr><td>$file</td><td class='error'>❌ 不存在</td><td>$description</td></tr>";
            }
        }
        echo "</table>";
        echo "</div>";

        echo "<div class='section'>";
        echo "<h2>🗄️ 数据库连接检查</h2>";
        
        if (file_exists('wp-config.php')) {
            echo "<p class='info'>📋 正在检查 wp-config.php...</p>";
            
            // 尝试读取配置
            $config_content = file_get_contents('wp-config.php');
            
            // 检查关键配置项
            $config_checks = [
                'DB_NAME' => '数据库名',
                'DB_USER' => '数据库用户',
                'DB_PASSWORD' => '数据库密码',
                'DB_HOST' => '数据库主机'
            ];
            
            echo "<table>";
            echo "<tr><th>配置项</th><th>状态</th><th>说明</th></tr>";
            
            foreach ($config_checks as $constant => $description) {
                if (strpos($config_content, $constant) !== false) {
                    echo "<tr><td>$constant</td><td class='success'>✅ 已配置</td><td>$description</td></tr>";
                } else {
                    echo "<tr><td>$constant</td><td class='error'>❌ 未配置</td><td>$description</td></tr>";
                }
            }
            echo "</table>";
            
            // 尝试连接数据库
            try {
                require_once('wp-config.php');
                
                if (defined('DB_HOST') && defined('DB_NAME') && defined('DB_USER')) {
                    $connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
                    
                    if ($connection->connect_error) {
                        echo "<p class='error'>❌ 数据库连接失败：" . $connection->connect_error . "</p>";
                    } else {
                        echo "<p class='success'>✅ 数据库连接成功</p>";
                        
                        // 检查 WordPress 表
                        $tables = ['wp_users', 'wp_posts', 'wp_options', 'wp_comments'];
                        echo "<h3>WordPress 数据表检查：</h3>";
                        echo "<table>";
                        echo "<tr><th>表名</th><th>状态</th></tr>";
                        
                        foreach ($tables as $table) {
                            $result = $connection->query("SHOW TABLES LIKE '$table'");
                            if ($result && $result->num_rows > 0) {
                                echo "<tr><td>$table</td><td class='success'>✅ 存在</td></tr>";
                            } else {
                                echo "<tr><td>$table</td><td class='error'>❌ 不存在</td></tr>";
                            }
                        }
                        echo "</table>";
                        
                        $connection->close();
                    }
                } else {
                    echo "<p class='error'>❌ 数据库配置常量未定义</p>";
                }
            } catch (Exception $e) {
                echo "<p class='error'>❌ 数据库连接异常：" . $e->getMessage() . "</p>";
            }
        } else {
            echo "<p class='error'>❌ wp-config.php 不存在，WordPress 可能未正确安装</p>";
        }
        echo "</div>";

        echo "<div class='section'>";
        echo "<h2>🔗 访问链接测试</h2>";
        
        $test_urls = [
            '/' => '网站首页',
            '/wp-admin/' => 'WordPress 后台',
            '/wp-admin/install.php' => 'WordPress 安装页面'
        ];
        
        echo "<table>";
        echo "<tr><th>链接</th><th>描述</th><th>测试</th></tr>";
        
        foreach ($test_urls as $url => $description) {
            $full_url = 'http://' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . $url;
            echo "<tr>";
            echo "<td><a href='$full_url' target='_blank'>$url</a></td>";
            echo "<td>$description</td>";
            echo "<td><a href='$full_url' target='_blank' class='btn'>测试访问</a></td>";
            echo "</tr>";
        }
        echo "</table>";
        echo "</div>";

        echo "<div class='section'>";
        echo "<h2>🛠️ 修复建议</h2>";
        
        if (!file_exists('wp-config.php')) {
            echo "<div class='warning'>";
            echo "<h3>⚠️ WordPress 未安装</h3>";
            echo "<p>建议操作：</p>";
            echo "<ol>";
            echo "<li>通过 OnePanel 重新安装 WordPress</li>";
            echo "<li>或手动下载 WordPress 文件到当前目录</li>";
            echo "<li>配置数据库连接</li>";
            echo "</ol>";
            echo "</div>";
        } elseif (!file_exists('index.php')) {
            echo "<div class='warning'>";
            echo "<h3>⚠️ WordPress 文件不完整</h3>";
            echo "<p>建议操作：</p>";
            echo "<ol>";
            echo "<li>重新下载 WordPress 完整文件</li>";
            echo "<li>确保所有核心文件都存在</li>";
            echo "</ol>";
            echo "</div>";
        } else {
            echo "<div class='success'>";
            echo "<h3>✅ WordPress 文件完整</h3>";
            echo "<p>如果仍然无法访问，可能是：</p>";
            echo "<ol>";
            echo "<li>Web 服务器配置问题</li>";
            echo "<li>域名解析问题</li>";
            echo "<li>防火墙阻止访问</li>";
            echo "</ol>";
            echo "</div>";
        }
        echo "</div>";
        ?>

        <div class="section">
            <h2>📞 技术支持</h2>
            <p>如果问题仍然存在，请提供以下信息：</p>
            <ul>
                <li>此诊断页面的完整截图</li>
                <li>OnePanel 面板中的应用状态截图</li>
                <li>服务器配置信息</li>
                <li>具体的错误信息</li>
            </ul>
            
            <p><strong>⚠️ 重要提醒：</strong>诊断完成后，请立即删除此文件以确保安全！</p>
            <a href="#" onclick="if(confirm('确定要删除此诊断文件吗？')) { window.location.href='?action=delete'; }" class="btn">删除诊断文件</a>
        </div>
    </div>
</body>
</html>

<?php
// 处理删除请求
if (isset($_GET['action']) && $_GET['action'] === 'delete') {
    if (unlink(__FILE__)) {
        echo "<script>alert('诊断文件已删除'); window.close();</script>";
    } else {
        echo "<script>alert('删除失败，请手动删除');</script>";
    }
}
?>
