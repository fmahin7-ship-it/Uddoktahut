/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set the workspace root to silence the lockfile warning
  outputFileTracingRoot: process.cwd(),
  images: {
    domains: ["kolzsticks.github.io", "images.unsplash.com"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
};

export default nextConfig;
