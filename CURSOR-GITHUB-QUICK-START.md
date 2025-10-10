# Cursor + GitHub 快速上手指南

## 🚀 立即开始（5分钟设置）

### 步骤 1：在 GitHub 创建仓库

1. **访问 GitHub.com** 并登录
2. **点击右上角的 "+" → "New repository"**
3. **填写仓库信息**：
   ```
   Repository name: hank-handbook-website
   Description: 汉克运营知识库网站 - WordPress主题和静态网站
   Visibility: Public 或 Private（根据您的需要）
   ```
4. **不要勾选任何初始化选项**
5. **点击 "Create repository"**

### 步骤 2：在 Cursor 中连接 GitHub

#### 方法 A：使用 Cursor 内置 Git（最简单）

1. **打开 Cursor 的 Source Control 面板**
   - 点击左侧的 Git 图标（分支图标）
   - 或按快捷键：`Cmd+Shift+G`（Mac）/ `Ctrl+Shift+G`（Windows）

2. **查看当前状态**
   - 您会看到所有修改的文件
   - 绿色 "U" = 新文件
   - 黄色 "M" = 修改的文件

3. **提交代码**
   - 点击文件旁的 "+" 号暂存文件
   - 在消息框中输入：`feat: 汉克运营知识库主题完成`
   - 按 `Cmd+Enter` 提交

4. **推送到 GitHub**
   - 按 `Cmd+Shift+P` 打开命令面板
   - 输入 "Git: Push" 并回车
   - 首次推送会要求输入 GitHub 仓库 URL

#### 方法 B：使用终端命令

在 Cursor 中按 `Ctrl+`` 打开终端，然后运行：

```bash
# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/hank-handbook-website.git

# 推送到 GitHub
git push -u origin main
```

### 步骤 3：验证同步

1. **刷新 GitHub 页面**
2. **查看您的仓库**
3. **确认所有文件都已上传**

## 🎯 日常使用流程

### 修改代码后同步到 GitHub

#### 在 Cursor 中：

1. **修改代码**
2. **打开 Source Control 面板** (`Cmd+Shift+G`)
3. **暂存修改**：点击 "+" 号
4. **写提交信息**：如 `fix: 修复样式问题`
5. **提交**：按 `Cmd+Enter`
6. **推送**：按 `Cmd+Shift+P` → 输入 "Git: Push"

#### 或者使用快捷键：

- `Cmd+Shift+G` → 打开 Git 面板
- `Cmd+Enter` → 提交
- `Cmd+Shift+P` → 打开命令面板
- 输入 "push" → 回车

### 从 GitHub 获取最新代码

```bash
# 在 Cursor 终端中运行
git pull
```

或在 Cursor 中：
- `Cmd+Shift+P` → 输入 "Git: Pull"

## 🔧 高级功能

### 1. 在 Cursor 中查看 Git 历史

1. **打开命令面板** (`Cmd+Shift+P`)
2. **输入 "Git: View History"**
3. **选择文件查看修改历史**

### 2. 分支管理

1. **左下角点击当前分支名**
2. **选择 "Create new branch"**
3. **输入分支名**：如 `feature/new-design`
4. **开始开发新功能**

### 3. 解决合并冲突

1. **Cursor 会自动检测冲突**
2. **在编辑器中查看冲突标记**
3. **手动解决冲突**
4. **暂存解决的文件**
5. **提交合并**

### 4. 与 GitHub Issues 集成

1. **在 GitHub 创建 Issue**
2. **在提交信息中引用**：`git commit -m "fix: 修复登录问题 #123"`
3. **GitHub 会自动关联 Issue**

## 📱 移动端查看

### GitHub Mobile App

1. **下载 GitHub Mobile**
2. **登录您的账户**
3. **查看代码、Issues、Pull Requests**
4. **随时随地监控项目状态**

### GitHub.dev（在线编辑）

1. **访问**：https://github.dev/YOUR_USERNAME/hank-handbook-website
2. **在线编辑代码**
3. **直接提交到 GitHub**

## 🎨 实用技巧

### 1. 提交信息模板

在 Cursor 中设置常用的提交信息：

```
feat: 新功能
fix: 修复问题
docs: 文档更新
style: 样式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

### 2. 快速查看差异

- **点击文件名**：查看具体修改
- **悬停在行号上**：查看行级修改
- **使用 GitLens 扩展**（如果安装了）

### 3. 自动保存和提交

设置 Cursor 自动保存：
- `File` → `Preferences` → `Settings`
- 搜索 "auto save"
- 设置为 "afterDelay"

### 4. 多设备同步

1. **设备 A**：开发并推送
2. **设备 B**：拉取最新代码
3. **继续开发**：无缝切换

## 🚨 常见问题解决

### 问题 1：推送被拒绝

**解决方案**：
```bash
git pull --rebase
git push
```

### 问题 2：找不到远程仓库

**解决方案**：
```bash
git remote -v  # 查看远程仓库
git remote add origin https://github.com/YOUR_USERNAME/hank-handbook-website.git
```

### 问题 3：提交信息错误

**解决方案**：
```bash
git commit --amend -m "正确的提交信息"
```

### 问题 4：文件被意外删除

**解决方案**：
```bash
git checkout HEAD -- filename.php  # 恢复文件
```

## 🎉 最佳实践

### 1. 提交频率
- **小步快跑**：频繁提交小修改
- **功能完整**：每个提交包含完整的功能
- **描述清晰**：提交信息要清楚说明修改内容

### 2. 分支策略
- **main 分支**：稳定版本
- **feature 分支**：新功能开发
- **hotfix 分支**：紧急修复

### 3. 协作流程
1. **创建功能分支**
2. **开发新功能**
3. **提交代码**
4. **创建 Pull Request**
5. **代码审查**
6. **合并到主分支**

---

## 🎯 总结

通过 Cursor + GitHub 的组合，您可以：

✅ **实时同步**：代码修改立即保存到云端  
✅ **版本控制**：完整的修改历史和回滚能力  
✅ **多设备协作**：在任何地方继续开发  
✅ **团队协作**：多人同时开发  
✅ **备份安全**：代码永不丢失  

**现在就开始您的 GitHub 协作之旅吧！** 🚀

---

### 📞 需要帮助？

- 查看详细指南：`GITHUB-COLLABORATION-GUIDE.md`
- GitHub 官方文档：https://docs.github.com/
- Cursor 官方文档：https://cursor.sh/docs
