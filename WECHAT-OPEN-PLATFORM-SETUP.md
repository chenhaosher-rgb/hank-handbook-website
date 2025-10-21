# 微信开放平台完整配置指南

## 📋 配置概览

```
微信开放平台
├─ 注册账号（企业认证 ¥300）
├─ 创建网站应用（扫码登录）
├─ 关联小程序（原生登录）
└─ 绑定UnionID机制（数据互通）
```

## 🚀 步骤1：注册微信开放平台账号

### 1.1 访问注册页面
- **网址**：https://open.weixin.qq.com/
- **点击**：右上角"注册"按钮

### 1.2 选择账号类型
- **推荐**：选择"企业/组织"类型
- **个人账号限制**：无法创建网站应用，只能创建移动应用

### 1.3 填写注册信息
```
邮箱：your_email@example.com
密码：设置强密码
验证码：接收邮箱验证码
```

### 1.4 企业认证（必须）
**费用**：¥300元/年

**所需资料**：
1. **企业营业执照**
   - 扫描件或照片
   - 清晰可见营业执照号码

2. **法人身份证**
   - 正反面照片
   - 清晰可见身份证号码

3. **对公银行账户**（或法人微信支付）
   - 用于验证费用支付

4. **联系人信息**
   - 姓名、手机号、邮箱

**审核时间**：1-3个工作日

### 1.5 完成注册
- 提交认证资料
- 等待审核通过
- 收到认证成功通知

---

## 🌐 步骤2：创建网站应用（用于WordPress扫码登录）

### 2.1 进入开放平台管理中心
1. 登录：https://open.weixin.qq.com/
2. 点击：**管理中心**
3. 选择：**网站应用**
4. 点击：**创建网站应用**

### 2.2 填写应用信息

**基本信息**：
```
应用名称：汉克运营知识库
应用简介：运营知识分享平台，建立自己的运营系统，搞到第一桶金

应用官网：
├─ 如果有域名：https://yourdomain.com
└─ 如果用IP：http://47.108.70.67

应用图标：
└─ 上传红色logo.png（108x108像素）
```

**开发信息**：
```
授权回调域：
├─ 如果有域名：yourdomain.com（不带http://和https://）
└─ 如果用IP：47.108.70.67（不带http://）

注意：
• 不要包含协议（http:// 或 https://）
• 不要包含端口号（:80 或 :443）
• 不要包含路径（/path）
• 示例正确：yourdomain.com
• 示例错误：https://yourdomain.com/
```

### 2.3 提交审核
- 点击"提交审核"
- 等待审核（通常1-3个工作日）
- 审核通过后即可使用

### 2.4 获取AppID和AppSecret

**审核通过后**：
1. 进入应用详情页
2. 查看"开发信息"
3. 复制保存：
   ```
   AppID: wx1234567890abcdef
   AppSecret: abcdef1234567890abcdef1234567890
   ```

**⚠️ 重要**：
- AppSecret只显示一次，务必保存！
- 如果遗忘，需要重置（会导致旧Secret失效）

---

## 📱 步骤3：创建/关联小程序应用

### 3.1 方式A：创建新小程序（如果还没有）

1. **访问小程序注册页**
   - 网址：https://mp.weixin.qq.com/
   - 点击"立即注册" > "小程序"

2. **填写注册信息**
   ```
   邮箱：小程序专用邮箱（不能与公众号/开放平台相同）
   密码：设置密码
   主体类型：企业/组织
   ```

3. **企业认证**
   - 费用：¥300元（与开放平台分别计费）
   - 提交企业资料
   - 等待审核

4. **完善小程序信息**
   ```
   小程序名称：汉克运营知识库
   小程序简介：建立自己的运营系统，搞到第一桶金
   小程序类目：教育 > 在线教育
   小程序头像：上传红色logo.png
   ```

5. **获取AppID**
   - 进入：设置 > 开发设置
   - 复制：AppID（格式：wx开头的18位字符）
   - 复制：AppSecret（需要管理员扫码验证）

