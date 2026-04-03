"use client";

import dynamic from "next/dynamic";

const PretextRenderer = dynamic(
  () =>
    import("@/components/content/PretextRenderer").then(
      (m) => m.PretextRenderer
    ),
  { ssr: false }
);

export function ClientPretext({ content }: { content: string }) {
  return <PretextRenderer content={content} />;
}
