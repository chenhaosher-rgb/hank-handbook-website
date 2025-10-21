# 微信登录完整部署指南

## 🎯 功能概述

实现**网页扫码登录**和**小程序登录**，数据通过**UnionID**互通，用户在网站和小程序中可以看到相同的数据。

```
网页端（扫码登录） ←→ UnionID ←→ 小程序端（原生登录）
            ↓                      ↓
        WordPress数据库（统一用户系统）
```

## 📋 部署清单

### 第一步：准备工作

1. **[ ] 注册微信开放平台账号**
   - 访问：https://open.weixin.qq.com/
   - 完成企业认证（300元）
   - 绑定邮箱和手机号

2. **[ ] 创建网站应用**
   - 应用名称：汉克运营知识库
   - 应用简介：运营知识分享平台
   - 应用官网：http://47.108.70.67（或您的域名）
   - 授权回调域：47.108.70.67（或您的域名，不包含http://）
   - 获取：AppID 和 AppSecret

3. **[ ] 创建/关联小程序**
   - 小程序AppID：wxe68fea6a2d9dd365
   - 获取 AppSecret：小程序后台 > 开发 > 开发设置
   - 配置服务器域名：
     - request合法域名：`http://47.108.70.67` 或 `https://yourdomain.com`
     - 注意：正式环境必须使用HTTPS

4. **[ ] 绑定UnionID**
   - 开放平台 > 管理中心
   - 将网站应用和小程序绑定到同一个开放平台账号
   - 这样用户才能在两个平台上获得相同的unionid

### 第二步：配置WordPress

1. **[ ] 上传文件到WordPress**
   ```bash
   # 上传到主题目录
   wp-content/themes/your-theme/
   ├── wechat-login.php              # 微信登录类
   ├── wechat-api.php                # REST API
   ├── wechat-callback.php           # 登录回调（放在网站根目录）
   └── template-parts/
       └── wechat-login-button.php   # 登录按钮组件
   ```

2. **[ ] 配置AppID和Secret**
   
   编辑 `wechat-login.php` 文件：
   ```php
   define('WECHAT_WEB_APPID', 'your_website_appid');  // 网站应用AppID
   define('WECHAT_WEB_SECRET', 'your_website_secret'); // 网站应用AppSecret
   define('WECHAT_MP_APPID', 'wxe68fea6a2d9dd365');   // 小程序AppID
   define('WECHAT_MP_SECRET', 'your_miniprogram_secret'); // 小程序AppSecret
   ```

3. **[ ] 上传回调文件**
   - 将 `wechat-callback.php` 上传到网站根目录
   - 与 `wp-config.php` 同级

4. **[ ] 添加登录按钮**
   
   在 `header.php` 中添加：
   ```php
   <div class="header-right">
       <?php get_template_part('template-parts/wechat-login-button'); ?>
   </div>
   ```

5. **[ ] 测试REST API**
   访问：`http://47.108.70.67/wp-json/hank-wechat/v1`
   应该看到API路由列表

### 第三步：配置小程序

1. **[ ] 更新API地址**
   
   编辑 `miniprogram/app.js`：
   ```javascript
   globalData: {
     apiUrl: 'http://47.108.70.67/wp-json/hank-wechat/v1'
     // 如果有HTTPS域名：
     // apiUrl: 'https://yourdomain.com/wp-json/hank-wechat/v1'
   }
   ```

2. **[ ] 配置服务器域名**
   - 小程序后台 > 开发 > 开发设置 > 服务器域名
   - request合法域名：`http://47.108.70.67`（开发阶段）
   - 正式环境：`https://yourdomain.com`（必须HTTPS）

3. **[ ] 开启调试模式**
   - 微信开发者工具 > 详情 > 本地设置
   - 勾选"不校验合法域名"（仅开发阶段）

### 第四步：测试登录

#### 网站端测试
1. **[ ] 访问网站首页**
   - 点击"微信登录"按钮
   - 看到二维码
   
2. **[ ] 扫码登录**
   - 使用微信扫描二维码
   - 确认登录
   - 跳转回网站首页
   - 显示用户头像和昵称

3. **[ ] 检查用户数据**
   - WordPress后台 > 用户
   - 查看新增用户
   - 检查用户meta：
     - `wechat_unionid`
     - `wechat_openid_web`
     - `wechat_nickname`
     - `wechat_avatar`

#### 小程序端测试
1. **[ ] 打开小程序**
   - 自动执行登录
   - 查看控制台日志

2. **[ ] 授权用户信息**
   - 点击"授权用户信息"按钮
   - 允许获取昵称和头像
   - 信息更新到后端

3. **[ ] 验证数据互通**
   - 网站登录后记录unionid
   - 小程序登录后记录unionid
   - 两个unionid应该相同

### 第五步：数据互通验证

**测试步骤**：
1. 先在网站扫码登录
2. 记录用户的昵称和头像
3. 打开小程序
4. 应该看到相同的用户信息
5. 在小程序修改资料
6. 网站应该同步更新

