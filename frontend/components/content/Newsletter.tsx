"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-24 px-8 md:px-24 bg-surface-container-low flex flex-col items-center text-center">
      <div className="max-w-2xl">
        <span className="material-symbols-outlined text-4xl text-outline mb-6">
          sensors
        </span>
        <h2 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-on-surface">
          保持同步
        </h2>
        <p className="font-[family-name:var(--font-body)] text-on-surface-variant mb-12">
          每周技术精选，直达你的收件箱。
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col md:flex-row gap-4 w-full"
        >
          <div className="inner-milled bg-surface-container rounded-[var(--radius-DEFAULT)] flex-grow p-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-none w-full focus:ring-0 focus:outline-none font-[family-name:var(--font-body)] text-sm placeholder:text-outline-variant"
              placeholder="your@email.com"
            />
          </div>
          <button
            type="submit"
            className="tactile-button bg-primary text-on-primary px-10 py-4 rounded-[var(--radius-xl)] font-[family-name:var(--font-headline)] font-bold tracking-tighter uppercase text-sm"
          >
            订阅
          </button>
        </form>
        <p className="mt-6 font-[family-name:var(--font-body)] text-[10px] uppercase tracking-widest text-outline">
          加密传输 · 隐私协议已激活
        </p>
      </div>
    </section>
  );
}
