"use client";

import { useState, useCallback } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2.5 right-2.5 p-1.5 rounded-[var(--radius-DEFAULT,2px)] transition-all duration-200 group"
      aria-label="复制代码"
    >
      {copied ? (
        <span className="material-symbols-outlined text-base text-green-400">
          check
        </span>
      ) : (
        <span className="material-symbols-outlined text-base text-white/30 group-hover:text-white/70">
          content_copy
        </span>
      )}
    </button>
  );
}
