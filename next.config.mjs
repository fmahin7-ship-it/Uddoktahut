/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set the workspace root to silence the lockfile warning
  outputFileTracingRoot: process.cwd(),
  images: {
    domains: ["kolzsticks.github.io", "images.unsplash.com"],
  },
};

export default nextConfig;
