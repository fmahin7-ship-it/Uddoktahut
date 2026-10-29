import { CONFIG } from "@/shared/config";

function slugifyStoreName(storeName: string): string {
  return storeName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function previewStoreUrl(storeName: string): string | null {
  const slug = slugifyStoreName(storeName);
  if (!slug) return null;
  return CONFIG.isProd
    ? `https://${slug}.uddoktahut.com`
    : `http://${slug}.uddoktahut.local:3000`;
}

export { slugifyStoreName, previewStoreUrl };
