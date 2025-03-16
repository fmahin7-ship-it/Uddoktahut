/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Ensure Next.js exports static files
  trailingSlash: true, // Helps Cloudflare serve pages correctly
};

export default nextConfig;
