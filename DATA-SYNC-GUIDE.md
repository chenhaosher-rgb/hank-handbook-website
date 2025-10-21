# 三端数据同步完整方案

## 🔄 数据同步架构

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  WordPress网站   │ ◄────► │  WordPress数据库  │ ◄────► │   微信小程序     │
│   (网页端)      │         │   (云端存储)     │         │   (移动端)      │
└─────────────────┘         └─────────────────┘         └─────────────────┘
        │                            │                            │
        ├─ 扫码登录                  ├─ UnionID统一              ├─ 原生登录
        ├─ 查看资料包                ├─ 资料包数据              ├─ 下载资料包
        ├─ 查看搜索记录              ├─ 搜索记录数据            ├─ 搜索保存
        └─ 实时同步                  └─ REST API               └─ 自动同步
```

## 📊 同步的数据类型

### 1. 用户数据
- **UnionID**：统一用户标识（微信开放平台）
- **OpenID（网站）**：网站应用的用户标识
- **OpenID（小程序）**：小程序的用户标识
- **昵称**：微信昵称
- **头像**：微信头像URL
- **登录时间**：首次登录、最后登录

### 2. 资料包数据
**存储位置**：
- WordPress：`wp_usermeta` 表，`meta_key = 'hank_packages'`
- 小程序：本地存储 `my_packages`

**数据结构**：
```javascript
{
  id: "唯一ID",
  title: "资料包标题",
  description: "资料包描述",
  icon: "📦",
  tags: ["标签1", "标签2"],
  downloadTime: "2024-01-20 15:30:00",
  url: "下载链接"
}
```

### 3. 搜索记录数据
**存储位置**：
- WordPress：`wp_usermeta` 表，`meta_key = 'hank_search_history'`
- 小程序：本地存储 `search_history`

**数据结构**：
```javascript
{
  id: "唯一ID",
  keyword: "搜索关键词",
  searchTime: "2024-01-20 15:30:00",
  resultCount: 5
}
```

## 🔗 REST API端点

### 1. 资料包API
```
GET  /wp-json/hank-wechat/v1/packages
POST /wp-json/hank-wechat/v1/packages
```

**GET请求**（拉取资料包）：
```javascript
// 小程序端
wx.request({
  url: apiUrl + '/packages',
  method: 'GET',
  header: {
    'Authorization': 'Bearer ' + token
  },
  success: res => {
    // res.data.packages - 资料包数组
  }
});
```

**POST请求**（保存资料包）：
```javascript
// 小程序端
wx.request({
  url: apiUrl + '/packages',
  method: 'POST',
  header: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  data: {
    packages: packagesArray
  },
  success: res => {
    // res.data.success - 是否成功
  }
});
```

### 2. 搜索记录API
```
GET  /wp-json/hank-wechat/v1/search-history
POST /wp-json/hank-wechat/v1/search-history
```

**GET请求**（拉取搜索记录）：
```javascript
// 小程序端
wx.request({
  url: apiUrl + '/search-history',
  method: 'GET',
  header: {
    'Authorization': 'Bearer ' + token
  },
  success: res => {
    // res.data.history - 搜索记录数组
  }
});
```

**POST请求**（保存搜索记录）：
```javascript
// 小程序端
wx.request({
  url: apiUrl + '/search-history',
  method: 'POST',
  header: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  data: {
    history: historyArray
  },
  success: res => {
    // res.data.success - 是否成功
  }
});
```

## ⚡ 自动同步时机

### 小程序端自动同步

#### 1. 登录成功时
```javascript
// app.js - triggerLoginSuccess()
CloudSync.fullSync(); // 执行完整双向同步
```

#### 2. 搜索后
```javascript
// pages/search/search.js - saveSearchHistory()
wx.setStorageSync('search_history', filteredHistory);
CloudSync.syncHistoryToCloud(); // 同步到云端
```

#### 3. 下载资料包后
```javascript
// pages/search/search.js - saveToMyPackages()
wx.setStorageSync('my_packages', packages);
CloudSync.syncPackagesToCloud(); // 同步到云端
```

#### 4. 进入个人中心时
```javascript
// pages/about/about.js - onShow()
CloudSync.pullPackagesFromCloud();  // 从云端拉取
CloudSync.pullHistoryFromCloud();   // 从云端拉取
```

### WordPress端自动同步

#### 1. 页面加载时
```javascript
// page-my-account.php + js/my-account.js
fetch('/wp-json/hank-wechat/v1/packages')   // 读取资料包
fetch('/wp-json/hank-wechat/v1/search-history') // 读取搜索记录
```

## 🔄 数据合并策略

### 资料包合并
1. **云端数据优先**：以云端数据为基础
2. **本地新增保留**：本地有但云端没有的数据保留
3. **去重**：相同ID的资料包只保留一个
4. **排序**：按下载时间倒序排列

### 搜索记录合并
1. **云端数据优先**：以云端数据为基础
2. **本地新增保留**：本地有但云端没有的记录保留
3. **去重**：相同ID的搜索记录只保留一个
4. **限制数量**：最多保留50条
5. **排序**：按搜索时间倒序排列

## 🎯 完整同步流程

### 用户操作流程

```
1. 用户在小程序搜索"用户增长"
   ↓
