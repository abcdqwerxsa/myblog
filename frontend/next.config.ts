import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = "myblog";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? `/${repoName}` : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
