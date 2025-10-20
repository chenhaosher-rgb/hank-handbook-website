<?php
/**
 * 微信扫码登录功能
 * 
 * @package Hank_Handbook
 */

// 微信开放平台配置（请替换为您的真实配置）
define('WECHAT_WEB_APPID', 'your_website_appid_here');
define('WECHAT_WEB_SECRET', 'your_website_secret_here');
define('WECHAT_REDIRECT_URI', 'http://47.108.70.67/wechat-callback.php');

// 小程序配置
define('WECHAT_MP_APPID', 'wxe68fea6a2d9dd365'); // 您的小程序AppID
define('WECHAT_MP_SECRET', 'your_miniprogram_secret_here');

class HankWeChatLogin {
    
    /**
     * 生成网站扫码登录URL
     */
    public function getWebLoginURL() {
        session_start();
        $state = md5(uniqid(rand(), TRUE));
        $_SESSION['wechat_state'] = $state;
        
        $params = array(
            'appid' => WECHAT_WEB_APPID,
            'redirect_uri' => urlencode(WECHAT_REDIRECT_URI),
            'response_type' => 'code',
            'scope' => 'snsapi_login',
            'state' => $state
        );
        
        $url = "https://open.weixin.qq.com/connect/qrconnect?" . http_build_query($params) . "#wechat_redirect";
        
        return $url;
    }
    
    /**
     * 网站登录：通过code获取access_token
     */
    public function getWebAccessToken($code) {
        $url = "https://api.weixin.qq.com/sns/oauth2/access_token?"
            . "appid=" . WECHAT_WEB_APPID
            . "&secret=" . WECHAT_WEB_SECRET
            . "&code=" . $code
            . "&grant_type=authorization_code";
        
        $response = wp_remote_get($url);
        
        if (is_wp_error($response)) {
            return false;
        }
        
        $body = wp_remote_retrieve_body($response);
        return json_decode($body, true);
    }
    
    /**
     * 获取微信用户信息
     */
    public function getWebUserInfo($access_token, $openid) {
        $url = "https://api.weixin.qq.com/sns/userinfo?"
            . "access_token=" . $access_token
            . "&openid=" . $openid
            . "&lang=zh_CN";
        
        $response = wp_remote_get($url);
        
        if (is_wp_error($response)) {
            return false;
        }
        
        $body = wp_remote_retrieve_body($response);
        return json_decode($body, true);
    }
    
    /**
     * 小程序登录：通过code获取session和openid
     */
    public function getMiniProgramSession($code) {
        $url = "https://api.weixin.qq.com/sns/jscode2session?"
            . "appid=" . WECHAT_MP_APPID
            . "&secret=" . WECHAT_MP_SECRET
            . "&js_code=" . $code
            . "&grant_type=authorization_code";
        
        $response = wp_remote_get($url);
        
        if (is_wp_error($response)) {
            return false;
        }
        
        $body = wp_remote_retrieve_body($response);
        return json_decode($body, true);
    }
    
    /**
     * 通过UnionID查找用户
     */
    public function findUserByUnionID($unionid) {
        global $wpdb;
        
        $user_id = $wpdb->get_var($wpdb->prepare(
            "SELECT user_id FROM {$wpdb->usermeta} 
            WHERE meta_key = 'wechat_unionid' 
            AND meta_value = %s",
            $unionid
        ));
        
        return $user_id ? get_user_by('id', $user_id) : false;
    }
    
    /**
     * 通过OpenID查找用户
     */
    public function findUserByOpenID($openid, $type = 'web') {
        global $wpdb;
        
        $meta_key = 'wechat_openid_' . $type;
        
        $user_id = $wpdb->get_var($wpdb->prepare(
            "SELECT user_id FROM {$wpdb->usermeta} 
            WHERE meta_key = %s 
            AND meta_value = %s",
            $meta_key,
            $openid
        ));
        
        return $user_id ? get_user_by('id', $user_id) : false;
    }
    
