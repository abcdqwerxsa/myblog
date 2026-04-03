import Link from "next/link";
import { StatusLens } from "@/components/ui/StatusLens";

export function BentoGrid() {
  return (
    <section className="p-8 md:p-20 bg-surface">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[300px]">
        {/* Featured Card — 8 cols, 2 rows */}
        <div className="md:col-span-8 md:row-span-2 bg-surface-container-lowest rounded-[var(--radius-xl)] p-10 flex flex-col justify-between shadow-tactile ghost-border relative group overflow-hidden">
          {/* Top label + status lens */}
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <span className="font-[family-name:var(--font-headline)] text-[10px] uppercase tracking-[0.3em] font-black text-primary/40">
                深度分析
              </span>
              <StatusLens />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-md">
            <h2 className="font-[family-name:var(--font-headline)] text-4xl font-bold tracking-tighter mb-4">
              分布式系统中最终一致性：理论与实践
            </h2>
            <p className="font-[family-name:var(--font-body)] text-on-surface-variant mb-6 text-sm">
              深入探讨 CAP
              定理约束下的一致性模型选择，结合真实案例分析工程取舍。
            </p>
            <Link
              href="/blog/distributed-consistency"
              className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary hover:translate-x-2 transition-transform"
            >
              <span>阅读全文</span>
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* Icon Card — 4 cols */}
        <div className="md:col-span-4 bg-surface-container-high rounded-[var(--radius-xl)] p-8 flex flex-col justify-between shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
          <div className="w-12 h-12 bg-surface-container-lowest rounded-[var(--radius-DEFAULT)] flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-primary">
              bolt
            </span>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold tracking-tight mb-2">
              性能调优笔记
            </h3>
            <p className="font-[family-name:var(--font-body)] text-xs text-on-surface-variant leading-relaxed">
              WebAssembly、V8 引擎与内存管理的深度剖析。
            </p>
          </div>
        </div>

        {/* Data Card — 4 cols */}
        <div className="md:col-span-4 bg-surface-dim rounded-[var(--radius-xl)] p-8 flex flex-col justify-center ghost-border">
          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
              <span className="font-[family-name:var(--font-body)] text-[10px] uppercase text-outline">
                文章总数
              </span>
              <span className="font-[family-name:var(--font-headline)] text-xl font-bold">
                42
              </span>
            </div>
            <div className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
              <span className="font-[family-name:var(--font-body)] text-[10px] uppercase text-outline">
                开源项目
              </span>
              <span className="font-[family-name:var(--font-headline)] text-xl font-bold">
                12
              </span>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-[family-name:var(--font-body)] text-[10px] uppercase text-outline">
                技术栈
              </span>
              <span className="font-[family-name:var(--font-headline)] text-xl font-bold">
                8
              </span>
            </div>
          </div>
        </div>

        {/* CTA Card — 4 cols, entire card is tactile-button */}
        <Link
          href="/blog"
          className="md:col-span-4 bg-primary text-on-primary rounded-[var(--radius-xl)] p-8 flex flex-col justify-between tactile-button cursor-pointer"
        >
          <span className="material-symbols-outlined text-4xl">
            database
          </span>
          <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold leading-none tracking-tighter">
            浏览完整技术归档。
          </h3>
        </Link>

        {/* Image Card — 8 cols */}
        <div className="md:col-span-8 bg-surface-container rounded-[var(--radius-xl)] overflow-hidden relative group">
          <div
            className="w-full h-full bg-cover bg-center grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpCcgiNuHAJpTYCrM6EIjUKqM3ey67B9qeRd23iVlZ2V7vl9WAkD-3LUSxwOIh3KNl6RJgyYZa8ZpMagYfsChj4QhMMshexOdxeruCrqmO0pQfeOwuWKnzL6my1qZfby-7Zv764L9EQAeQC6lGG-RU-rr4XelQBDJGThUPxvi0aydrffkBIrXiDoMi-XsqmYU5vcmoUWUQOcPGJwtrdQRe-gdlZDsalFnU6uHyCjCEx_Qy74vXWqMOBbyk2vhm55lM3IUw-DgmVSs')",
            }}
          />
          <div className="absolute bottom-0 left-0 p-8 glass-refraction w-full">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-[family-name:var(--font-body)] text-[10px] uppercase tracking-widest text-on-surface/60">
                  项目展示
                </span>
                <h4 className="font-[family-name:var(--font-headline)] text-xl font-bold text-on-surface">
                  开源 CLI 部署工具：从设计到发布
                </h4>
              </div>
              <span className="material-symbols-outlined">launch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
