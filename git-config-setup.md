# Git 配置设置指南

## 🔧 需要配置的信息

在使用 Git 之前，需要设置您的用户名和邮箱，这些信息会出现在您的每次提交中。

## 📝 配置命令

### 方法 1：全局配置（推荐）
全局配置会应用到您所有的 Git 项目：

```bash
# 设置用户名（使用您的 GitHub 用户名）
git config --global user.name "chenhaosher-rgb"

# 设置邮箱（使用您 GitHub 账户的邮箱）
git config --global user.email "your-email@example.com"
```

### 方法 2：仅为当前项目配置
如果您只想为当前项目设置：

```bash
# 设置用户名
git config user.name "chenhaosher-rgb"

# 设置邮箱
git config user.email "your-email@example.com"
```

## ✅ 验证配置

配置完成后，验证设置：

```bash
# 查看用户名
git config --global user.name

# 查看邮箱
git config --global user.email

# 查看所有配置
git config --list
```

## 📌 重要说明

### 关于邮箱地址：
1. **使用 GitHub 注册时的邮箱**
2. **或者使用 GitHub 提供的隐私邮箱**：
   - 格式：`username@users.noreply.github.com`
   - 例如：`chenhaosher-rgb@users.noreply.github.com`

### 查找您的 GitHub 邮箱：
1. 登录 GitHub
2. 点击右上角头像 > Settings
3. 左侧菜单选择 Emails
4. 查看 Primary email address

## 🔐 隐私设置（可选）

如果您不想公开真实邮箱，可以：

1. 在 GitHub Settings > Emails 中
2. 勾选 "Keep my email addresses private"
3. 使用 GitHub 提供的 noreply 邮箱

## 🚀 配置完成后

配置完成后，您就可以：
- ✅ 提交代码到本地仓库
- ✅ 推送代码到 GitHub
- ✅ 代码提交会显示您的名字和邮箱

---

**下一步**：请告诉我您的 GitHub 邮箱，我帮您配置！
