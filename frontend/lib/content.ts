import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Article, Project, Note, Resource, Category, Tag } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readMdxFile(dir: string, slug: string) {
  const mdxPath = path.join(CONTENT_DIR, dir, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, dir, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw);
}

function getAllSlugs(dir: string): string[] {
  const fullDir = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

// ─── Articles ───────────────────────────────────────────────────────

function parseArticle(slug: string): Article | null {
  const parsed = readMdxFile("articles", slug);
  if (!parsed) return null;
  const { data, content } = parsed;
  const rt = readingTime(content);
  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || "",
    content,
    coverImage: data.coverImage || null,
    featured: data.featured || false,
    readingTime: data.readingTime || Math.max(1, rt.minutes),
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    category: data.category || null,
    tags: data.tags || [],
  };
}

export function getArticles(params?: { category?: string; tag?: string }): Article[] {
  const slugs = getAllSlugs("articles");
  let articles = slugs.map(parseArticle).filter((a): a is Article => a !== null);

  if (params?.category) {
    articles = articles.filter((a) => a.category === params.category);
  }
  if (params?.tag) {
    articles = articles.filter((a) => a.tags.includes(params.tag!));
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticle(slug: string): Article | null {
  return parseArticle(slug);
}

export function getFeaturedArticles(): Article[] {
  return getArticles().filter((a) => a.featured);
}

// ─── Projects ───────────────────────────────────────────────────────

export function getProjects(): Project[] {
  const slugs = getAllSlugs("projects");
  return slugs
    .map((slug) => {
      const parsed = readMdxFile("projects", slug);
      if (!parsed) return null;
      const { data, content } = parsed;
      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        content,
        coverImage: data.coverImage || null,
        demoUrl: data.demoUrl || null,
        repoUrl: data.repoUrl || null,
        status: data.status || "active",
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        tags: data.tags || [],
      } as Project;
    })
    .filter((p): p is Project => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ─── Notes ──────────────────────────────────────────────────────────

export function getNotes(): Note[] {
  const slugs = getAllSlugs("notes");
  return slugs
    .map((slug) => {
      const parsed = readMdxFile("notes", slug);
      if (!parsed) return null;
      const { data, content } = parsed;
      return {
        slug,
        title: data.title || slug,
        content,
        mood: data.mood || "idea",
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        tags: data.tags || [],
      } as Note;
    })
    .filter((n): n is Note => n !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ─── Resources ──────────────────────────────────────────────────────

export function getResources(): Resource[] {
  const slugs = getAllSlugs("resources");
  return slugs
    .map((slug) => {
      const parsed = readMdxFile("resources", slug);
      if (!parsed) return null;
      const { data, content } = parsed;
      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        category: data.category || "tools",
        items: data.items || [],
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        tags: data.tags || [],
        content,
      } as Resource;
    })
    .filter((r): r is Resource => r !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ─── Categories & Tags (derived from content) ──────────────────────

export function getCategories(): Category[] {
  const articles = getArticles();
  const seen = new Map<string, Category>();

  for (const article of articles) {
    if (article.category && !seen.has(article.category)) {
      seen.set(article.category, {
        name: article.category,
        slug: article.category,
        description: "",
      });
    }
  }

  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getTags(): Tag[] {
  const articles = getArticles();
  const projects = getProjects();
  const notes = getNotes();
  const resources = getResources();
  const seen = new Map<string, Tag>();

  for (const item of [...articles, ...projects, ...notes, ...resources]) {
    for (const tag of item.tags) {
      if (!seen.has(tag)) {
        seen.set(tag, { name: tag, slug: tag });
      }
    }
  }

  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
}

// ─── Utility ────────────────────────────────────────────────────────

/** Strip markdown formatting for plain text extraction */
export function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/!\[.*?\]\(.+?\)/g, "")
    .replace(/^>\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+[.)]\s+/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\n{2,}/g, " ")
    .trim();
}
