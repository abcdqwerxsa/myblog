import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-12 px-8 mt-auto bg-zinc-200 dark:bg-zinc-900 grid grid-cols-1 md:grid-cols-2 items-end gap-8">
      <div className="space-y-6">
        <span className="font-[family-name:var(--font-headline)] font-bold text-zinc-400 block">
          TECH LAB
        </span>
        <p className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-zinc-500 max-w-xs leading-loose">
          © 2024 TECH LAB. PRECISION TACTILITY. ALL RIGHTS RESERVED.
        </p>
      </div>
      <div className="flex flex-col md:items-end space-y-4">
        <div className="flex flex-wrap justify-end gap-6">
          <Link
            href="#"
            className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            隐私协议
          </Link>
          <Link
            href="#"
            className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            使用条款
          </Link>
          <Link
            href="#"
            className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            API 文档
          </Link>
        </div>
        <div className="flex space-x-4">
          <span className="material-symbols-outlined text-zinc-400 cursor-pointer hover:text-zinc-600">
            terminal
          </span>
          <span className="material-symbols-outlined text-zinc-400 cursor-pointer hover:text-zinc-600">
            memory
          </span>
          <span className="material-symbols-outlined text-zinc-400 cursor-pointer hover:text-zinc-600">
            shield_with_heart
          </span>
        </div>
      </div>
    </footer>
  );
}
