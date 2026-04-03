"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CopyButton } from "@/components/ui/CopyButton";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface ArticleContentProps {
  content: string;
}

function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const codeText = String(children).replace(/\n$/, "");
  const language = className?.replace("language-", "") || "";

  return (
    <div className="code-block-wrapper relative group">
      {language && (
        <span className="absolute top-2.5 left-4 text-[10px] font-[family-name:var(--font-label)] uppercase tracking-[0.15em] text-white/25 select-none">
          {language}
        </span>
      )}
      <CopyButton text={codeText} />
      <code className={className}>{children}</code>
    </div>
  );
}

const components = {
  pre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
    return <pre {...props}>{children}</pre>;
  },
  code({
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<"code"> & { node?: unknown }) {
    const isInline = !className && typeof children === "string" && !children.includes("\n");

    if (isInline) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <CodeBlock className={className}>
        {children}
      </CodeBlock>
    );
  },
};

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
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
