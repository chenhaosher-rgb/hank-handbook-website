<?php
/**
 * 微信登录REST API
 * 用于小程序登录和数据同步
 * 
 * @package Hank_Handbook
 */

// 加载微信登录类
require_once('wechat-login.php');

// 注册REST API路由
add_action('rest_api_init', function() {
    
    // 小程序登录
    register_rest_route('hank-wechat/v1', '/miniprogram/login', array(
        'methods' => 'POST',
        'callback' => 'hank_wechat_miniprogram_login',
        'permission_callback' => '__return_true'
    ));
    
    // 验证token
    register_rest_route('hank-wechat/v1', '/validate', array(
        'methods' => 'POST',
        'callback' => 'hank_wechat_validate_token',
        'permission_callback' => '__return_true'
    ));
    
    // 更新用户资料
    register_rest_route('hank-wechat/v1', '/update-profile', array(
        'methods' => 'POST',
        'callback' => 'hank_wechat_update_profile',
        'permission_callback' => 'hank_wechat_check_permission'
    ));
    
    // 获取用户信息
    register_rest_route('hank-wechat/v1', '/user/info', array(
        'methods' => 'GET',
        'callback' => 'hank_wechat_get_user_info',
        'permission_callback' => 'hank_wechat_check_permission'
    ));
    
    // 同步用户数据（网站和小程序）
    register_rest_route('hank-wechat/v1', '/sync', array(
        'methods' => 'POST',
        'callback' => 'hank_wechat_sync_user_data',
        'permission_callback' => 'hank_wechat_check_permission'
    ));
});

/**
 * 小程序登录处理
 */
function hank_wechat_miniprogram_login($request) {
    $wechat = $GLOBALS['hank_wechat_login'];
    
    $code = $request->get_param('code');
    $nickname = $request->get_param('nickname');
    $avatar = $request->get_param('avatar');
    
    if (empty($code)) {
        return new WP_Error('invalid_code', '无效的登录凭证', array('status' => 400));
    }
    
    // 通过code获取session
    $session_data = $wechat->getMiniProgramSession($code);
    
    if (!$session_data || isset($session_data['errcode'])) {
        return new WP_Error(
            'login_failed',
            isset($session_data['errmsg']) ? $session_data['errmsg'] : '登录失败',
            array('status' => 500)
        );
    }
    
    $openid = $session_data['openid'];
    $session_key = $session_data['session_key'];
    $unionid = isset($session_data['unionid']) ? $session_data['unionid'] : null;
    
    // 构建用户信息
    $user_info = array(
        'openid' => $openid,
        'nickname' => $nickname ? $nickname : '微信用户',
        'headimgurl' => $avatar ? $avatar : ''
    );
    
    if ($unionid) {
        $user_info['unionid'] = $unionid;
    }
    
    // 创建或更新用户
    $user_id = $wechat->createOrUpdateUser($user_info, 'miniprogram');
    
    if (!$user_id) {
        return new WP_Error('create_user_failed', '创建用户失败', array('status' => 500));
    }
    
    // 保存session_key
    update_user_meta($user_id, 'wechat_session_key', $session_key);
    
    // 生成token
    $token = $wechat->generateToken($user_id);
    
    // 获取用户完整信息
    $user = get_userdata($user_id);
    $user_meta = array(
        'id' => $user_id,
        'username' => $user->user_login,
        'nickname' => get_user_meta($user_id, 'wechat_nickname', true),
        'avatar' => get_user_meta($user_id, 'wechat_avatar', true),
        'unionid' => get_user_meta($user_id, 'wechat_unionid', true),
        'first_login' => get_user_meta($user_id, 'first_login', true),
        'last_login' => get_user_meta($user_id, 'last_login', true)
    );
    
    return array(
        'success' => true,
        'token' => $token,
        'userInfo' => $user_meta
    );
}

/**
 * 验证token
 */
