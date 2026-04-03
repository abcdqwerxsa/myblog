export default function AboutPage() {
  return (
    <section className="px-8 md:px-24 bg-surface-container-low min-h-screen">
      <div className="pt-24 pb-8">
        <div className="flex items-center space-x-3 mb-6">
          <span className="h-[2px] w-12 bg-primary" />
          <span className="font-[family-name:var(--font-headline)] text-xs uppercase tracking-[0.2em] font-bold text-primary">
            Protocol
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-headline)] text-6xl md:text-8xl font-bold tracking-tighter text-on-surface leading-[0.9]">
          关于
        </h1>
      </div>
      <div className="py-20 max-w-2xl">
        <p className="font-[family-name:var(--font-body)] text-lg text-on-surface-variant leading-relaxed">
          技术博客，以精密触感的设计语言记录技术探索之旅。
        </p>
      </div>
    </section>
  );
}
