import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set the workspace root to silence the lockfile warning
  outputFileTracingRoot: process.cwd(),
  // Local dev runs on uddoktahut.local and store subdomains (hosts file).
  // Next.js 16 blocks dev-server assets/HMR for unlisted hosts.
  allowedDevOrigins: ["uddoktahut.local", "*.uddoktahut.local"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "kolzsticks.github.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
};

export default withNextIntl(nextConfig);
