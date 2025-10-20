<?php
/**
 * 微信登录回调处理
 * 
 * @package Hank_Handbook
 */

// 加载WordPress环境
require_once('wp-load.php');
require_once('wechat-login.php');

session_start();

// 获取微信登录实例
$wechat = $GLOBALS['hank_wechat_login'];

// 验证state参数
if (!isset($_GET['state']) || !isset($_SESSION['wechat_state']) || $_GET['state'] !== $_SESSION['wechat_state']) {
    wp_die('Invalid state parameter. 安全验证失败，请重新登录。');
}

// 清除state
unset($_SESSION['wechat_state']);

// 获取code
$code = isset($_GET['code']) ? sanitize_text_field($_GET['code']) : '';

if (empty($code)) {
    wp_redirect(home_url('?wechat_login=failed&error=no_code'));
    exit;
}

// 获取access_token
$token_info = $wechat->getWebAccessToken($code);

if (!$token_info || isset($token_info['errcode'])) {
    // 获取token失败
    $error_msg = isset($token_info['errmsg']) ? $token_info['errmsg'] : 'unknown_error';
    wp_redirect(home_url('?wechat_login=failed&error=' . urlencode($error_msg)));
    exit;
}

$access_token = $token_info['access_token'];
$openid = $token_info['openid'];
$refresh_token = $token_info['refresh_token'];

// 获取用户信息
$user_info = $wechat->getWebUserInfo($access_token, $openid);

if (!$user_info || isset($user_info['errcode'])) {
    // 获取用户信息失败
    $error_msg = isset($user_info['errmsg']) ? $user_info['errmsg'] : 'get_userinfo_failed';
    wp_redirect(home_url('?wechat_login=failed&error=' . urlencode($error_msg)));
    exit;
}

// 创建或更新用户
$user_id = $wechat->createOrUpdateUser($user_info, 'web');

if (!$user_id) {
    wp_redirect(home_url('?wechat_login=failed&error=create_user_failed'));
    exit;
}

// 登录用户
$wechat->loginUser($user_id, true);

// 保存refresh_token（可选）
update_user_meta($user_id, 'wechat_refresh_token', $refresh_token);

// 记录登录日志
do_action('hank_wechat_login_success', $user_id, $user_info);

// 跳转到首页或指定页面
$redirect_to = isset($_GET['redirect_to']) ? $_GET['redirect_to'] : home_url();
wp_redirect($redirect_to);
exit;
?>