2. 保存到本地：search_history
   ↓
3. 自动同步到云端：POST /search-history
   ↓
4. WordPress数据库：wp_usermeta 存储
   ↓
5. 用户在网站登录
   ↓
6. 访问"我的"页面
   ↓
7. 从云端读取：GET /search-history
   ↓
8. 显示相同的搜索记录
```

### 跨设备同步流程

```
设备A（小程序）              云端              设备B（网站）
    │                        │                      │
    ├─ 搜索"变现策略" ──→ 保存到云端
    │                        │
    │                        │ ◄─── 用户访问"我的"页面
    │                        │
    │                        ├──→ 读取搜索记录
    │                        │
    │                        │      显示"变现策略"
```

## 🛠️ 核心文件说明

### WordPress端
1. **wechat-api.php**
   - `hank_wechat_get_packages()` - 读取资料包
   - `hank_wechat_save_packages()` - 保存资料包
   - `hank_wechat_get_search_history()` - 读取搜索记录
   - `hank_wechat_save_search_history()` - 保存搜索记录

2. **page-my-account.php**
   - "我的"页面模板
   - 显示用户信息
   - 渲染资料包和搜索记录

3. **js/my-account.js**
   - 前端数据渲染脚本
   - 调用REST API
   - 动态更新页面内容

### 小程序端
1. **utils/cloudSync.js**
   - `syncPackagesToCloud()` - 同步资料包到云端
   - `pullPackagesFromCloud()` - 从云端拉取资料包
   - `syncHistoryToCloud()` - 同步搜索记录到云端
   - `pullHistoryFromCloud()` - 从云端拉取搜索记录
   - `fullSync()` - 完整双向同步

2. **app.js**
   - 登录成功后自动执行 `CloudSync.fullSync()`

3. **pages/search/search.js**
   - 搜索后保存记录并同步
   - 下载后保存资料包并同步

4. **pages/about/about.js**
   - 进入页面时从云端拉取数据

## 📱 使用场景示例

### 场景1：小程序搜索 → 网站查看
1. 用户在**小程序**搜索"用户增长"
2. 搜索记录自动保存到本地
3. 自动同步到WordPress云端
4. 用户在**网站**访问"我的"页面
5. 看到相同的搜索记录"用户增长"

### 场景2：小程序下载 → 网站查看
1. 用户在**小程序**下载"用户增长手册"
2. 资料包自动保存到本地
3. 自动同步到WordPress云端
4. 用户在**网站**访问"我的"页面
5. 看到相同的资料包"用户增长手册"

### 场景3：跨设备同步
1. 用户在**设备A小程序**搜索和下载
2. 数据同步到云端
3. 用户在**设备B小程序**登录
4. 自动从云端拉取数据
5. 看到设备A的所有操作记录

## 🔐 安全机制

### 1. Token认证
- 所有API请求必须携带有效Token
- Token通过`Authorization: Bearer {token}`传递
- Token有效期7天

### 2. 用户隔离
- 每个用户只能访问自己的数据
- 通过Token解析user_id
- 数据库层面用户隔离

### 3. 数据验证
- 服务端验证数据格式
- 限制数据量（资料包无限制，搜索记录最多50条）
- 防止恶意数据注入

## 🧪 测试步骤

### 1. 测试小程序到WordPress同步
```
1. 打开小程序
2. 登录（获取Token）
3. 搜索"用户增长"
4. 下载一个资料包
5. 检查网络请求（应该看到POST /packages 和 /search-history）
6. 登录WordPress网站
7. 访问"我的"页面
8. 应该看到相同的搜索记录和资料包
```

### 2. 测试WordPress到小程序同步
```
1. 在WordPress后台直接修改用户meta
2. 打开小程序"我的"页面
3. 应该自动从云端拉取最新数据
4. 显示WordPress中的数据
```

### 3. 测试跨设备同步
```
1. 设备A（手机A）：小程序登录并操作
2. 设备B（手机B）：小程序登录
3. 设备B应该看到设备A的数据
4. 设备C（电脑）：网站登录
5. 设备C也应该看到相同数据
```

## 📊 数据库查询

### 查看用户的资料包
```sql
SELECT 
    u.user_login,
    um.meta_value as packages