### 3.2 方式B：使用现有小程序

如果您已有小程序（AppID: wxe68fea6a2d9dd365）：
1. 进入小程序后台：https://mp.weixin.qq.com/
2. 开发 > 开发设置
3. 获取AppID和AppSecret

---

## 🔗 步骤4：绑定UnionID机制（关键步骤）

### 4.1 为什么需要UnionID？
```
没有UnionID的情况：
网站登录 → OpenID_web: o1234567890
小程序登录 → OpenID_mp: o0987654321
❌ 无法识别是同一个用户

有UnionID的情况：
网站登录 → UnionID: u1111111111
小程序登录 → UnionID: u1111111111
✅ 识别为同一个用户，数据互通
```

### 4.2 绑定步骤

1. **进入开放平台管理中心**
   - 网址：https://open.weixin.qq.com/
   - 点击：管理中心

2. **绑定小程序**
   - 点击：**公众号/小程序管理**
   - 点击：**绑定小程序**
   - 输入小程序AppID：`wxe68fea6a2d9dd365`
   - 等待小程序管理员确认

3. **小程序确认绑定**
   - 登录小程序后台：https://mp.weixin.qq.com/
   - 设置 > 第三方设置 > 关联的开放平台账号
   - 确认绑定请求

4. **验证绑定成功**
   - 开放平台看到小程序已绑定
   - 状态显示：已绑定 ✅

### 4.3 UnionID获取机制
绑定成功后，用户登录时会同时返回：
- `openid`：应用内的用户标识
- `unionid`：开放平台下的统一标识

---

## ⚙️ 步骤5：配置服务器域名（小程序）

### 5.1 进入小程序后台
- 网址：https://mp.weixin.qq.com/
- 登录小程序账号

### 5.2 配置服务器域名
1. 进入：**开发 > 开发管理 > 开发设置**
2. 找到：**服务器域名**
3. 点击：**修改**

### 5.3 添加域名

**request合法域名**（API请求域名）：
```
开发环境：http://47.108.70.67
生产环境：https://yourdomain.com（必须HTTPS）

注意事项：
• 域名必须备案
• 必须是HTTPS（开发期间可以在开发者工具勾选"不校验域名"）
• 最多可配置20个域名
```

**配置示例**：
```
request合法域名：
├─ https://yourdomain.com
└─ 如果有多个API地址，可以都添加
```

### 5.4 保存配置
- 点击"保存并提交"
- 需要管理员扫码验证
- 保存成功后生效

---

## 🔧 步骤6：配置WordPress

### 6.1 编辑配置文件

找到并编辑：`wechat-login.php`

```php
// 网站应用配置
define('WECHAT_WEB_APPID', 'wx1234567890abcdef');     // ← 替换为网站应用的AppID
define('WECHAT_WEB_SECRET', 'abcdef1234567890...');   // ← 替换为网站应用的AppSecret

// 小程序配置
define('WECHAT_MP_APPID', 'wxe68fea6a2d9dd365');      // ← 您的小程序AppID
define('WECHAT_MP_SECRET', '1234567890abcdef...');    // ← 替换为小程序的AppSecret

// 回调地址
define('WECHAT_REDIRECT_URI', 'http://47.108.70.67/wechat-callback.php');
// 如果有域名：
// define('WECHAT_REDIRECT_URI', 'https://yourdomain.com/wechat-callback.php');
```

### 6.2 上传文件
通过FTP或OnePanel上传：
```
wechat-login.php      → WordPress主题目录
wechat-api.php        → WordPress主题目录
wechat-callback.php   → WordPress网站根目录（与wp-config.php同级）
```

### 6.3 验证配置
访问以下地址检查：
```
http://47.108.70.67/wp-json/hank-wechat/v1
```
应该看到API路由列表

---

## 📱 步骤7：配置小程序

### 7.1 编辑配置文件

