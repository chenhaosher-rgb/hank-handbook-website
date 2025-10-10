# Cursor 与 GitHub 无缝协作指南

## 🎯 概述

本指南将帮助您在 Cursor 中实现与 GitHub 的完美协作，实现代码的实时同步和版本控制。

## 🚀 方法一：使用 Git 命令行（推荐）

### 1. 配置 Git 用户信息

```bash
# 设置用户名和邮箱（如果还没设置）
git config --global user.name "您的用户名"
git config --global user.email "您的邮箱@example.com"

# 查看当前配置
git config --list
```

### 2. 创建 GitHub 仓库

1. **登录 GitHub**
2. **点击右上角的 "+" 按钮**
3. **选择 "New repository"**
4. **填写仓库信息**：
   - Repository name: `hank-handbook-website`
   - Description: `汉克运营知识库网站 - WordPress主题和静态网站`
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"
5. **点击 "Create repository"**

### 3. 连接本地仓库与 GitHub

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为您的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/hank-handbook-website.git

# 查看远程仓库
git remote -v

# 推送到 GitHub
git push -u origin main
```

### 4. 日常协作流程

#### 🔄 推送代码到 GitHub
```bash
# 1. 查看修改状态
git status

# 2. 添加修改的文件
git add .

# 3. 提交修改
git commit -m "描述您的修改"

# 4. 推送到 GitHub
git push
```

#### 📥 从 GitHub 拉取代码
```bash
# 拉取最新代码
git pull

# 或者先获取再合并
git fetch
git merge origin/main
```

#### 🌿 分支管理
```bash
# 创建新分支
git checkout -b feature/new-feature

# 切换分支
git checkout main

# 合并分支
git merge feature/new-feature

# 删除分支
git branch -d feature/new-feature
```

## 🎨 方法二：使用 Cursor 内置 Git 功能

### 1. 在 Cursor 中查看 Git 状态

- **左侧面板**：点击 "Source Control" 图标（分支图标）
- **查看修改**：红色表示删除，绿色表示新增，黄色表示修改
- **暂存文件**：点击 "+" 号暂存文件
- **提交信息**：在输入框中输入提交信息
- **提交**：按 `Cmd+Enter`（Mac）或 `Ctrl+Enter`（Windows）

### 2. Cursor 中的 Git 快捷键

| 功能 | Mac | Windows/Linux |
|------|-----|---------------|
| 打开 Source Control | `Cmd+Shift+G` | `Ctrl+Shift+G` |
| 提交 | `Cmd+Enter` | `Ctrl+Enter` |
| 推送 | `Cmd+Shift+P` 然后输入 "Git: Push" | `Ctrl+Shift+P` 然后输入 "Git: Push" |
| 拉取 | `Cmd+Shift+P` 然后输入 "Git: Pull" | `Ctrl+Shift+P` 然后输入 "Git: Pull" |
| 查看差异 | 点击文件名 | 点击文件名 |

### 3. 在 Cursor 中管理分支

1. **查看分支**：左下角显示当前分支
2. **创建分支**：点击分支名 → "Create new branch"
3. **切换分支**：点击分支名 → 选择分支
4. **合并分支**：使用命令面板 `Cmd+Shift+P` → "Git: Merge Branch"

## 🔧 方法三：使用 GitHub Desktop

### 1. 安装 GitHub Desktop

- 下载地址：https://desktop.github.com/
- 支持 Mac 和 Windows

### 2. 配置 GitHub Desktop

1. **登录 GitHub 账户**
2. **克隆仓库**：File → Clone repository
3. **选择本地仓库路径**

### 3. 使用 GitHub Desktop

- **可视化界面**：直观地查看修改
- **一键提交**：填写提交信息后点击 "Commit to main"
- **一键推送**：点击 "Push origin"
- **分支管理**：图形化分支操作

## 📱 方法四：使用 GitHub CLI

### 1. 安装 GitHub CLI

```bash
# Mac (使用 Homebrew)
brew install gh

# Windows (使用 Chocolatey)
choco install gh

# 验证安装
gh --version
```

### 2. 登录和配置

```bash
# 登录 GitHub
gh auth login

# 选择 HTTPS 协议
# 选择 GitHub.com
# 选择 "Login with a web browser"
```

### 3. 使用 GitHub CLI

```bash
# 创建仓库
gh repo create hank-handbook-website --public --description "汉克运营知识库网站"

# 克隆仓库
gh repo clone YOUR_USERNAME/hank-handbook-website

# 查看仓库状态
gh repo view

# 创建 Issue
gh issue create --title "新功能请求" --body "描述功能需求"

