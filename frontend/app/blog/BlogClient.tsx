"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Article, Category } from "@/lib/types";

export function BlogClient({
  articles,
  categories,
}: {
  articles: Article[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const activeTag = searchParams.get("tag") || "";

  const filtered = articles.filter((a) => {
    if (activeCategory && a.category !== activeCategory) return false;
    if (activeTag && !a.tags.includes(activeTag)) return false;
    return true;
  });

  return (
    <>
      {/* Page Header */}
      <section className="px-8 md:px-24 bg-surface-container-low">
        <div className="pt-24 pb-8">
          <div className="flex items-center space-x-3 mb-6">
            <span className="h-[2px] w-12 bg-primary" />
            <span className="font-[family-name:var(--font-headline)] text-xs uppercase tracking-[0.2em] font-bold text-primary">
              Archive
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-headline)] text-6xl md:text-8xl font-bold tracking-tighter text-on-surface leading-[0.9]">
            技术文章
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-4 pb-8 flex-wrap items-center">
          <Link
            href="/blog"
            className={`px-5 py-2 rounded-[var(--radius-xl)] font-[family-name:var(--font-headline)] text-sm transition-all ${
              !activeCategory
                ? "tactile-button text-on-primary"
                : "inner-milled bg-surface-container text-on-surface hover:bg-surface-container-high"
            }`}
          >
            全部
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog?category=${cat.slug}`}
              className={`px-5 py-2 rounded-[var(--radius-xl)] font-[family-name:var(--font-headline)] text-sm transition-all ${
                activeCategory === cat.slug
                  ? "tactile-button text-on-primary"
                  : "inner-milled bg-surface-container text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Article List */}
      <section className="p-8 md:p-20 bg-surface">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">
              article
            </span>
            <p className="font-[family-name:var(--font-headline)] text-xl text-on-surface-variant">
              暂无文章
            </p>
            <p className="font-[family-name:var(--font-body)] text-sm text-outline mt-2">
              请在 content/articles/ 目录中添加 .mdx 文件
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="block bg-surface-container-lowest rounded-[var(--radius-xl)] p-8 shadow-tactile ghost-border hover:shadow-[0_4px_4px_rgba(45,51,56,0.1),0_20px_20px_rgba(45,51,56,0.05),0_80px_80px_rgba(45,51,56,0.02)] transition-shadow"
              >
                <div className="flex gap-8 items-center">
                  {article.coverImage && (
                    <div className="w-40 h-28 bg-surface-container rounded-[var(--radius-xl)] flex-shrink-0 overflow-hidden">
                      <img
                        src={article.coverImage}
                        alt=""
                        className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="font-[family-name:var(--font-headline)] text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-2">
                      {article.category || "未分类"}
                    </div>
                    <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold tracking-tight text-on-surface mb-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="font-[family-name:var(--font-body)] text-sm text-on-surface-variant line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0 hidden md:block">
                    <div className="font-[family-name:var(--font-body)] text-xs text-outline">
                      {new Date(article.date).toLocaleDateString("zh-CN")}
                    </div>
                    <div className="font-[family-name:var(--font-body)] text-xs text-outline-variant mt-1">
                      {article.readingTime} min
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