找到并编辑：`miniprogram/app.js`

```javascript
globalData: {
  userInfo: null,
  token: null,
  apiUrl: 'http://47.108.70.67/wp-json/hank-wechat/v1'
  // 如果有HTTPS域名：
  // apiUrl: 'https://yourdomain.com/wp-json/hank-wechat/v1'
}
```

### 7.2 开发者工具配置

1. **打开微信开发者工具**
   - 下载地址：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

2. **导入项目**
   ```
   项目目录：选择 miniprogram 文件夹
   AppID：wxe68fea6a2d9dd365
   项目名称：汉克运营知识库
   ```

3. **开启调试模式**
   - 点击：详情 > 本地设置
   - 勾选：**不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书**
   - 这样可以在开发阶段使用HTTP域名

### 7.3 测试配置
1. 点击"编译"
2. 查看控制台日志
3. 应该看到登录成功信息

---

## 🧪 步骤8：测试完整流程

### 测试1：网站扫码登录
```
1. 访问：http://47.108.70.67
2. 点击："微信登录"按钮
3. 看到：微信二维码
4. 扫码：使用微信扫描
5. 确认：点击"确认登录"
6. 跳转：返回网站首页
7. 显示：用户头像和昵称 ✅
```

### 测试2：小程序登录
```
1. 打开：微信开发者工具
2. 编译：运行小程序
3. 自动：执行wx.login()
4. 查看：控制台应该显示"登录成功"
5. 进入："我的"页面
6. 显示：用户信息 ✅
```

### 测试3：数据互通（UnionID）
```
1. 网站登录后查看用户信息
2. 进入WordPress后台 > 用户 > 编辑用户
3. 查看自定义字段：wechat_unionid
4. 复制UnionID值（如：oxxxxxxxxxxxxxx）

5. 小程序登录后
6. 查看控制台日志中的UnionID
7. 两个UnionID应该完全相同 ✅
```

### 测试4：搜索记录同步
```
1. 在小程序搜索"用户增长"
2. 查看网络请求，应该有：
   POST /wp-json/hank-wechat/v1/search-history
3. 访问网站"我的"页面
4. 应该看到"用户增长"的搜索记录 ✅
```

---

## 📊 配置信息汇总表

### 网站应用配置
| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| AppID | 网站应用AppID | wx1234567890abcdef |
| AppSecret | 网站应用密钥 | abcdef1234567890... |
| 授权回调域 | 网站域名（不含协议） | 47.108.70.67 或 yourdomain.com |
| 应用状态 | 必须审核通过 | 已通过 ✅ |

### 小程序配置
| 配置项 | 说明 | 当前值 |
|--------|------|--------|
| AppID | 小程序AppID | wxe68fea6a2d9dd365 |
| AppSecret | 小程序密钥 | 需要获取 |
| 服务器域名 | API请求域名 | http://47.108.70.67 |
| 绑定状态 | 绑定到开放平台 | 需要绑定 |

### WordPress配置文件
```php
// wechat-login.php 中需要配置的值：

define('WECHAT_WEB_APPID', 'wx________________');      // ← 填写网站应用AppID
define('WECHAT_WEB_SECRET', '________________________________'); // ← 填写网站应用AppSecret
define('WECHAT_MP_APPID', 'wxe68fea6a2d9dd365');       // ← 您的小程序AppID
define('WECHAT_MP_SECRET', '________________________________'); // ← 填写小程序AppSecret
define('WECHAT_REDIRECT_URI', 'http://47.108.70.67/wechat-callback.php'); // ← 回调地址
```

---

## 🔍 常见问题解决

### 问题1：扫码后显示"redirect_uri参数错误"

**原因**：授权回调域配置不正确

**解决步骤**：
1. 检查开放平台 > 网站应用 > 授权回调域
2. 确保格式正确（不含http://、端口、路径）
3. 示例正确格式：
   ```
   yourdomain.com          ✅
   47.108.70.67            ✅
   http://yourdomain.com   ❌
   yourdomain.com:80       ❌
   yourdomain.com/path     ❌
   ```

