<?php
/**
 * 微信登录配置模板
 * 
 * 复制此文件为 wechat-config.php 并填入您的真实配置
 * 
 * @package Hank_Handbook
 */

// ==================== 微信开放平台配置 ====================

// 网站应用配置（用于扫码登录）
define('WECHAT_WEB_APPID', 'your_website_appid_here');
define('WECHAT_WEB_SECRET', 'your_website_secret_here');

// 小程序配置
define('WECHAT_MP_APPID', 'wxe68fea6a2d9dd365'); // 您的小程序AppID
define('WECHAT_MP_SECRET', 'your_miniprogram_secret_here');

// 回调地址配置
define('WECHAT_REDIRECT_URI', 'http://47.108.70.67/wechat-callback.php');
// 如果有域名，使用域名：
// define('WECHAT_REDIRECT_URI', 'https://yourdomain.com/wechat-callback.php');

// ==================== 获取配置步骤 ====================

/**
 * 1. 注册微信开放平台账号
 *    地址：https://open.weixin.qq.com/
 *    
 * 2. 创建网站应用
 *    - 应用名称：汉克运营知识库
 *    - 应用简介：运营知识分享平台
 *    - 应用官网：http://47.108.70.67
 *    - 授权回调域：47.108.70.67 或您的域名
 *    
 * 3. 创建小程序
 *    - 或关联已有小程序
 *    - 小程序AppID：wxe68fea6a2d9dd365
 *    
 * 4. 获取AppID和AppSecret
 *    - 网站应用：开发信息 > AppID、AppSecret
 *    - 小程序：设置 > 开发设置 > AppID、AppSecret
 *    
 * 5. 开通UnionID机制
 *    - 同一主体下的应用
 *    - 绑定到同一个开放平台账号
 *    - 这样才能实现数据互通
 */

// ==================== 安全配置 ====================

// JWT Secret Key（用于生成token）
// 建议使用随机生成的长字符串
define('HANK_JWT_SECRET', 'your_random_secret_key_here_change_this');

// Token有效期（秒）
define('HANK_TOKEN_EXPIRE', 7 * 24 * 60 * 60); // 7天

// ==================== API配置 ====================

// API Base URL（小程序调用的API地址）
define('HANK_API_BASE_URL', 'http://47.108.70.67/wp-json/hank-wechat/v1');
// 如果有域名并配置了HTTPS：
// define('HANK_API_BASE_URL', 'https://yourdomain.com/wp-json/hank-wechat/v1');

// ==================== 调试模式 ====================

// 开发环境开启，生产环境关闭
define('HANK_WECHAT_DEBUG', true);

// 日志文件路径
define('HANK_WECHAT_LOG_PATH', WP_CONTENT_DIR . '/wechat-login.log');

// ==================== 测试信息 ====================

/**
 * 开发测试账号：
 * 1. 添加测试微信号：开放平台 > 体验管理 > 添加体验者
 * 2. 使用测试微信号进行登录测试
 * 3. 验证数据互通（网站和小程序）
 */

// ==================== 重要提示 ====================

/**
 * 安全提示：
 * 1. 不要将此配置文件提交到Git仓库
 * 2. 生产环境必须使用HTTPS
 * 3. 定期更换AppSecret
 * 4. 保护好JWT Secret Key
 * 
 * 性能优化：
 * 1. 启用Redis缓存（如果可用）
 * 2. 定期清理过期token
 * 3. 优化数据库查询
 * 
 * 用户体验：
 * 1. 提供清晰的登录引导
 * 2. 处理各种登录失败场景
 * 3. 同步用户头像和昵称
 * 4. 记录用户登录日志
 */

?>
