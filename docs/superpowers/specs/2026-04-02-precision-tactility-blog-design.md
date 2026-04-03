# Precision Tactility Blog — 设计文档

> 日期: 2026-04-02
> 状态: Draft

## Context

构建一个个人技术博客，完整还原 ALUMINA LAB「Precision Tactility」工业精密美学设计系统。博客需支持技术文章、项目展示、短笔记、资源整理四种内容类型，使用 Strapi 作为嵌入式 CMS，Next.js App Router 作为前端框架。文章详情页集成 Pretext 文字引擎，提供编辑级排版效果和读者可调节的阅读体验面板。

---

## 1. 技术架构

### 选型

| 层级 | 技术 | 理由 |
|------|------|------|
| 前端 | Next.js 14+ App Router | SSG/ISR 性能最优，SEO 友好 |
| CMS | Strapi v5 (嵌入项目) | npm workspaces monorepo，开发体验好 |
| 样式 | Tailwind CSS + 自定义 tokens | 从 code.html 提取精确设计语言 |
| 代码高亮 | Shiki | SSG 预渲染，支持 VS Code 主题 |
| Markdown | @strapi/blocks-react-renderer | Strapi Rich Text Blocks 格式 |
| 文字引擎 | @chenglou/pretext (v0.0.4) | 文章详情页逐行排版，零 DOM 读取，读者可调节阅读体验 |

### 渲染策略

- **SSG + ISR**: 所有内容页构建时预渲染，`revalidate: 3600`（每小时增量更新）
- **On-demand revalidation**: Strapi webhook 触发 `revalidatePath()` 即时更新

### 数据流

```
Strapi CMS (localhost:1337)
  │ REST API (/api/articles?populate=*)
  ▼
Next.js App Router
  ├── SSG: 构建时拉取 → 静态 HTML
  ├── ISR: revalidate=3600 → 每小时增量更新
  └── On-demand: Strapi webhook → revalidatePath()
  ▼
CDN / Edge Cache → 用户
```

---

## 2. 项目结构

```
myblog/
├── frontend/                  # Next.js App Router
│   ├── app/
│   │   ├── layout.tsx         # 根布局（导航、字体、grain overlay）
│   │   ├── page.tsx           # 落地页（Hero + Bento Grid）
│   │   ├── blog/
│   │   │   ├── page.tsx       # 文章列表（分类筛选 + 搜索）
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # 文章详情（Pretext 文字引擎、TOC、代码高亮、Callout、阅读调节面板）
│   │   ├── projects/
│   │   │   └── page.tsx       # 项目展示
│   │   ├── notes/
│   │   │   └── page.tsx       # 短笔记/想法
│   │   ├── resources/
│   │   │   └── page.tsx       # 资源整理
│   │   └── about/
│   │       └── page.tsx       # 关于页
│   ├── components/
│   │   ├── ui/                # 基础组件（TactileButton, InnerMilledInput, StatusLens）
│   │   ├── layout/            # 布局组件（GlassNav, Footer, HeroSection）
│   │   └── content/           # 内容组件（ArticleCard, BentoGrid, TableOfContents, PretextRenderer, ReadingPanel）
│   ├── lib/
│   │   ├── strapi.ts          # Strapi REST API 客户端
│   │   ├── pretext.ts         # Pretext 文字引擎封装（prepare + layout + 渲染）
│   │   └── utils.ts           # 工具函数
│   ├── styles/
│   │   └── globals.css        # Tailwind + grain overlay + 自定义类
│   └── tailwind.config.ts     # 精密触感 design tokens
│
├── cms/                       # Strapi v5
│   ├── config/
│   ├── src/
│   │   ├── api/
│   │   │   ├── article/       # title, slug, content(Rich Text), excerpt, coverImage, featured
│   │   │   ├── project/       # title, slug, description, content, coverImage, demoUrl, repoUrl, status
│   │   │   ├── note/          # title, slug, content(Rich Text), mood
│   │   │   └── resource/      # title, slug, description, items(JSON), category
│   │   └── components/        # 共享字段（SEO meta, tags 等）
│   └── public/                # 媒体资源
│
├── package.json               # npm workspaces
└── .gitignore
```

### npm Workspaces

```json
{
  "workspaces": ["frontend", "cms"]
}
```

---

## 3. Strapi Content Types

| Content Type | 关键字段 | 关系 |
|-------------|---------|------|
| Article | title, slug, content (Rich Text Blocks), excerpt, coverImage, featured (boolean) | → Category, → Tag (m:n) |
| Project | title, slug, description, content, coverImage, demoUrl, repoUrl, status (enum: active/archived) | → Tag (m:n) |
| Note | title, slug, content (Rich Text Blocks), mood (enum) | → Tag (m:n) |
| Resource | title, slug, description, items (JSON), category (enum) | → Tag (m:n) |
| Category | name, slug, description | ← Article |
| Tag | name, slug | ← 所有类型 |