    /**
     * 创建或更新用户
     */
    public function createOrUpdateUser($userInfo, $type = 'web') {
        $unionid = isset($userInfo['unionid']) ? $userInfo['unionid'] : null;
        $openid = $userInfo['openid'];
        $nickname = isset($userInfo['nickname']) ? $userInfo['nickname'] : '微信用户';
        $avatar = isset($userInfo['headimgurl']) ? $userInfo['headimgurl'] : '';
        
        // 优先通过unionid查找用户
        if ($unionid) {
            $user = $this->findUserByUnionID($unionid);
        } else {
            $user = $this->findUserByOpenID($openid, $type);
        }
        
        if ($user) {
            // 用户已存在，更新信息
            $user_id = $user->ID;
            
            // 更新OpenID
            update_user_meta($user_id, 'wechat_openid_' . $type, $openid);
            
            // 更新头像和昵称
            if ($nickname) {
                update_user_meta($user_id, 'wechat_nickname', $nickname);
            }
            if ($avatar) {
                update_user_meta($user_id, 'wechat_avatar', $avatar);
            }
            
            // 更新最后登录时间
            update_user_meta($user_id, 'last_login', current_time('mysql'));
            
        } else {
            // 创建新用户
            $username = 'wx_' . substr(md5($openid), 0, 16);
            $password = wp_generate_password(12, false);
            
            $user_id = wp_create_user($username, $password);
            
            if (is_wp_error($user_id)) {
                return false;
            }
            
            // 保存微信信息
            if ($unionid) {
                update_user_meta($user_id, 'wechat_unionid', $unionid);
            }
            update_user_meta($user_id, 'wechat_openid_' . $type, $openid);
            update_user_meta($user_id, 'wechat_nickname', $nickname);
            update_user_meta($user_id, 'wechat_avatar', $avatar);
            update_user_meta($user_id, 'first_login', current_time('mysql'));
            update_user_meta($user_id, 'last_login', current_time('mysql'));
            
            // 设置显示名称
            wp_update_user(array(
                'ID' => $user_id,
                'display_name' => $nickname,
                'user_email' => $username . '@wechat.local' // 临时邮箱
            ));
        }
        
        return $user_id;
    }
    
    /**
     * 登录用户
     */
    public function loginUser($user_id, $remember = true) {
        wp_clear_auth_cookie();
        wp_set_current_user($user_id);
        wp_set_auth_cookie($user_id, $remember);
        
        do_action('wp_login', get_userdata($user_id)->user_login, get_userdata($user_id));
        
        return true;
    }
    
    /**
     * 生成JWT Token (简化版)
     */
    public function generateToken($user_id) {
        $secret_key = defined('AUTH_KEY') ? AUTH_KEY : 'your_secret_key_here';
        $issued_at = time();
        $expire = $issued_at + (7 * 24 * 60 * 60); // 7天有效期
        
        $payload = array(
            'user_id' => $user_id,
            'iat' => $issued_at,
            'exp' => $expire
        );
        
        $base64_payload = base64_encode(json_encode($payload));
        $signature = hash_hmac('sha256', $base64_payload, $secret_key);
        
        return $base64_payload . '.' . $signature;
    }
    
    /**
     * 验证Token
     */
    public function validateToken($token) {
        if (empty($token)) {
            return false;
        }
        
        $parts = explode('.', $token);
        if (count($parts) !== 2) {
            return false;
        }
        
        $base64_payload = $parts[0];
        $signature = $parts[1];
        
        // 验证签名
        $secret_key = defined('AUTH_KEY') ? AUTH_KEY : 'your_secret_key_here';
        $expected_signature = hash_hmac('sha256', $base64_payload, $secret_key);
        
        if (!hash_equals($expected_signature, $signature)) {
            return false;
        }
        
        // 解析payload
        $payload = json_decode(base64_decode($base64_payload), true);
        
        // 检查过期时间
        if ($payload['exp'] < time()) {
            return false;
        }
        
        return $payload;
    }
}

// 创建全局实例
$GLOBALS['hank_wechat_login'] = new HankWeChatLogin();
?>
