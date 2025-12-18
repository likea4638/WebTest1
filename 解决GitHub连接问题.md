# 🔧 解决 GitHub 连接问题

## 错误原因
`Failed to connect to github.com port 443` 表示无法连接到 GitHub 服务器，常见原因：
- 网络连接问题
- 防火墙阻止
- 需要代理（在中国大陆访问 GitHub 可能需要）

## 解决方案

### 方案一：使用 SSH 代替 HTTPS（推荐）

SSH 连接通常更稳定，即使 HTTPS 被阻止也能工作。

#### 1. 检查是否已有 SSH 密钥
```bash
ls ~/.ssh
```
如果看到 `id_rsa` 和 `id_rsa.pub`，说明已有密钥。

#### 2. 如果没有，生成 SSH 密钥
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
按回车使用默认设置（直接按回车，不要设置密码）

#### 3. 复制公钥
```bash
cat ~/.ssh/id_rsa.pub
```
复制输出的内容

#### 4. 添加到 GitHub
- 访问：https://github.com/settings/keys
- 点击 "New SSH key"
- 粘贴刚才复制的内容
- 保存

#### 5. 更改远程仓库地址为 SSH
```bash
# 查看当前远程地址
git remote -v

# 改为 SSH 地址
git remote set-url origin git@github.com:likea4638/WebTest1.git

# 验证
git remote -v
```

#### 6. 测试连接
```bash
ssh -T git@github.com
```
如果看到 "Hi likea4638! You've successfully authenticated..." 说明成功！

#### 7. 现在可以推送了
```bash
git push origin main
```

---

### 方案二：配置代理（如果你有代理）

如果你有可用的代理（VPN），可以配置 Git 使用代理：

```bash
# 设置 HTTP 代理（替换为你的代理地址和端口）
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 如果使用 SOCKS5 代理
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080

# 取消代理（如果不需要了）
git config --global --unset http.proxy
git config --global --unset https.proxy
```

---

### 方案三：使用 GitHub Desktop（图形界面，最简单）

1. **下载 GitHub Desktop**
   - 访问：https://desktop.github.com/
   - 下载并安装

2. **登录 GitHub 账号**

3. **打开项目**
   - File → Add Local Repository
   - 选择 `C:\Users\LiKe\Desktop\WebTest1`

4. **提交和推送**
   - 在界面上点击 "Commit to main"
   - 然后点击 "Push origin"

GitHub Desktop 通常能自动处理网络问题。

---

### 方案四：检查网络和防火墙

1. **测试网络连接**
   ```bash
   ping github.com
   ```

2. **检查防火墙**
   - Windows 防火墙可能阻止了连接
   - 临时关闭防火墙测试

3. **使用手机热点**
   - 如果电脑网络有问题，尝试使用手机热点

---

### 方案五：使用 GitHub 网页版上传

如果命令行都不行，可以直接在网页上传：

1. **访问 GitHub 仓库**
   - https://github.com/likea4638/WebTest1

2. **上传文件**
   - 点击 "Add file" → "Upload files"
   - 拖拽所有文件上传
   - 提交更改

3. **触发部署**
   - 上传文件后，GitHub Actions 会自动运行

---

## 🎯 推荐顺序

1. **首选**：使用 SSH（方案一）- 最稳定
2. **次选**：使用 GitHub Desktop（方案三）- 最简单
3. **备选**：配置代理（方案二）- 如果有代理
4. **最后**：网页上传（方案五）- 如果都不行

---

## 💡 快速检查

执行以下命令检查当前状态：

```bash
# 检查远程地址
git remote -v

# 检查网络连接
ping github.com

# 检查 Git 配置
git config --list | findstr proxy
```

