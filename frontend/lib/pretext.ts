export interface ReadingConfig {
  fontSize: number;
  lineHeight: number;
  maxWidth: number;
  fontFamily: string;
}

export const DEFAULT_READING_CONFIG: ReadingConfig = {
  fontSize: 18,
  lineHeight: 1.7,
  maxWidth: 680,
  fontFamily: "Inter",
};

export const FONT_OPTIONS = [
  { value: "Inter", label: "Inter" },
  {
    value: '"Iowan Old Style", "Palatino Linotype", serif',
    label: "Palatino",
  },
  { value: "Georgia, serif", label: "Georgia" },
];

const STORAGE_KEY = "techlab-reading-config";

export function loadReadingConfig(): ReadingConfig {
  if (typeof window === "undefined") return DEFAULT_READING_CONFIG;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...DEFAULT_READING_CONFIG, ...JSON.parse(saved) };
  } catch {
    /* ignore */
  }
  return DEFAULT_READING_CONFIG;
}

export function saveReadingConfig(config: ReadingConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}
