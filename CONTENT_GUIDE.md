# TECH LAB 博客 — 内容写作指南

## 项目结构

```
myblog/
├── .github/workflows/deploy.yml   # GitHub Actions 自动部署（推送到 main 时触发）
├── .gitignore
├── package.json                    # 根级脚本（dev / build）
│
└── frontend/                       # Next.js 16 项目
    ├── content/                    # ⭐ 所有内容都在这里（纯 Markdown 文件）
    │   ├── articles/               # 博客文章
    │   ├── projects/               # 项目展示
    │   ├── notes/                  # 短笔记
    │   └── resources/              # 资源收集
    │
    ├── public/images/              # 图片资源（封面图、文章内图片）
    │   ├── articles/               # 文章封面图
    │   ├── projects/               # 项目封面图
    │   └── notes/                  # 笔记配图
    │
    ├── app/                        # 页面路由（一般不需要改）
    │   ├── page.tsx                # 首页
    │   ├── layout.tsx              # 全局布局（导航 + 页脚）
    │   ├── globals.css             # 设计系统变量
    │   ├── blog/                   # /blog 文章列表
    │   ├── blog/[slug]/            # /blog/xxx 文章详情
    │   ├── projects/               # /projects 项目列表
    │   ├── notes/                  # /notes 笔记列表
    │   └── resources/              # /resources 资源列表
    │
    ├── components/                 # UI 组件
    ├── lib/
    │   ├── content.ts              # ⭐ 内容读取层（从 content/ 读 .mdx 文件）
    │   ├── types.ts                # TypeScript 类型定义
    │   └── pretext.ts              # 排版引擎
    │
    ├── next.config.ts              # Next.js 配置（静态导出）
    └── package.json                # 前端依赖
```

---

## 如何发布内容

### 发布一篇新文章

在 `frontend/content/articles/` 下新建 `.mdx` 文件：

```bash
frontend/content/articles/my-new-article.mdx
```

文件内容：

```yaml
---
title: "文章标题"
date: "2026-04-03"
excerpt: "一句话摘要，显示在文章列表中"
featured: true                   # 可选，true 会出现在首页推荐
category: "frontend"             # 分类 slug（见下方分类说明）
tags: ["react", "performance"]   # 标签数组
coverImage: "/images/articles/my-cover.jpg"  # 可选，封面图
readingTime: 8                   # 可选，不填会自动计算
---

## 正文标题

正文用标准 Markdown 写...

### 支持的语法

- **粗体**、*斜体*、`行内代码`
- 代码块（带语法高亮）
- 表格（GFM 语法）
- 引用块
- 有序/无序列表
- 图片 `![alt](/images/articles/xxx.png)`
- 分割线 `---`
```

### 发布一个新项目

在 `frontend/content/projects/` 下新建 `.mdx` 文件：

```yaml
---
title: "项目名称"
date: "2026-04-03"
description: "项目简介"
coverImage: "/images/projects/cover.jpg"   # 可选
demoUrl: "https://demo.example.com"        # 可选
repoUrl: "https://github.com/user/repo"    # 可选
status: "active"    # active | wip | archived
tags: ["nextjs", "tools"]
---

项目详细说明（Markdown）...
```

### 发布一条笔记

在 `frontend/content/notes/` 下新建 `.mdx` 文件：

```yaml
---
title: "笔记标题"
date: "2026-04-03"
mood: "insight"    # idea | insight | question | observation
tags: ["wasm"]
---

笔记内容（Markdown）...
```

mood 对应的图标：
- `idea` → 💡
- `insight` → 🤔
- `question` → ❓
- `observation` → 👀

### 发布一个资源集合

在 `frontend/content/resources/` 下新建 `.mdx` 文件：

```yaml
---
title: "资源标题"
date: "2026-04-03"
description: "资源描述"
category: "tools"   # tools | books | courses | references
tags: ["frontend"]
items:
  - label: "工具名"
    url: "https://example.com"
    description: "简短说明"      # 可选
  - label: "另一个工具"
    url: "https://example2.com"
---

补充说明（可选）...
```

---

## 标签和分类怎么工作

### 分类（category）

分类**只用于文章**（articles）。系统会自动从所有文章的 frontmatter 中提取不重复的 category 值，生成分类列表。

**修改/新增分类**：只需在文章的 `category` 字段写上新的值即可。

```
# 现有文章用 "frontend"
category: "frontend"

# 想加新分类？直接写新的值
category: "devops"
```

分类会在 `/blog` 页面顶部的筛选栏自动出现。不需要任何额外配置。

### 标签（tags）

标签**跨所有内容类型共享**（文章、项目、笔记、资源）。系统自动扫描所有 .mdx 文件的 `tags` 字段，汇总去重。

**修改标签**：直接改 frontmatter 里的 `tags` 数组。

```
tags: ["react", "typescript"]

# 添加新标签？直接加上去
tags: ["react", "typescript", "nextjs"]
```

### 关键点

- **分类和标签不需要提前注册**，写了就生效
- **改分类名**：需要手动修改所有用了该分类的文章 frontmatter
- **改标签名**：同上，需要手动批量替换
- **文件名 = URL slug**：`distributed-consistency.mdx` → 访问路径 `/blog/distributed-consistency`

---

## 图片

把图片放到 `frontend/public/images/` 下对应子目录，然后在 Markdown 中引用：

```markdown
![说明文字](/images/articles/my-diagram.png)
```

封面图在 frontmatter 中指定路径：

```yaml
coverImage: "/images/articles/my-cover.jpg"
```

---

## 发布流程

```bash
# 1. 写好 .mdx 文件

# 2. 本地预览（可选）
cd frontend && npm run dev
# 浏览器打开 http://localhost:3000

# 3. 提交并推送
git add .
git commit -m "新文章：xxx"
git push origin main

# 4. GitHub Actions 自动构建部署到 blog.nilpo.app
```

推送后大约 1-2 分钟生效。可以在 GitHub 仓库的 Actions 标签页查看构建进度。
