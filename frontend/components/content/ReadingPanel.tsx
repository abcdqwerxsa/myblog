"use client";

import { ReadingConfig, FONT_OPTIONS } from "@/lib/pretext";

interface ReadingPanelProps {
  config: ReadingConfig;
  onConfigChange: (config: ReadingConfig) => void;
}

export function ReadingPanel({ config, onConfigChange }: ReadingPanelProps) {
  const update = (partial: Partial<ReadingConfig>) => {
    onConfigChange({ ...config, ...partial });
  };

  return (
    <div className="flex items-center gap-4 flex-wrap py-4 px-6 bg-surface-container-low rounded-[var(--radius-xl)] shadow-tactile">
      {/* Font size */}
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-sm text-outline">text_fields</span>
        <button
          onClick={() => update({ fontSize: Math.max(14, config.fontSize - 1) })}
          className="inner-milled bg-surface-container w-8 h-8 rounded-[var(--radius-xl)] flex items-center justify-center text-sm font-bold text-on-surface"
        >
          -
        </button>
        <span className="font-[family-name:var(--font-headline)] text-xs text-on-surface-variant w-8 text-center">
          {config.fontSize}
        </span>
        <button
          onClick={() => update({ fontSize: Math.min(24, config.fontSize + 1) })}
          className="inner-milled bg-surface-container w-8 h-8 rounded-[var(--radius-xl)] flex items-center justify-center text-sm font-bold text-on-surface"
        >
          +
        </button>
      </div>

      {/* Line height */}
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-sm text-outline">density_medium</span>
        <select
          value={config.lineHeight}
          onChange={(e) => update({ lineHeight: parseFloat(e.target.value) })}
          className="inner-milled bg-surface-container rounded-[var(--radius-xl)] px-2 py-1 text-xs font-[family-name:var(--font-body)] text-on-surface"
        >
          <option value="1.4">紧凑</option>
          <option value="1.5">较紧</option>
          <option value="1.6">适中</option>
          <option value="1.7">舒适</option>
          <option value="1.8">宽松</option>
          <option value="2.0">极宽</option>
        </select>
      </div>

      {/* Width */}
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-sm text-outline">width</span>
        <input
          type="range"
          min="500"
          max="900"
          step="20"
          value={config.maxWidth}
          onChange={(e) => update({ maxWidth: parseInt(e.target.value) })}
          className="w-24 accent-[#5e5e60]"
        />
        <span className="font-[family-name:var(--font-headline)] text-xs text-on-surface-variant w-12">
          {config.maxWidth}px
        </span>
      </div>

      {/* Font family */}
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-sm text-outline">font_download</span>
        <select
          value={config.fontFamily}
          onChange={(e) => update({ fontFamily: e.target.value })}
          className="inner-milled bg-surface-container rounded-[var(--radius-xl)] px-2 py-1 text-xs font-[family-name:var(--font-body)] text-on-surface"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
