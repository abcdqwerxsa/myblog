"use client";

interface ArticleActionsProps {
  slug: string;
  title: string;
}

export function ArticleActions({ slug, title }: ArticleActionsProps) {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="sticky top-24 flex flex-col gap-3">
      <div className="font-[family-name:var(--font-headline)] text-[10px] uppercase tracking-[0.3em] text-outline mb-2">
        分享
      </div>
      <button
        onClick={handleShare}
        className="inner-milled bg-surface-container w-10 h-10 rounded-[var(--radius-xl)] flex items-center justify-center text-on-surface-variant hover:text-primary active:inset-deep active:scale-95 transition-all duration-100"
        title="分享文章"
      >
        <span className="material-symbols-outlined text-lg">share</span>
      </button>
      <button
        onClick={() => navigator.clipboard.writeText(url)}
        className="inner-milled bg-surface-container w-10 h-10 rounded-[var(--radius-xl)] flex items-center justify-center text-on-surface-variant hover:text-primary active:inset-deep active:scale-95 transition-all duration-100"
        title="复制链接"
      >
        <span className="material-symbols-outlined text-lg">link</span>
      </button>
    </div>
  );
}
