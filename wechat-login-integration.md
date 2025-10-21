# 微信登录集成方案

## 📋 整体架构

```
┌─────────────────┐         ┌─────────────────┐
│   WordPress网站  │         │   微信小程序      │
│   (扫码登录)     │         │   (原生登录)     │
└────────┬────────┘         └────────┬────────┘
         │                           │
         │    微信开放平台 API       │
         │                           │
         └───────────┬───────────────┘
                     │
              ┌──────▼──────┐
              │  统一用户库  │
              │  WordPress   │
              │   数据库     │
              └─────────────┘
```

## 🔧 准备工作

### 1. 微信开放平台配置

**注册账号**：
- 网站：https://open.weixin.qq.com/
- 注册微信开放平台账号
- 完成开发者资质认证（300元）

**创建应用**：
1. **网站应用**：用于WordPress扫码登录
   - 获取 AppID 和 AppSecret
   - 配置授权回调域名：`47.108.70.67` 或您的域名

2. **小程序应用**：
   - 获取小程序 AppID 和 AppSecret
   - 配置服务器域名（用于API调用）

### 2. 开通UnionID机制

**重要**：要实现数据互通，必须：
- 同一主体下的网站应用和小程序
- 绑定到同一个微信开放平台账号
- 这样才能获得唯一的 `unionid`

## 💻 WordPress网站实现

### 方案1：使用插件（推荐初学者）

#### 安装插件
```bash
# 推荐插件
1. WP Weixin (微信全能插件)
2. Wechat Social login
```

#### 配置步骤
1. WordPress后台 > 插件 > 安装插件
2. 搜索 "wechat" 或 "weixin"
3. 安装并激活
4. 配置 AppID 和 AppSecret
5. 设置回调URL

### 方案2：自定义开发（推荐）

#### 1. 创建微信登录PHP文件

```php
<?php
/**
 * 微信扫码登录功能
 * 文件: wechat-login.php
 */

// 微信开放平台配置
define('WECHAT_APPID', 'your_website_appid');
define('WECHAT_SECRET', 'your_website_secret');
define('WECHAT_REDIRECT_URI', 'http://47.108.70.67/wechat-callback.php');

class WeChatLogin {
    
    // 生成登录二维码
    public function getLoginQRCode() {
        $state = md5(uniqid(rand(), TRUE));
        $_SESSION['wechat_state'] = $state;
        
        $url = "https://open.weixin.qq.com/connect/qrconnect?"
            . "appid=" . WECHAT_APPID
            . "&redirect_uri=" . urlencode(WECHAT_REDIRECT_URI)
            . "&response_type=code"
            . "&scope=snsapi_login"
            . "&state=" . $state
            . "#wechat_redirect";
        
        return $url;
    }
    
    // 获取access_token
    public function getAccessToken($code) {
        $url = "https://api.weixin.qq.com/sns/oauth2/access_token?"
            . "appid=" . WECHAT_APPID
            . "&secret=" . WECHAT_SECRET
            . "&code=" . $code
            . "&grant_type=authorization_code";
        
        $response = file_get_contents($url);
        return json_decode($response, true);
    }
    
    // 获取用户信息
    public function getUserInfo($access_token, $openid) {
        $url = "https://api.weixin.qq.com/sns/userinfo?"
            . "access_token=" . $access_token
            . "&openid=" . $openid;
        
        $response = file_get_contents($url);
        return json_decode($response, true);
    }
    
    // 创建或更新WordPress用户
    public function createOrUpdateUser($userInfo) {
        global $wpdb;
        
        $unionid = $userInfo['unionid'];
        $openid = $userInfo['openid'];
        $nickname = $userInfo['nickname'];
        $avatar = $userInfo['headimgurl'];
        
        // 查找用户（通过unionid）
        $user = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM {$wpdb->users} u
            INNER JOIN {$wpdb->usermeta} um ON u.ID = um.user_id
            WHERE um.meta_key = 'wechat_unionid'
            AND um.meta_value = %s",
            $unionid
        ));
        
        if ($user) {
            // 用户已存在，更新信息
            $user_id = $user->ID;
            update_user_meta($user_id, 'wechat_avatar', $avatar);
            update_user_meta($user_id, 'last_login', current_time('mysql'));
        } else {
            // 创建新用户
            $username = 'wx_' . substr($unionid, 0, 16);
            $user_id = wp_create_user($username, wp_generate_password());
            
            // 保存微信信息
            update_user_meta($user_id, 'wechat_unionid', $unionid);
            update_user_meta($user_id, 'wechat_openid_web', $openid);
            update_user_meta($user_id, 'wechat_nickname', $nickname);
            update_user_meta($user_id, 'wechat_avatar', $avatar);
            update_user_meta($user_id, 'first_login', current_time('mysql'));
            
            // 设置显示名称
            wp_update_user(array(
                'ID' => $user_id,
                'display_name' => $nickname
            ));
        }
        
        // 登录用户
        wp_set_auth_cookie($user_id, true);
        
        return $user_id;
    }
}
?>
```

