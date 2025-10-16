# 汉克运营知识库 - 微信小程序

## 📱 项目介绍

这是**汉克运营知识库**的微信小程序版本，提供移动端原生体验。

### 功能特性

- ✅ 首页展示：运营资源和最新文章
- ✅ 智能搜索：输入运营问题，获取解决方案和资源包
- ✅ 文章列表：分类浏览运营干货文章
- ✅ 资源库：下载运营工具和模板
- ✅ 联系功能：扫码添加微信

## 🚀 快速开始

### 1. 环境准备

- 安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- 注册微信小程序账号（如需正式发布）

### 2. 打开项目

1. 启动微信开发者工具
2. 选择 "导入项目"
3. 选择 `miniprogram` 目录
4. 填写 AppID（测试可选择 "测试号"）

### 3. 本地调试

- 点击 "编译" 按钮
- 在模拟器或真机预览
- 调试面板查看日志和错误

## 📁 项目结构

```
miniprogram/
├── app.js                    # 小程序入口
├── app.json                  # 小程序配置
├── app.wxss                  # 全局样式
├── sitemap.json              # 搜索配置
│
├── pages/                    # 页面目录
│   ├── index/                # 首页
│   │   ├── index.wxml        # 页面结构
│   │   ├── index.wxss        # 页面样式
│   │   ├── index.js          # 页面逻辑
│   │   └── index.json        # 页面配置
│   │
│   ├── articles/             # 文章列表页
│   ├── article-detail/       # 文章详情页
│   ├── search/               # 搜索页
│   ├── resources/            # 资源页
│   └── about/                # 关于页
│
├── utils/                    # 工具函数
│   └── searchDatabase.js     # 搜索数据库
│
└── images/                   # 图片资源
    ├── home.png              # 首页图标
    ├── article.png           # 文章图标
    ├── resource.png          # 资源图标
    ├── about.png             # 关于图标
    └── wechat-qr.jpg         # 微信二维码
```

## 🎨 页面说明

### 1. 首页 (index)
- Hero 区域：展示主标题和搜索入口
- 快速搜索：热门标签快捷搜索
- 精选资源：推荐资源卡片
- 最新文章：文章列表展示

### 2. 搜索页 (search)
- 搜索输入框
- 热门搜索标签
- 智能搜索结果
- 资源包下载

### 3. 文章列表 (articles)
- 分类筛选
- 文章列表
- 下拉刷新
- 上拉加载更多

### 4. 资源页 (resources)
- 资源分类展示
- 资源详情
- 下载功能

### 5. 关于页 (about)
- 个人介绍
- 联系方式
- 微信二维码

## 🔧 配置说明

### app.json 配置

```json
{
  "pages": ["页面路径"],
  "window": {
    "navigationBarBackgroundColor": "#dc2626",  // 导航栏背景色（红色主题）
    "navigationBarTitleText": "汉克运营知识库",
    "navigationBarTextStyle": "white"
  },
  "tabBar": {
    "list": [/* 底部导航配置 */]
  }
}
```

### 全局配置 (app.js)

```javascript
globalData: {
  // API 基础地址
  apiBaseUrl: 'https://47.108.70.67/wp-json/wp/v2',
  // 静态资源地址
  staticUrl: 'https://47.108.70.67'
}
```

## 📝 开发指南

### 1. 添加新页面

```bash
# 1. 在 pages 目录创建新页面文件夹
mkdir pages/new-page

# 2. 创建四个文件
pages/new-page/
├── new-page.wxml   # 页面结构
├── new-page.wxss   # 页面样式
├── new-page.js     # 页面逻辑
└── new-page.json   # 页面配置

# 3. 在 app.json 中注册页面
"pages": [
  "pages/new-page/new-page"
]
```

### 2. 更新搜索数据库

编辑 `utils/searchDatabase.js`：

```javascript
const operationsDatabase = {
  "新分类": {
    id: "new_category",
    title: "标题",
    description: "描述",
    tags: ["标签"],
    keywords: ["关键词"],
    resources: [/* 资源列表 */]
  }
};
```

### 3. 修改样式

全局样式：`app.wxss`
页面样式：对应页面的 `.wxss` 文件

颜色主题变量：
```css
--color-primary: #dc2626;    /* 主题红色 */
--color-secondary: #1a1a1a;  /* 主题黑色 */
```

### 4. API 集成

如果需要从 WordPress 获取动态内容：

```javascript
// 获取文章列表
wx.request({
  url: `${app.globalData.apiBaseUrl}/posts`,
  success: (res) => {
    this.setData({ articles: res.data });
  }
});
```

## 🎯 注意事项

### 1. 图片资源

需要准备以下图片：
- `images/home.png` - 首页图标
- `images/home-active.png` - 首页图标（选中）
- `images/article.png` - 文章图标
- `images/article-active.png` - 文章图标（选中）
- `images/resource.png` - 资源图标
- `images/resource-active.png` - 资源图标（选中）
- `images/about.png` - 关于图标
- `images/about-active.png` - 关于图标（选中）
- `images/wechat-qr.jpg` - 微信二维码
- `images/avatar.jpg` - 头像
- `images/share-cover.jpg` - 分享封面

### 2. 域名配置

在小程序后台配置服务器域名：
- 微信公众平台 > 开发 > 开发设置 > 服务器域名
- 添加：`https://47.108.70.67`

### 3. 网络请求

小程序网络请求必须使用 HTTPS，确保服务器已配置 SSL 证书。

### 4. 文件大小限制

- 小程序代码包大小限制：2MB（主包）
- 单个分包大小限制：2MB
- 总大小限制：20MB

## 🚀 发布流程

### 1. 开发完成

- 测试所有功能
- 检查 API 接口
- 确认图片资源

### 2. 上传代码

- 微信开发者工具 > 点击 "上传"
- 填写版本号（如 1.0.0）
- 填写项目备注

### 3. 提交审核

- 登录[微信公众平台](https://mp.weixin.qq.com)
- 版本管理 > 开发版本
- 选择版本 > 提交审核
- 填写审核信息

### 4. 发布上线

- 审核通过后
- 版本管理 > 审核版本
- 点击 "发布"

## 🔄 与其他平台同步

请参考根目录的 `THREE-PLATFORM-SYNC-GUIDE.md` 了解如何保持三个平台同步：
- WordPress 官网
- 静态网站
- 微信小程序

## 📞 技术支持

- **文档**：查看 `THREE-PLATFORM-SYNC-GUIDE.md`
- **问题反馈**：通过 GitHub Issues
- **微信开发文档**：https://developers.weixin.qq.com/miniprogram/dev/framework/

## 📄 许可证

GPL v2 or later

---

**开发愉快！** 🚀