FROM wp_users u
INNER JOIN wp_usermeta um ON u.ID = um.user_id
WHERE um.meta_key = 'hank_packages'
AND u.ID = {user_id};
```

### 查看用户的搜索记录
```sql
SELECT 
    u.user_login,
    um.meta_value as search_history
FROM wp_users u
INNER JOIN wp_usermeta um ON u.ID = um.user_id
WHERE um.meta_key = 'hank_search_history'
AND u.ID = {user_id};
```

## 🐛 故障排查

### 问题1：数据没有同步
**检查步骤**：
1. 确认用户已登录（有Token）
2. 检查网络请求是否成功
3. 查看控制台日志
4. 验证Token是否有效

### 问题2：数据重复
**原因**：ID生成冲突
**解决**：使用时间戳 + 随机字符串生成唯一ID

### 问题3：云端数据丢失
**原因**：本地数据覆盖了云端数据
**解决**：使用合并策略，而不是直接覆盖

### 问题4：同步延迟
**原因**：网络延迟或API响应慢
**解决**：添加加载提示，使用异步操作

## 💡 性能优化

### 1. 减少同步频率
- 不要每次操作都同步
- 批量操作后统一同步
- 设置同步间隔（如30秒内只同步一次）

### 2. 增量同步
- 只同步变更的数据
- 使用时间戳判断是否需要更新

### 3. 缓存策略
- 云端数据缓存到本地
- 减少重复请求

### 4. 离线支持
- 离线时保存到本地队列
- 上线后自动同步

## 🚀 扩展功能

### 1. 实时同步
- 使用WebSocket实现实时推送
- 用户在网站操作，小程序立即更新

### 2. 冲突解决
- 检测数据冲突
- 提供合并或选择界面

### 3. 同步状态显示
- 显示"正在同步..."
- 显示"同步成功"
- 显示"同步失败，点击重试"

### 4. 数据导出
- 支持导出为Excel或JSON
- 用户可下载自己的数据

## 📋 部署检查清单

### WordPress端
- [x] wechat-api.php 已添加资料包和搜索记录API
- [x] page-my-account.php 已创建"我的"页面模板
- [x] js/my-account.js 已添加前端同步脚本
- [ ] create-pages.php 运行并创建"我的"页面
- [ ] 测试API端点是否可访问

### 小程序端
- [x] utils/cloudSync.js 已创建云端同步工具
- [x] app.js 已集成登录后自动同步
- [x] pages/search/search.js 已集成搜索后同步
- [x] pages/about/about.js 已集成进入时拉取
- [ ] 测试同步功能是否正常

### 数据库
- [ ] 检查用户meta表结构
- [ ] 确认数据正常存储
- [ ] 验证数据格式正确

## 🎓 使用说明

### 用户视角

**小程序端**：
1. 搜索运营问题 → 自动保存并同步
2. 下载资料包 → 自动保存并同步
3. 进入"我的"页面 → 自动从云端获取最新数据

**网站端**：
1. 扫码登录
2. 访问"我的"页面
3. 看到与小程序完全相同的数据

**跨设备**：
1. 在任何设备登录
2. 数据自动同步
3. 所有设备数据一致

---

**重要提示**：
- 🔴 必须登录才能同步数据
- 🔴 网络异常时会保存到本地，联网后自动同步
- 🔴 数据存储在WordPress数据库，安全可靠
- 🔴 支持无限设备同时登录和同步