#### 2. 创建回调处理文件

```php
<?php
/**
 * 微信登录回调处理
 * 文件: wechat-callback.php
 */

require_once('wp-load.php');
require_once('wechat-login.php');

session_start();

// 验证state
if (!isset($_GET['state']) || $_GET['state'] !== $_SESSION['wechat_state']) {
    die('Invalid state parameter');
}

$code = $_GET['code'];
$wechat = new WeChatLogin();

// 获取access_token
$token_info = $wechat->getAccessToken($code);

if (isset($token_info['access_token'])) {
    $access_token = $token_info['access_token'];
    $openid = $token_info['openid'];
    
    // 获取用户信息
    $user_info = $wechat->getUserInfo($access_token, $openid);
    
    if (isset($user_info['unionid'])) {
        // 创建或登录用户
        $user_id = $wechat->createOrUpdateUser($user_info);
        
        // 跳转到首页
        wp_redirect(home_url());
        exit;
    }
}

// 登录失败
wp_redirect(home_url('?login=failed'));
exit;
?>
```

#### 3. 在页面中显示登录按钮

```php
<?php
// 在 header.php 或登录页面中添加
if (!is_user_logged_in()) {
    require_once('wechat-login.php');
    $wechat = new WeChatLogin();
    $login_url = $wechat->getLoginQRCode();
    ?>
    <div class="wechat-login">
        <a href="<?php echo $login_url; ?>" class="wechat-login-btn">
            <img src="<?php echo get_template_directory_uri(); ?>/images/wechat-icon.png" alt="微信登录">
            <span>微信扫码登录</span>
        </a>
    </div>
    <?php
}
?>
```

## 📱 小程序实现

### 1. 小程序登录流程

```javascript
// app.js
App({
  globalData: {
    userInfo: null,
    token: null,
    apiUrl: 'https://47.108.70.67/wp-json/wechat/v1'
  },
  
  onLaunch: function() {
    this.checkLogin();
  },
  
  // 检查登录状态
  checkLogin: function() {
    const token = wx.getStorageSync('token');
    if (token) {
      this.validateToken(token);
    } else {
      this.wxLogin();
    }
  },
  
  // 微信登录
  wxLogin: function() {
    wx.login({
      success: res => {
        if (res.code) {
          // 发送code到后端
          this.getOpenId(res.code);
        }
      }
    });
  },
  
  // 获取OpenID和UnionID
  getOpenId: function(code) {
    wx.request({
      url: this.globalData.apiUrl + '/login',
      method: 'POST',
      data: {
        code: code,
        type: 'miniprogram'
      },
      success: res => {
        if (res.data.success) {
          // 保存token
          wx.setStorageSync('token', res.data.token);
          this.globalData.token = res.data.token;
          this.globalData.userInfo = res.data.userInfo;
          
          // 触发登录成功事件
          this.triggerEvent('loginSuccess', res.data.userInfo);
        }
      }
    });
  },
  
  // 验证token
  validateToken: function(token) {
    wx.request({
      url: this.globalData.apiUrl + '/validate',
      method: 'POST',
      data: { token: token },
      success: res => {
        if (res.data.valid) {
          this.globalData.token = token;
          this.globalData.userInfo = res.data.userInfo;
        } else {
          this.wxLogin();
        }
      }
    });
  }
});
```

### 2. 小程序登录页面

```javascript
// pages/login/login.js
Page({
  data: {
    userInfo: null,
    hasUserInfo: false
  },
  
  onLoad: function() {
    const app = getApp();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    }
  },
  
  // 获取用户信息
  getUserProfile: function(e) {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        this.updateUserInfo(res.userInfo);
      }
    });
  },
  
  // 更新用户信息
  updateUserInfo: function(userInfo) {
    const app = getApp();
    wx.request({
      url: app.globalData.apiUrl + '/update-profile',
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + app.globalData.token
      },
      data: {
        nickname: userInfo.nickName,
        avatar: userInfo.avatarUrl
      },
      success: res => {
        if (res.data.success) {
          this.setData({
            userInfo: userInfo,
            hasUserInfo: true
          });
          
          // 跳转到首页
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    });
  }
});
```