**数据库验证**：
```sql
-- 查看用户的微信信息
SELECT 
    u.ID,
    u.user_login,
    um1.meta_value as unionid,
    um2.meta_value as web_openid,
    um3.meta_value as mp_openid,
    um4.meta_value as nickname
FROM wp_users u
LEFT JOIN wp_usermeta um1 ON u.ID = um1.user_id AND um1.meta_key = 'wechat_unionid'
LEFT JOIN wp_usermeta um2 ON u.ID = um2.user_id AND um2.meta_key = 'wechat_openid_web'
LEFT JOIN wp_usermeta um3 ON u.ID = um3.user_id AND um3.meta_key = 'wechat_openid_miniprogram'
LEFT JOIN wp_usermeta um4 ON u.ID = um4.user_id AND um4.meta_key = 'wechat_nickname'
WHERE um1.meta_value IS NOT NULL;
```

## 🔐 安全配置

### 1. HTTPS配置（生产环境必须）

```nginx
# Nginx配置示例
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        # WordPress配置
    }
}

# HTTP重定向到HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

### 2. 防止CSRF攻击

state参数验证已内置在 `wechat-callback.php` 中

### 3. Token安全

- Token有效期：7天
- 使用HMAC-SHA256签名
- 建议定期刷新token

### 4. 数据加密

敏感信息（如session_key）建议加密存储：
```php
// 加密
update_user_meta($user_id, 'wechat_session_key', openssl_encrypt($session_key, 'AES-256-CBC', AUTH_KEY));

// 解密
$session_key = openssl_decrypt(get_user_meta($user_id, 'wechat_session_key', true), 'AES-256-CBC', AUTH_KEY);
```

## 🐛 常见问题

### 1. 扫码后显示"redirect_uri参数错误"
**原因**：回调域名配置不正确
**解决**：
- 开放平台检查授权回调域
- 不要包含 `http://` 或 `https://`
- 不要包含端口号和路径
- 示例：`yourdomain.com`

### 2. 小程序登录失败
**原因**：API地址不在合法域名列表
**解决**：
- 小程序后台配置服务器域名
- 开发阶段：开发者工具勾选"不校验合法域名"

### 3. 数据不互通
**原因**：没有获取到unionid
**解决**：
- 确认网站应用和小程序在同一个开放平台账号下
- 确认已完成UnionID绑定
- 检查用户meta中是否有 `wechat_unionid`

### 4. Token验证失败
**原因**：token过期或签名错误
**解决**：
- 检查服务器时间是否正确
- 确认 AUTH_KEY 配置正确
- 清除小程序缓存重新登录

### 5. 获取不到unionid
**原因**：
- 新注册的微信号可能暂时获取不到unionid
- 应用未绑定到开放平台

**解决**：
- 确保应用已绑定
- 如果确实获取不到unionid，使用openid作为fallback

## 📊 监控和日志

### 启用调试日志

```php
// 在 functions.php 中添加
if (defined('HANK_WECHAT_DEBUG') && HANK_WECHAT_DEBUG) {
    add_action('hank_wechat_login_success', function($user_id, $user_info) {
        error_log('WeChat Login Success: User ID ' . $user_id);
        error_log('User Info: ' . print_r($user_info, true));
    }, 10, 2);
}
```

### 查看登录统计

```sql
-- 统计登录用户数
SELECT COUNT(DISTINCT user_id) as total_users
FROM wp_usermeta
WHERE meta_key = 'wechat_unionid';

-- 最近登录用户
SELECT 
    u.user_login,
    um1.meta_value as nickname,
    um2.meta_value as last_login
FROM wp_users u
INNER JOIN wp_usermeta um1 ON u.ID = um1.user_id AND um1.meta_key = 'wechat_nickname'
INNER JOIN wp_usermeta um2 ON u.ID = um2.user_id AND um2.meta_key = 'last_login'
ORDER BY um2.meta_value DESC
LIMIT 10;
```

## 🚀 性能优化

1. **Redis缓存token验证结果**
2. **CDN加速静态资源**
3. **数据库索引优化**
4. **API响应缓存**

## 📱 小程序审核注意事项

1. **隐私政策**：
   - 必须有隐私政策页面
   - 说明收集用户信息的目的和用途

2. **用户协议**：
   - 登录页面显示用户协议链接
   - 说明数据如何使用

3. **敏感权限**：
   - `wx.getUserProfile` 需要明确告知用户用途

4. **服务器域名**：
   - 正式环境必须配置HTTPS域名

## 💡 下一步扩展

1. **手机号绑定**：使用 `wx.getPhoneNumber`
2. **第三方登录**：支持QQ、微博等
3. **会员系统**：VIP权限管理
4. **积分系统**：用户积分和等级
5. **消息推送**：小程序订阅消息

## 📞 技术支持

如遇问题，请检查：
1. 开发者工具控制台日志
2. WordPress调试日志
3. 微信开放平台错误码文档

---

**重要提示**：
- 🔴 生产环境必须使用HTTPS
- 🔴 保护好AppSecret，不要泄露
- 🔴 定期检查和更新安全配置
- 🔴 遵守微信平台使用规范
