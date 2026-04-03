"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";

const navItems = [
  { href: "/blog", label: "文章" },
  { href: "/projects", label: "项目" },
  { href: "/notes", label: "笔记" },
  { href: "/resources", label: "资源" },
  { href: "/about", label: "关于" },
];

export function GlassNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-white/70 backdrop-blur-xl border-b-[0.5px] border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
      <div className="flex items-center space-x-12">
        <Link
          href="/"
          className="flex items-center gap-2.5"
        >
          <Logo className="w-7 h-7 text-on-surface" />
          <span className="text-xl font-bold tracking-tighter text-on-surface font-[family-name:var(--font-headline)]">
            TECH LAB
          </span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-500 hover:text-zinc-900 transition-colors duration-300 font-[family-name:var(--font-headline)] tracking-tight text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="inner-milled bg-surface-container rounded-[var(--radius-DEFAULT)] px-3 py-1 flex items-center space-x-2">
          <span className="material-symbols-outlined text-outline text-lg">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 focus:outline-none text-xs font-[family-name:var(--font-body)] placeholder:text-outline-variant w-32 md:w-48"
            placeholder="Search archive..."
            type="text"
          />
        </div>
        <button
          className="md:hidden material-symbols-outlined text-on-surface hover:bg-surface-container transition-colors p-2 rounded-[var(--radius-DEFAULT)]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          menu
        </button>
      </div>
    </header>
  );
}
