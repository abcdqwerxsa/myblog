import { getResources } from "@/lib/content";
import { ResourcesClient } from "./ResourcesClient";

export default async function ResourcesPage() {
  const resources = getResources();

  return (
    <section className="px-8 md:px-24 bg-surface-container-low min-h-screen">
      <div className="pt-24 pb-8">
        <div className="flex items-center space-x-3 mb-6">
          <span className="h-[2px] w-12 bg-primary" />
          <span className="font-[family-name:var(--font-headline)] text-xs uppercase tracking-[0.2em] font-bold text-primary">
            Reference
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-headline)] text-6xl md:text-8xl font-bold tracking-tighter text-on-surface leading-[0.9]">
          资源整理
        </h1>
      </div>

      {resources.length === 0 ? (
        <div className="pb-20 text-center py-20">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">
            library_books
          </span>
          <p className="font-[family-name:var(--font-headline)] text-xl text-on-surface-variant">
            暂无资源
          </p>
          <p className="font-[family-name:var(--font-body)] text-sm text-outline mt-2">
            请在 content/resources/ 目录中添加 .mdx 文件
          </p>
        </div>
      ) : (
        <div className="pb-20">
          <ResourcesClient resources={resources} />
        </div>
      )}
    </section>
  );
}
