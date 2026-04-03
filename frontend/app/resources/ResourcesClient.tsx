"use client";

import { useState } from "react";
import type { Resource } from "@/lib/types";

export function ResourcesClient({ resources }: { resources: Resource[] }) {
  const categories = Array.from(
    new Set(resources.map((r) => r.category).filter(Boolean))
  );
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0] || ""
  );

  const filtered = activeCategory
    ? resources.filter((r) => r.category === activeCategory)
    : resources;

  return (
    <>
      {/* Category Tabs */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-[var(--radius-xl)] font-[family-name:var(--font-headline)] text-sm transition-all ${
              activeCategory === cat
                ? "tactile-button text-on-primary"
                : "inner-milled bg-surface-container text-on-surface hover:bg-surface-container-high"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource List */}
      <div className="space-y-6 max-w-3xl">
        {filtered.map((resource) => (
          <div
            key={resource.slug}
            className="bg-surface-container-lowest rounded-[var(--radius-xl)] p-6 shadow-tactile ghost-border"
          >
            <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold tracking-tight text-on-surface mb-2">
              {resource.title}
            </h3>
            {resource.description && (
              <p className="font-[family-name:var(--font-body)] text-sm text-on-surface-variant mb-4">
                {resource.description}
              </p>
            )}
            {resource.items && (
              <ul className="space-y-2">
                {resource.items.map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 group"
                      >
                        <span className="material-symbols-outlined text-sm text-primary group-hover:translate-x-0.5 transition-transform">
                          arrow_forward
                        </span>
                        <span className="font-[family-name:var(--font-body)] text-sm text-primary group-hover:underline">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="font-[family-name:var(--font-body)] text-xs text-outline ml-2">
                            {item.description}
                          </span>
                        )}
                      </a>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
