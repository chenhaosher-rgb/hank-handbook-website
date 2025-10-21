# OnePanel WordPress页面创建指南

## 🚀 快速解决方案

### 方法1：使用OnePanel文件管理器

1. **登录OnePanel**
   - 访问：http://47.108.70.67:8090/panel
   - 用户名：6ihvjwwo2i
   - 密码：xkbjlocn1m

2. **上传页面创建脚本**
   - 进入：文件管理
   - 导航到WordPress根目录（通常包含wp-config.php的目录）
   - 上传 `create-pages.php` 文件

3. **运行脚本**
   - 访问：http://47.108.70.67/create-pages.php
   - 脚本会自动创建所有页面

4. **删除脚本**
   - 创建完成后，删除 `create-pages.php` 文件

### 方法2：通过WordPress后台手动创建

1. **登录WordPress**
   - 访问：http://47.108.70.67/wp-admin
   - 使用您的管理员账号登录

2. **批量创建页面**
   ```
   页面列表：
   ├── 运营知识库 VIP (page-knowledge-base)
   ├── 内容创作工具箱 (page-content-toolbox)
   ├── 用户增长手册 (page-growth-handbook)
   ├── 变现策略指南 (page-monetization-guide)
   ├── 数据分析工具 (page-data-analysis)
   ├── 运营案例库 (page-case-library)
   └── 文章 (articles)
   ```

3. **每个页面的设置**
   - 标题：使用上面的名称
   - 固定链接：使用括号中的slug
   - 页面模板：选择对应的模板
   - 状态：发布

### 方法3：使用OnePanel数据库管理

1. **进入数据库管理**
   - OnePanel > 数据库
   - 找到WordPress数据库

2. **执行SQL语句**
   ```sql
   INSERT INTO wp_posts (post_title, post_name, post_content, post_status, post_type, post_author, post_date, post_date_gmt, post_modified, post_modified_gmt) VALUES
   ('运营知识库 VIP', 'page-knowledge-base', '', 'publish', 'page', 1, NOW(), NOW(), NOW(), NOW()),
   ('内容创作工具箱', 'page-content-toolbox', '', 'publish', 'page', 1, NOW(), NOW(), NOW(), NOW()),
   ('用户增长手册', 'page-growth-handbook', '', 'publish', 'page', 1, NOW(), NOW(), NOW(), NOW()),
   ('变现策略指南', 'page-monetization-guide', '', 'publish', 'page', 1, NOW(), NOW(), NOW(), NOW()),
   ('数据分析工具', 'page-data-analysis', '', 'publish', 'page', 1, NOW(), NOW(), NOW(), NOW()),
   ('运营案例库', 'page-case-library', '', 'publish', 'page', 1, NOW(), NOW(), NOW(), NOW()),
   ('文章', 'articles', '', 'publish', 'page', 1, NOW(), NOW(), NOW(), NOW());
   ```

## 🔍 验证步骤

创建完成后，访问以下链接验证：
- http://47.108.70.67/page-knowledge-base
- http://47.108.70.67/page-content-toolbox
- http://47.108.70.67/page-growth-handbook
- http://47.108.70.67/page-monetization-guide
- http://47.108.70.67/page-data-analysis
- http://47.108.70.67/page-case-library
- http://47.108.70.67/articles

## ⚠️ 注意事项

1. 确保主题已正确安装
2. 检查固定链接设置
3. 清除缓存（如果有）
4. 检查文件权限

## 🆘 如果还是404

1. **检查主题安装**
   - 外观 > 主题
   - 确保"红人汉克手册"主题已激活

2. **检查固定链接**
   - 设置 > 固定链接
   - 选择"自定义结构"：/%postname%/

3. **清除缓存**
   - 如果有缓存插件，清除所有缓存

4. **检查.htaccess文件**
   - 确保.htaccess文件存在且有正确权限