function hank_wechat_validate_token($request) {
    $wechat = $GLOBALS['hank_wechat_login'];
    
    $token = $request->get_param('token');
    
    if (empty($token)) {
        return array('valid' => false, 'message' => '缺少token');
    }
    
    $payload = $wechat->validateToken($token);
    
    if (!$payload) {
        return array('valid' => false, 'message' => 'Token无效或已过期');
    }
    
    $user_id = $payload['user_id'];
    $user = get_userdata($user_id);
    
    if (!$user) {
        return array('valid' => false, 'message' => '用户不存在');
    }
    
    // 返回用户信息
    $user_info = array(
        'id' => $user_id,
        'username' => $user->user_login,
        'nickname' => get_user_meta($user_id, 'wechat_nickname', true),
        'avatar' => get_user_meta($user_id, 'wechat_avatar', true),
        'unionid' => get_user_meta($user_id, 'wechat_unionid', true)
    );
    
    return array(
        'valid' => true,
        'userInfo' => $user_info
    );
}

/**
 * 更新用户资料
 */
function hank_wechat_update_profile($request) {
    $user_id = hank_wechat_get_current_user_id($request);
    
    if (!$user_id) {
        return new WP_Error('unauthorized', '未授权', array('status' => 401));
    }
    
    $nickname = $request->get_param('nickname');
    $avatar = $request->get_param('avatar');
    
    $updated = false;
    
    if ($nickname) {
        update_user_meta($user_id, 'wechat_nickname', sanitize_text_field($nickname));
        wp_update_user(array(
            'ID' => $user_id,
            'display_name' => sanitize_text_field($nickname)
        ));
        $updated = true;
    }
    
    if ($avatar) {
        update_user_meta($user_id, 'wechat_avatar', esc_url_raw($avatar));
        $updated = true;
    }
    
    if ($updated) {
        return array(
            'success' => true,
            'message' => '更新成功',
            'userInfo' => array(
                'id' => $user_id,
                'nickname' => get_user_meta($user_id, 'wechat_nickname', true),
                'avatar' => get_user_meta($user_id, 'wechat_avatar', true)
            )
        );
    }
    
    return array(
        'success' => false,
        'message' => '没有要更新的内容'
    );
}

/**
 * 获取用户信息
 */
function hank_wechat_get_user_info($request) {
    $user_id = hank_wechat_get_current_user_id($request);
    
    if (!$user_id) {
        return new WP_Error('unauthorized', '未授权', array('status' => 401));
    }
    
    $user = get_userdata($user_id);
    
    return array(
        'success' => true,
        'userInfo' => array(
            'id' => $user_id,
            'username' => $user->user_login,
            'nickname' => get_user_meta($user_id, 'wechat_nickname', true),
            'avatar' => get_user_meta($user_id, 'wechat_avatar', true),
            'email' => $user->user_email,
            'unionid' => get_user_meta($user_id, 'wechat_unionid', true),
            'openid_web' => get_user_meta($user_id, 'wechat_openid_web', true),
            'openid_miniprogram' => get_user_meta($user_id, 'wechat_openid_miniprogram', true),
            'first_login' => get_user_meta($user_id, 'first_login', true),
            'last_login' => get_user_meta($user_id, 'last_login', true)
        )
    );
}

/**
 * 同步用户数据
 */
function hank_wechat_sync_user_data($request) {
    $user_id = hank_wechat_get_current_user_id($request);
    
    if (!$user_id) {
        return new WP_Error('unauthorized', '未授权', array('status' => 401));
    }
    
    // 这里可以添加自定义的数据同步逻辑
    // 例如同步用户的收藏、下载记录等
    
    return array(
        'success' => true,
        'message' => '数据同步成功'
    );
}

/**
 * 检查权限
 */
function hank_wechat_check_permission($request) {
    $user_id = hank_wechat_get_current_user_id($request);
    return $user_id ? true : false;
}

/**
 * 从请求中获取当前用户ID
 */
function hank_wechat_get_current_user_id($request) {
    $wechat = $GLOBALS['hank_wechat_login'];
    
    // 从Authorization header获取token
    $auth_header = $request->get_header('Authorization');
    
    if (!$auth_header) {
        // 尝试从参数中获取
        $token = $request->get_param('token');
    } else {
        // 移除 "Bearer " 前缀
        $token = str_replace('Bearer ', '', $auth_header);
    }
    
    if (empty($token)) {
        return null;
    }
    
    $payload = $wechat->validateToken($token);
    
    if (!$payload) {
        return null;
    }
    
    return $payload['user_id'];
}

/**
 * 添加CORS支持（如果需要）
 */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        return $value;
    });
}, 15);
?>