---

## 4. 设计系统：Precision Tactility

### 4.1 Tailwind 配置

从 `references/code.html` 精确提取的 design tokens：

**Colors** — 完整的 Material Design 3 灰色调色板：
- Surface 层级: `surface` (#f9f9fb) → `surface-container-lowest` (#ffffff) → `surface-container-low` (#f2f4f7) → `surface-container` (#ebeef2) → `surface-dim` (#d3dbe2) → `surface-container-highest` (#dde3e9)
- 文字: `on-surface` (#2d3338), `on-surface-variant` (#596065), `outline` (#757c81), `outline-variant` (#acb3b8)
- Primary: `primary` (#5e5e60), `primary-dim` (#525254)
- 功能: `error` (#9f403d)

**Font Families**:
- `headline`: Space Grotesk (标题、数字、标签)
- `body`: Inter (正文)
- `label`: Inter (小写标签)

**Border Radius** — 极小精密感：
- DEFAULT: 0.125rem (2px)
- lg: 0.25rem (4px)
- xl: 0.5rem (8px)
- full: 0.75rem (12px)
- **例外**: 按钮/芯片使用 8px (xl)

### 4.2 核心视觉规则

| 规则 | 实现 |
|------|------|
| **无线条分隔** | 用 `background-color` 层级差分隔区域，禁止 `1px solid` borders |
| **tactile-button** | `linear-gradient(to bottom, #5e5e60, #525254)` + `box-shadow: 0 4px 0 0 #3e3e40, 0 8px 15px rgba(0,0,0,0.1)` + `:active` translateY(2px) 缩进 |
| **inner-milled** | `box-shadow: inset 2px 2px 4px rgba(0,0,0,0.05), inset -1px -1px 2px rgba(255,255,255,0.8)` 凹陷感 |
| **glass-refraction** | `backdrop-filter: blur(20px)` + 顶部 0.5px 白色高光 + 左侧 0.5px 白色高光 |
| **Grain overlay** | 全局固定定位，3% 透明度纹理图案 |
| **幽灵边框** | 需要时用 `border-[0.5px] border-white/50` |
| **Status Lens** | 8px 圆点 + `box-shadow: 0 0 8px #5e5e60` + 白色高光叠加 |

### 4.3 暗色模式

Surface 层级反转，保持相同的层级关系：

```
surface:                    #f9f9fb → #111318
surface-container-lowest:   #ffffff → #1d2026
surface-container-low:      #f2f4f7 → #161920
surface-container:          #ebeef2 → #2a2d35
on-surface:                 #2d3338 → #e2e3e8
```

---

## 5. 页面设计

### 5.1 落地页 (`/`)

**导航栏** — 玻璃态：
- `bg-white/70 backdrop-blur-xl`
- 左侧: 品牌名 + 空间字体导航（当前页加粗 + 底线）
- 右侧: inner-milled 搜索框 + 汉堡菜单

**Hero 区** (`h-[716px]`)：
- 背景: `bg-surface-container-low` + 10% 透明度背景图 + grain overlay
- 左侧: Protocol label（线段 + 文字） → 大标题（Space Grotesk, text-6xl/8xl, tracking-tighter） → 描述 → 双按钮（tactile-button + inner-milled）
- 右侧: 编号式章节指示器（01/02/03 + 标签）

**Bento Grid** (`grid-cols-12, gap-8, auto-rows-[300px]`)：

| 卡片类型 | 列宽 | 行高 | 样式特征 |
|---------|------|------|---------|
| Featured | 8 cols | 2 rows | `bg-surface-container-lowest` + Status Lens + hover 图片覆盖 + 箭头链接 |
| Icon | 4 cols | 1 row | `bg-surface-container-high` + `shadow-inner` + Material Icon |
| Data | 4 cols | 1 row | `bg-surface-dim` + 数据行 + `border-outline-variant/20` 分隔 |
| CTA | 4 cols | 1 row | 整卡 tactile-button + 大号图标 + 标题 |
| Image | 8 cols | 1 row | 灰阶图片 + hover 变色 + 底部 glass-refraction 信息条 |

**Newsletter 区**：
- `bg-surface-container-low` 居中布局
- inner-milled 邮箱输入 + tactile-button 订阅按钮
- 底部小字协议声明

**Footer**：
- `bg-zinc-200` 双栏布局
- 品牌名 + 版权声明 | 导航链接 + Material Icons 社交图标

### 5.2 文章列表页 (`/blog`)

- 页面头部: Protocol label + 大标题（同 Hero 风格但更小）
- 筛选栏: tactile-button 当前分类 + inner-milled 其他分类标签 + inner-milled 搜索框
- 文章列表: 横向卡片行（封面缩略图 + 分类/标签 + 标题 + 摘要 + 日期/阅读时间）
- 分页: 简洁编号，tactile-button 当前页

### 5.3 文章详情页 (`/blog/[slug]`) — Pretext 编辑级排版

文章详情页是博客的核心阅读体验页面，使用 Pretext 文字引擎替代 CSS text layout 实现编辑级排版效果。

#### 技术原理

Pretext 是一个零 DOM 读取的文字测量和排版引擎。核心工作流：

1. `prepare(text, font)` — 一次性处理：分字、测量、缓存（~0.04ms/段）
2. `layoutWithLines(prepared, maxWidth, lineHeight)` — 纯算术计算每行内容（~0.0002ms/段）
3. 渲染：每行输出为一个 `position: absolute` 的 `<div>`，由 Pretext 计算 `left/top/width`

与 CSS text layout 相比：
- 重排耗时 0.2ms vs 浏览器 30ms（150x 提升）
- 零 DOM 读取，不触发 reflow
- 支持文字绕流（任意形状障碍物）
- 支持多栏、drop cap、不等宽行

#### 页面布局

```
┌─────────────────────────────────────────────────────┐
│ 玻璃态导航栏                                          │
├──────────┬──────────────────────────┬───────────────┤
│ 左栏      │ 中栏：Pretext 渲染区       │ 右栏           │
│ 200px    │ 自适应宽度                  │ 48px          │
│ sticky   │                          │               │
│          │ ┌─ 文章头部 ─────────────┐│   ↗ 分享      │
│ 目录      │ │ Protocol label        ││   ♡ 收藏      │
│ · 概述 ●  │ │ Space Grotesk 大标题    ││   ◎ 评论      │
│ · 模型    │ │ 分类标签 + 日期 + 阅读时间││               │
│ · 实践    │ └───────────────────────┘│               │
│ · 总结    │                          │               │
│          │ ┌─ 排版调节面板 ─────────┐│               │
│          │ │ Aa [-] 字号 [+]        ││               │
│          │ │ ≡  行高  ⊟ 栏数        ││               │
│          │ └───────────────────────┘│               │
│          │                          │               │
│          │  T (drop cap)            │               │
│          │  he web renders text...  │               │
│          │  through a pipeline...   │               │
│          │                          │               │
│          │  ┌─ 代码块 (Shiki) ────┐ │               │
│          │  │ interface Model { } │ │               │
│          │  └────────────────────┘ │               │
│          │                          │               │
│          │  ┌─ Callout ──────────┐  │               │
│          │  │ ▎ 关键洞察         │  │               │
│          │  │ 最终一致性不等于弱  │  │               │
│          │  └────────────────────┘  │               │
│          │                          │               │
│          │  Giscus 评论区            │               │
└──────────┴──────────────────────────┴───────────────┘
```

#### PretextRenderer 组件

```typescript
// frontend/components/content/PretextRenderer.tsx
'use client';

import { prepare, layoutWithLines } from '@chenglou/pretext';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

interface ReadingConfig {
  fontSize: number;      // 14-24px, 默认 18
  lineHeight: number;    // 1.4-2.2, 默认 1.7
  maxWidth: number;      // 500-900px, 默认 680
  fontFamily: string;    // Inter / 'Iowan Old Style' / serif
  columnCount: number;   // 1-3, 默认 1
}

export function PretextRenderer({ content }: { content: string }) {
  const [config, setConfig] = useState<ReadingConfig>({
    fontSize: 18, lineHeight: 1.7, maxWidth: 680,
    fontFamily: 'Inter', columnCount: 1,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // prepare 是昂贵的一次性操作，缓存
  const prepared = useMemo(
    () => prepare(content, `${config.fontSize}px ${config.fontFamily}`),
    [content, config.fontSize, config.fontFamily]
  );

  // layout 是便宜的重复操作
  const lines = useMemo(
    () => layoutWithLines(
      prepared,
      config.maxWidth,
      config.fontSize * config.lineHeight
    ),
    [prepared, config.maxWidth, config.lineHeight]
  );

  // 渲染每行为绝对定位 div
  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {lines.lines.map((line, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: line.start,
            top: i * (config.fontSize * config.lineHeight),
            font: `${config.fontSize}px ${config.fontFamily}`,
            lineHeight: `${config.lineHeight}`,
            whiteSpace: 'pre',
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}
```

#### 阅读调节面板 (ReadingPanel)

浮在文章内容上方的紧凑控制条，保持精密触感设计：

| 控件 | 样式 | 范围 |
|------|------|------|
| 字号调节 | inner-milled `[-]` `17` `[+]` 按钮 | 14-24px，步进 1 |
| 行高调节 | inner-milled 选择器 | 1.4 / 1.5 / 1.6 / 1.7 / 1.8 / 2.0 |
| 栏数切换 | inner-milled `1` `2` `3` 按钮组 | 1-3 栏 |
| 字体选择 | inner-milled 下拉 | Inter / 'Iowan Old Style' / serif |
| 宽度 | inner-milled 滑块 | 500-900px |

所有调节通过 Pretext 的 `layout()` 路径即时生效（0.2ms 重排），零卡顿。
用户偏好持久化到 `localStorage`。

#### 特殊排版元素

- **Drop Cap**: 文章首段首字母放大至 4 行高度，使用 Space Grotesk 700 weight
- **代码块**: 不经过 Pretext，使用 Shiki 预渲染后作为块级元素插入，Pretext 文字在代码块处自动断行
- **Callout**: 块级容器，Pretext 文字绕流通过 `layoutNextLine()` 变宽行实现
- **图片**: 同理，Pretext 文字围绕图片自动流排
- **Heading**: 不经过 Pretext，使用标准 Space Grotesk 标题组件，作为分断点将文章分段

### 5.4 其他页面

- `/projects`: Bento Grid 布局展示项目卡片，含 demo/repo 链接
- `/notes`: 紧凑列表，类似 Twitter 卡片风格，保持精密触感
- `/resources`: Tab 分类 + 链接列表
- `/about`: 静态内容，Hero 风格头部 + 双栏内容

---

## 6. API 封装

```typescript
// frontend/lib/strapi.ts
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

async function fetchAPI(path: string) {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: { Authorization: `Bearer ${process.env.STRAPI_TOKEN}` },
    next: { revalidate: 3600 },
  });
  return res.json();
}

export async function getArticles(params?: { category?: string; tag?: string }) { ... }
export async function getArticle(slug: string) { ... }
export async function getProjects() { ... }
export async function getNotes() { ... }
export async function getResources() { ... }
```

---

## 7. 功能清单

| 功能 | 实现方式 |
|------|---------|
| 分类筛选 | URL query params + Strapi filters |
| 搜索 | 前端 fuzzy search (fuse.js) 或 Strapi全文搜索 |
| 代码高亮 | Shiki，构建时预渲染 |
| TOC 目录 | 从 Strapi Blocks heading 节点提取，sticky 侧栏 |
| 暗色模式 | `dark:` Tailwind 变体 + 系统偏好检测 + 手动切换 |
| 社交互动 | 分享链接 + Giscus (GitHub Discussions 评论) |
| SEO | Next.js Metadata API + Strapi SEO component fields |
| RSS | `feed` 包生成 XML |
| 响应式 | Mobile-first，断点 MD(768px) / LG(1024px) |
| **Pretext 编辑级排版** | `@chenglou/pretext` 文字引擎，文章详情页逐行渲染 |
| **读者阅读调节面板** | 字号/行高/栏数/字体/宽度可调，偏好 localStorage 持久化 |
| **Drop Cap** | 文章首字母 4 行高度放大，Space Grotesk 700 |
| **文字绕流** | Pretext `layoutNextLine()` 实现图片/Callout 旁文字流排 |

---

## 8. 验证计划

1. **启动**: `npm install` → `npm run dev`（同时启动 Next.js + Strapi）
2. **CMS**: 访问 `localhost:1337/admin` 创建初始内容
3. **落地页**: 访问 `localhost:3000` 确认 Hero + Bento Grid 渲染正确
4. **文章列表**: `/blog` 确认分类筛选和搜索功能
5. **文章详情**: `/blog/test-article` 确认 TOC、代码高亮、Callout 渲染
6. **Pretext 排版**: 确认逐行渲染正确、Drop Cap 显示、文字绕流图片/Callout
7. **阅读调节面板**: 调节字号/行高/栏数/字体，确认即时重排零卡顿（目标 <1ms）
8. **阅读偏好持久化**: 刷新页面后确认 localStorage 恢复上次设置
9. **暗色模式**: 切换系统主题确认色板反转
10. **响应式**: 缩小浏览器窗口确认移动端适配
11. **ISR**: 在 Strapi 修改内容后确认 Next.js 自动更新
