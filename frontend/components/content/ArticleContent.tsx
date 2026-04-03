"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  if (!content) {
    return (
      <div className="text-center py-20 text-on-surface-variant font-[family-name:var(--font-body)]">
        暂无文章内容
      </div>
    );
  }

  return (
    <div className="prose-custom">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