# 创建 Pull Request
gh pr create --title "新功能" --body "描述修改内容"
```

## 🔄 实时同步策略

### 1. 自动同步设置

#### 使用 Git Hooks
```bash
# 创建 post-commit hook
echo '#!/bin/bash
git push origin main' > .git/hooks/post-commit
chmod +x .git/hooks/post-commit
```

#### 使用 GitHub Actions（高级）
创建 `.github/workflows/sync.yml`：
```yaml
name: Auto Sync
on:
  push:
    branches: [ main ]
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Auto commit and push
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        # 添加自动同步逻辑
```

### 2. 多设备同步

#### 设备 A（开发）
```bash
# 修改代码
# 提交并推送
git add .
git commit -m "新功能开发"
git push
```

#### 设备 B（同步）
```bash
# 拉取最新代码
git pull

# 继续开发
# 提交并推送
git add .
git commit -m "功能完善"
git push
```

## 🛠️ 最佳实践

### 1. 提交信息规范

```bash
# 功能开发
git commit -m "feat: 添加用户注册功能"

# 修复 bug
git commit -m "fix: 修复登录页面样式问题"

# 文档更新
git commit -m "docs: 更新 API 文档"

# 样式调整
git commit -m "style: 调整按钮颜色和间距"

# 重构代码
git commit -m "refactor: 重构用户服务模块"
```

### 2. 分支命名规范

```bash
# 功能开发
feature/user-authentication
feature/payment-system

# 修复 bug
bugfix/login-error
hotfix/security-patch

# 发布版本
release/v1.0.0
release/v2.0.0

# 个人开发
hank/experimental-feature
hank/ui-improvements
```

### 3. 忽略文件配置

创建或更新 `.gitignore`：
```gitignore
# 系统文件
.DS_Store
Thumbs.db

# 编辑器文件
.vscode/
.idea/
*.swp
*.swo

# 依赖文件
node_modules/
vendor/

# 日志文件
*.log
logs/

# 临时文件
*.tmp
*.temp

# 敏感信息
.env
config/database.yml

# WordPress 特定
wp-config.php
wp-content/uploads/
wp-content/cache/
```

## 🔐 安全设置

### 1. SSH 密钥配置

```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 添加到 SSH agent
ssh-add ~/.ssh/id_ed25519

# 复制公钥到剪贴板
pbcopy < ~/.ssh/id_ed25519.pub

# 在 GitHub 中添加 SSH 密钥
# Settings → SSH and GPG keys → New SSH key
```

### 2. 使用 SSH 连接

```bash
# 使用 SSH 克隆
git clone git@github.com:YOUR_USERNAME/hank-handbook-website.git

# 修改远程 URL 为 SSH
git remote set-url origin git@github.com:YOUR_USERNAME/hank-handbook-website.git
```

## 📊 监控和统计

### 1. 查看提交历史

```bash
# 查看提交历史
git log --oneline

# 查看详细历史
git log --graph --pretty=format:'%h -%d %s (%cr) <%an>'

# 查看文件修改历史
git log --follow filename.php
```

### 2. 统计代码贡献

```bash
# 查看贡献统计
git shortlog -sn

# 查看每个文件的修改次数
git log --pretty=format: --name-only | sort | uniq -c | sort -rg
```

## 🚨 常见问题解决

### 1. 推送被拒绝

```bash
# 先拉取最新代码
git pull --rebase

# 解决冲突后推送
git push
```

### 2. 合并冲突

```bash
# 查看冲突文件
git status

# 手动解决冲突后
git add .
git commit -m "解决合并冲突"
```

### 3. 撤销提交

```bash
# 撤销最后一次提交（保留修改）
git reset --soft HEAD~1

# 撤销最后一次提交（删除修改）
git reset --hard HEAD~1

# 修改最后一次提交信息
git commit --amend -m "新的提交信息"
```

## 📱 移动端协作

### 1. GitHub Mobile App

- **下载**：App Store 或 Google Play
- **功能**：查看代码、Issues、Pull Requests
- **限制**：不能直接编辑代码

### 2. 移动端代码编辑

- **GitHub Codespaces**：在线 IDE
- **GitHub.dev**：在线编辑器
- **Working Copy**（iOS）：Git 客户端

## 🎯 团队协作

### 1. 权限管理

- **Owner**：完全控制
- **Admin**：管理仓库
- **Write**：推送代码
- **Read**：只能查看

### 2. 代码审查

```bash
# 创建 Pull Request
gh pr create --title "新功能" --body "详细描述"

# 审查 Pull Request
gh pr review 123 --approve
gh pr review 123 --request-changes
```

### 3. 项目管理

- **Issues**：任务和 bug 跟踪
- **Projects**：看板式项目管理
- **Milestones**：版本里程碑
- **Labels**：标签分类

---

## 🎉 总结

通过以上方法，您可以实现：

✅ **实时同步**：代码修改立即同步到 GitHub  
✅ **版本控制**：完整的修改历史和回滚能力  
✅ **多设备协作**：在任何设备上继续开发  
✅ **团队协作**：多人同时开发同一项目  
✅ **备份安全**：代码安全存储在云端  

选择最适合您工作流程的方法，开始您的 GitHub 协作之旅！🚀