```xml
<!-- pages/login/login.wxml -->
<view class="login-container">
  <view class="login-header">
    <image class="logo" src="/images/logo.png"></image>
    <text class="title">汉克运营知识库</text>
    <text class="subtitle">建立自己的运营系统，搞到第一桶金</text>
  </view>
  
  <view class="login-content">
    <button 
      class="login-btn" 
      bindtap="getUserProfile"
      wx:if="{{!hasUserInfo}}"
    >
      <image class="wechat-icon" src="/images/wechat-icon.png"></image>
      <text>微信登录</text>
    </button>
    
    <view class="user-info" wx:if="{{hasUserInfo}}">
      <image class="avatar" src="{{userInfo.avatarUrl}}"></image>
      <text class="nickname">{{userInfo.nickName}}</text>
      <text class="tips">登录成功！</text>
    </view>
  </view>
  
  <view class="login-tips">
    <text>登录即表示同意</text>
    <text class="link">《用户协议》</text>
    <text>和</text>
    <text class="link">《隐私政策》</text>
  </view>
</view>
```

## 🔗 WordPress REST API实现

### 创建自定义API端点

```php
<?php
/**
 * 微信登录API
 * 文件: wechat-api.php
 */

// 小程序配置
define('MP_APPID', 'your_miniprogram_appid');
define('MP_SECRET', 'your_miniprogram_secret');

// 注册REST API路由
add_action('rest_api_init', function() {
    // 小程序登录
    register_rest_route('wechat/v1', '/login', array(
        'methods' => 'POST',
        'callback' => 'wechat_miniprogram_login',
        'permission_callback' => '__return_true'
    ));
    
    // 验证token
    register_rest_route('wechat/v1', '/validate', array(
        'methods' => 'POST',
        'callback' => 'wechat_validate_token',
        'permission_callback' => '__return_true'
    ));
    
    // 更新用户资料
    register_rest_route('wechat/v1', '/update-profile', array(
        'methods' => 'POST',
        'callback' => 'wechat_update_profile',
        'permission_callback' => 'wechat_check_auth'
    ));
});

// 小程序登录处理
function wechat_miniprogram_login($request) {
    $code = $request->get_param('code');
    
    // 通过code获取session_key和openid
    $url = "https://api.weixin.qq.com/sns/jscode2session?"
        . "appid=" . MP_APPID
        . "&secret=" . MP_SECRET
        . "&js_code=" . $code
        . "&grant_type=authorization_code";
    
    $response = wp_remote_get($url);
    $body = json_decode(wp_remote_retrieve_body($response), true);
    
    if (isset($body['openid'])) {
        $openid = $body['openid'];
        $session_key = $body['session_key'];
        $unionid = $body['unionid'] ?? null;
        
        // 查找或创建用户（通过unionid）
        if ($unionid) {
            $user_id = wechat_find_or_create_user($unionid, $openid, 'miniprogram');
        } else {
            // 如果没有unionid，使用openid
            $user_id = wechat_find_or_create_user_by_openid($openid, 'miniprogram');
        }
        
        // 生成JWT token
        $token = wechat_generate_token($user_id);
        
        // 保存session_key
        update_user_meta($user_id, 'wechat_session_key', $session_key);
        
        // 获取用户信息
        $user = get_userdata($user_id);
        $user_info = array(
            'id' => $user_id,
            'nickname' => get_user_meta($user_id, 'wechat_nickname', true),
            'avatar' => get_user_meta($user_id, 'wechat_avatar', true)
        );
        
        return array(
            'success' => true,
            'token' => $token,
            'userInfo' => $user_info
        );
    }
    
    return array(
        'success' => false,
        'message' => '登录失败'
    );
}

// 查找或创建用户
function wechat_find_or_create_user($unionid, $openid, $type) {
    global $wpdb;
    
    // 通过unionid查找用户
    $user = $wpdb->get_row($wpdb->prepare(
        "SELECT * FROM {$wpdb->users} u
        INNER JOIN {$wpdb->usermeta} um ON u.ID = um.user_id
        WHERE um.meta_key = 'wechat_unionid'
        AND um.meta_value = %s",
        $unionid
    ));
    
    if ($user) {
        $user_id = $user->ID;
        // 更新openid
        update_user_meta($user_id, 'wechat_openid_' . $type, $openid);
    } else {
        // 创建新用户
        $username = 'wx_' . substr($unionid, 0, 16);
        $user_id = wp_create_user($username, wp_generate_password());
        
        update_user_meta($user_id, 'wechat_unionid', $unionid);
        update_user_meta($user_id, 'wechat_openid_' . $type, $openid);
    }
    
    return $user_id;
}

// 生成JWT token
function wechat_generate_token($user_id) {
    $secret_key = 'your_secret_key_here';
    $issued_at = time();
    $expire = $issued_at + (7 * 24 * 60 * 60); // 7天有效期
    
    $payload = array(
        'user_id' => $user_id,
        'iat' => $issued_at,
        'exp' => $expire
    );
    
    // 简单的token生成（实际应用中建议使用JWT库）
    $token = base64_encode(json_encode($payload)) . '.' . hash_hmac('sha256', json_encode($payload), $secret_key);
    
    return $token;
}

// 验证token
function wechat_validate_token($request) {
    $token = $request->get_param('token');
    
    // 解析token
    $parts = explode('.', $token);
    if (count($parts) !== 2) {
        return array('valid' => false);
    }
    
    $payload = json_decode(base64_decode($parts[0]), true);
    
    // 检查过期时间
    if ($payload['exp'] < time()) {
        return array('valid' => false);
    }
    
    $user_id = $payload['user_id'];
    $user = get_userdata($user_id);
    
    if ($user) {
        return array(
            'valid' => true,
            'userInfo' => array(
                'id' => $user_id,
                'nickname' => get_user_meta($user_id, 'wechat_nickname', true),
                'avatar' => get_user_meta($user_id, 'wechat_avatar', true)
            )
        );
    }
    
    return array('valid' => false);
}

// 更新用户资料
function wechat_update_profile($request) {
    $user_id = wechat_get_current_user_id($request);
    
    if (!$user_id) {
        return new WP_Error('unauthorized', '未授权', array('status' => 401));
    }
    
    $nickname = $request->get_param('nickname');
    $avatar = $request->get_param('avatar');
    
    if ($nickname) {
        update_user_meta($user_id, 'wechat_nickname', $nickname);
        wp_update_user(array(
            'ID' => $user_id,
            'display_name' => $nickname
        ));
    }
    
    if ($avatar) {
        update_user_meta($user_id, 'wechat_avatar', $avatar);
    }
    
    return array(
        'success' => true,
        'message' => '更新成功'
    );
}

// 检查授权
function wechat_check_auth($request) {
    $token = $request->get_header('Authorization');
    if (!$token) {
        return false;
    }
    
    $token = str_replace('Bearer ', '', $token);
    $result = wechat_validate_token(new WP_REST_Request('POST', '', array('token' => $token)));
    
    return $result['valid'] ?? false;
}

// 获取当前用户ID
function wechat_get_current_user_id($request) {
    $token = $request->get_header('Authorization');
    if (!$token) {
        return null;
    }
    
    $token = str_replace('Bearer ', '', $token);
    $parts = explode('.', $token);
    
    if (count($parts) !== 2) {
        return null;
    }
    
    $payload = json_decode(base64_decode($parts[0]), true);
    return $payload['user_id'] ?? null;
}
?>
```

