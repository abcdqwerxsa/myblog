export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  featured: boolean;
  readingTime: number;
  date: string;
  category: string | null;
  tags: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage: string | null;
  demoUrl: string | null;
  repoUrl: string | null;
  status: "active" | "archived" | "wip";
  date: string;
  tags: string[];
}

export interface Note {
  slug: string;
  title: string;
  content: string;
  mood: "idea" | "insight" | "question" | "observation";
  date: string;
  tags: string[];
}

export interface Resource {
  slug: string;
  title: string;
  description: string;
  category: "tools" | "books" | "courses" | "references";
  items: Array<{ label: string; url: string; description?: string }>;
  date: string;
  tags: string[];
}

export interface Category {
  name: string;
  slug: string;
  description: string;
}

export interface Tag {
  name: string;
  slug: string;
}
