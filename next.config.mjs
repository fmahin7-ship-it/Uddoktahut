/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set the workspace root to silence the lockfile warning
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
