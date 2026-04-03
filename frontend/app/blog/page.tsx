import { Suspense } from "react";
import { getArticles, getCategories } from "@/lib/content";
import { BlogClient } from "./BlogClient";

export default async function BlogPage() {
  const [articles, categories] = await Promise.all([
    Promise.resolve(getArticles()),
    Promise.resolve(getCategories()),
  ]);

  return (
    <Suspense>
      <BlogClient articles={articles} categories={categories} />
    </Suspense>
  );
}