### 问题2：小程序登录失败

**原因**：AppSecret配置错误或服务器域名未配置

**解决步骤**：
1. 检查`app.js`中的apiUrl配置
2. 小程序后台检查服务器域名
3. 开发者工具勾选"不校验合法域名"
4. 查看控制台错误信息

### 问题3：无法获取UnionID

**原因**：网站应用和小程序未绑定到同一开放平台

**解决步骤**：
1. 开放平台 > 管理中心 > 公众号/小程序管理
2. 检查小程序是否已绑定
3. 如果未绑定，点击"绑定小程序"
4. 输入小程序AppID并确认

**验证UnionID**：
```sql
-- 在WordPress数据库中查询
SELECT 
    u.user_login,
    um.meta_value as unionid
FROM wp_users u
INNER JOIN wp_usermeta um ON u.ID = um.user_id
WHERE um.meta_key = 'wechat_unionid';
```

### 问题4：网站登录成功但小程序获取不到数据

**原因**：Token认证失败或API请求失败

**解决步骤**：
1. 小程序控制台查看网络请求
2. 检查是否返回401未授权
3. 验证Token是否有效
4. 检查API地址是否正确

---

## 🎯 快速配置检查清单

### 微信开放平台
- [ ] 已注册并完成企业认证
- [ ] 已创建网站应用
- [ ] 已获取网站应用AppID和AppSecret
- [ ] 已配置授权回调域
- [ ] 已关联小程序
- [ ] 已获取小程序AppID和AppSecret
- [ ] 已验证UnionID绑定成功

### WordPress配置
- [ ] 已上传wechat-login.php
- [ ] 已上传wechat-api.php
- [ ] 已上传wechat-callback.php
- [ ] 已配置AppID和AppSecret
- [ ] 已测试API端点可访问
- [ ] 已创建"我的"页面

### 小程序配置
- [ ] 已配置小程序服务器域名
- [ ] 已更新app.js中的apiUrl
- [ ] 已在开发者工具导入项目
- [ ] 已勾选"不校验合法域名"（开发期间）
- [ ] 已测试登录功能

### 功能测试
- [ ] 网站扫码登录成功
- [ ] 小程序登录成功
- [ ] 两端UnionID一致
- [ ] 小程序搜索记录同步到网站
- [ ] 网站能显示小程序的数据

---

## 📞 获取帮助

### 微信开放平台文档
- 网站应用开发：https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
- 小程序登录：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
- UnionID机制：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/union-id.html

### 技术支持
- 微信开放社区：https://developers.weixin.qq.com/community/
- 在线客服：开放平台右下角

---

## 💡 配置完成后

### WordPress端验证
```bash
# 访问测试
http://47.108.70.67                    # 首页
http://47.108.70.67/my-account         # 我的页面
http://47.108.70.67/wp-json/hank-wechat/v1  # API端点
```

### 小程序端验证
```
1. 运行小程序
2. 查看控制台日志
3. 应该看到：
   - "小程序启动"
   - "获取code成功"
   - "登录API响应"
   - "登录成功，用户信息"
   - "开始执行云端数据同步"
```

### 配置文件备份
```php
// 保存这些信息到安全的地方
网站应用AppID: wx________________
网站应用AppSecret: ________________________________
小程序AppID: wxe68fea6a2d9dd365
小程序AppSecret: ________________________________
回调域名: 47.108.70.67 或 yourdomain.com
```

---

## 🎓 下一步

配置完成后，您就可以：
1. ✅ 用户通过微信扫码登录网站
2. ✅ 用户通过小程序原生登录
3. ✅ 两端数据通过UnionID互通
4. ✅ 搜索记录和资料包云端同步
5. ✅ 跨设备数据一致

**恭喜您！微信开放平台配置完成！** 🎉
