import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-[716px] flex items-center px-8 md:px-24 bg-surface-container-low overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBT5yfvdhaDFJ5epL_EvkqBC1Smjd4otaHEFnN_s55_-SAixYrFttJoRHEo3AnUZ3HqiGXXdd4BCIKDOmrraln7-cosAv8itAAsSzLTjtu-V9hExhVObi05L3X5c3Prh1JVDkcb0dNHHKZc_Etaqmzl3GKn53VpHfFnTrf3IaTBDL2Oa7Ed01gv_GQAFfa_EwxUIHQnhpLWd7F_dRwuRooI2sRY6SO_T0c5AbEKE2x8F2DBTiYii032TGSqjlLu37a8UUoJetaGHCY')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        {/* Protocol label */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="h-[2px] w-12 bg-primary" />
          <span className="font-[family-name:var(--font-headline)] text-xs uppercase tracking-[0.2em] font-bold text-primary">
            Journal 2024
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-headline)] text-6xl md:text-8xl font-bold tracking-tighter text-on-surface mb-8 leading-[0.9]">
          以工业级精度
          <br />
          <span className="text-outline-variant">解构</span> 软件工程
        </h1>

        {/* Description */}
        <p className="font-[family-name:var(--font-body)] text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
          探索代码、架构与系统的精密触感。技术深潜、项目实战与思考记录。
        </p>

        {/* Buttons */}
        <div className="flex space-x-6">
          <Link
            href="/blog"
            className="tactile-button bg-primary text-on-primary px-8 py-3 rounded-[var(--radius-xl)] font-[family-name:var(--font-headline)] font-semibold tracking-tight inline-block"
          >
            开始阅读
          </Link>
          <Link
            href="/projects"
            className="inner-milled bg-surface-container-highest px-8 py-3 rounded-[var(--radius-xl)] font-[family-name:var(--font-headline)] font-semibold tracking-tight text-on-surface inline-block"
          >
            查看项目
          </Link>
        </div>
      </div>

      {/* Side: numbered chapter indicators */}
      <div className="hidden lg:flex absolute right-24 top-1/2 -translate-y-1/2 flex-col items-end space-y-12">
        <div className="text-right">
          <span className="block font-[family-name:var(--font-headline)] text-4xl font-bold text-zinc-300">
            01
          </span>
          <span className="block font-[family-name:var(--font-body)] text-[10px] uppercase tracking-widest text-outline">
            Architecture
          </span>
        </div>
        <div className="text-right">
          <span className="block font-[family-name:var(--font-headline)] text-4xl font-bold text-zinc-900">
            02
          </span>
          <span className="block font-[family-name:var(--font-body)] text-[10px] uppercase tracking-widest text-primary">
            Execution
          </span>
        </div>
        <div className="text-right opacity-30">
          <span className="block font-[family-name:var(--font-headline)] text-4xl font-bold text-zinc-300">
            03
          </span>
          <span className="block font-[family-name:var(--font-body)] text-[10px] uppercase tracking-widest text-outline">
            Reflection
          </span>
        </div>
      </div>
    </section>
  );
}