## 📊 数据库结构

### 用户关联表

```sql
-- 用户meta表结构
-- wp_usermeta

user_id | meta_key                | meta_value
--------|------------------------|------------------
1       | wechat_unionid         | oxxxxxxxxxxxxxx
1       | wechat_openid_web      | oxxxxxxxxxxxxxx
1       | wechat_openid_miniprogram | oxxxxxxxxxxxxxx
1       | wechat_nickname        | 汉克
1       | wechat_avatar          | https://...
1       | first_login            | 2024-01-15 10:30:00
1       | last_login             | 2024-01-20 15:45:00
```

## 🔐 安全考虑

### 1. Token安全
- 使用JWT标准
- 设置合理的过期时间
- 服务端验证签名

### 2. HTTPS
- 必须使用HTTPS
- 配置SSL证书

### 3. 数据加密
- 敏感信息加密存储
- 传输过程使用HTTPS

### 4. 防刷机制
- 登录频率限制
- IP黑名单

## 📝 部署清单

### WordPress端
- [ ] 上传 wechat-login.php
- [ ] 上传 wechat-callback.php
- [ ] 上传 wechat-api.php
- [ ] 配置 AppID 和 AppSecret
- [ ] 配置回调域名
- [ ] 测试网页扫码登录

### 小程序端
- [ ] 配置小程序 AppID
- [ ] 更新 API地址
- [ ] 实现登录页面
- [ ] 测试登录流程
- [ ] 测试数据同步

### 微信开放平台
- [ ] 创建网站应用
- [ ] 创建小程序应用
- [ ] 绑定UnionID
- [ ] 配置回调域名
- [ ] 配置服务器域名

## 🧪 测试流程

1. **网站扫码登录测试**
   - 访问登录页面
   - 扫描二维码
   - 确认登录
   - 验证用户信息

2. **小程序登录测试**
   - 打开小程序
   - 点击登录
   - 授权用户信息
   - 验证登录成功

3. **数据互通测试**
   - 网站登录后查看用户信息
   - 小程序登录后查看相同用户信息
   - 验证 unionid 一致
   - 测试数据同步

## 💡 注意事项

1. **UnionID必须配置**：只有配置UnionID才能实现数据互通
2. **域名必须备案**：网站应用需要备案的域名
3. **HTTPS必须开启**：小程序要求API必须是HTTPS
4. **测试账号**：开发期间可以添加测试账号
5. **审核时间**：小程序审核可能需要1-7天

需要我帮您创建具体的代码文件吗？
