<?php
/**
 * WordPress 管理员密码重置工具
 * 使用方法：将此文件上传到 WordPress 根目录，访问后删除
 */

// 引入 WordPress
require_once('wp-config.php');
require_once('wp-load.php');

// 检查是否为管理员请求
if (!isset($_GET['action']) || $_GET['action'] !== 'reset_admin') {
    die('访问被拒绝');
}

// 重置管理员密码
function reset_admin_password() {
    $username = 'admin';
    $new_password = 'admin123456';
    
    $user = get_user_by('login', $username);
    
    if (!$user) {
        // 如果 admin 用户不存在，创建一个
        $user_id = wp_create_user($username, $new_password, 'admin@example.com');
        if (is_wp_error($user_id)) {
            echo "创建用户失败：" . $user_id->get_error_message();
            return;
        }
        $user = get_user_by('id', $user_id);
        $user->set_role('administrator');
        echo "管理员用户已创建！<br>";
    } else {
        // 重置现有用户密码
        wp_set_password($new_password, $user->ID);
        echo "管理员密码已重置！<br>";
    }
    
    echo "<strong>登录信息：</strong><br>";
    echo "用户名：" . $username . "<br>";
    echo "密码：" . $new_password . "<br>";
    echo "登录地址：<a href='/wp-admin' target='_blank'>/wp-admin</a><br><br>";
    
    echo "<strong style='color: red;'>⚠️ 安全提醒：</strong><br>";
    echo "1. 请立即登录 WordPress 后台<br>";
    echo "2. 修改用户名和密码<br>";
    echo "3. 删除此文件<br>";
}

// 执行重置
reset_admin_password();
?>

<!DOCTYPE html>
<html>
<head>
    <title>WordPress 管理员密码重置</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 50px; background: #f1f1f1; }
        .container { background: white; padding: 30px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0; }
        a { color: #0073aa; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 WordPress 管理员密码重置工具</h1>
        
        <div class="warning">
            <strong>⚠️ 安全警告</strong><br>
            此工具仅用于紧急情况，使用后请立即删除！
        </div>
        
        <div class="success">
            <strong>✅ 重置完成</strong><br>
            请使用上述信息登录 WordPress 后台，然后立即修改密码并删除此文件。
        </div>
        
        <p><strong>下一步操作：</strong></p>
        <ol>
            <li>点击上方的登录链接进入 WordPress 后台</li>
            <li>在 用户 > 个人资料 中修改密码</li>
            <li>在 用户 > 所有用户 中修改用户名（可选）</li>
            <li>删除此文件（wp-admin-reset.php）</li>
        </ol>
    </div>
</body>
</html>
