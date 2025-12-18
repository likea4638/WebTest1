# Web 便当盒

一个精美的每日资讯聚合网站，展示 GitHub 热门项目和 Hacker News AI 相关文章。

## 📁 项目结构

```
web便当盒/
├── src/
│   ├── components/        # React 组件
│   │   ├── Card.jsx       # 卡片组件
│   │   ├── GitHubTrending.jsx  # GitHub 热榜组件
│   │   └── HackerNewsAI.jsx    # Hacker News AI 组件
│   ├── services/
│   │   └── api.js         # API 服务
│   ├── data/
│   │   └── mockData.js    # 模拟数据
│   ├── App.jsx            # 主应用组件
│   ├── main.jsx           # 入口文件
│   └── index.css          # 全局样式
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── vite.config.js         # Vite 配置（已配置 GitHub Pages base 路径）
├── tailwind.config.js     # Tailwind CSS 配置
└── postcss.config.js      # PostCSS 配置
```

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173

## 📦 构建生产版本

```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

构建文件位于 `dist` 目录。

## 🌐 部署

项目已配置 GitHub Actions 自动部署到 GitHub Pages。

**访问地址**：https://likea4638.github.io/WebTest1/

## 🔧 技术栈

- React 18
- Vite 5
- Tailwind CSS
- GitHub API
- Hacker News API

## 📝 功能特性

- ✅ GitHub 今日热榜（自动刷新）
- ✅ Hacker News AI 板块（自动刷新）
- ✅ 响应式设计
- ✅ 深色主题
- ✅ API 失败时自动降级到示例数据

