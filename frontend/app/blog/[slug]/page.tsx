import { getArticle, getArticles } from "@/lib/content";
import { ArticleContent } from "@/components/content/ArticleContent";
import { TableOfContents } from "@/components/content/TableOfContents";
import { ArticleActions } from "./ArticleActions";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return { title: "文章未找到" };

  return {
    title: `${article.title} | TECH LAB`,
    description: article.excerpt || "",
  };
}

export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">
            article
          </span>
          <h1 className="font-[family-name:var(--font-headline)] text-2xl text-on-surface-variant">
            文章未找到
          </h1>
        </div>
      </div>
    );
  }

  const headings = extractHeadings(article.content);

  return (
    <>
      {/* Article Header */}
      <section className="px-8 md:px-24 bg-surface-container-low">
        <div className="pt-24 pb-12 max-w-[960px] mx-auto">
          {article.category && (
            <div className="flex items-center space-x-3 mb-6">
              <span className="h-[2px] w-8 bg-primary" />
              <span className="font-[family-name:var(--font-headline)] text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
                {article.category}
              </span>
            </div>
          )}

          <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-6xl font-bold tracking-tighter text-on-surface leading-[0.95] mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-on-surface-variant">
            <span className="font-[family-name:var(--font-body)]">
              {new Date(article.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {article.readingTime && (
              <span className="font-[family-name:var(--font-body)]">
                {article.readingTime} 分钟阅读
              </span>
            )}
          </div>

          {article.tags.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inner-milled bg-surface-container px-3 py-1 rounded-[var(--radius-xl)] font-[family-name:var(--font-headline)] text-[10px] uppercase tracking-wider text-on-surface-variant"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Body */}
      <section className="px-8 md:px-24 bg-surface">
        <div className="py-12 max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-[180px_1fr_160px] gap-16">
          {/* Left: TOC */}
          <div className="hidden xl:block">
            <TableOfContents items={headings} />
          </div>

          {/* Center: Article content */}
          <div className="min-w-0 max-w-[720px]">
            <ArticleContent content={article.content} />
          </div>

          {/* Right: Social actions */}
          <div className="hidden xl:block">
            <ArticleActions slug={slug} title={article.title} />
          </div>
        </div>
      </section>
    </>
  );
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u4e00-\u9fff-]/g, "");
    headings.push({ id, text, level });
  }

  return headings;
}
