import dynamic from "next/dynamic";

// Lazy load TemplateAwareStorePage for better performance
const TemplateAwareStorePage = dynamic(
  () => import("@/features/storefront/components/TemplateAwareStorePage"),
  {
    loading: () => (
      <div className="animate-pulse min-h-screen bg-gray-200 dark:bg-gray-700"></div>
    ),
    ssr: true, // Keep SSR for store pages for SEO
  }
);

async function UserShopPage() {
  return <TemplateAwareStorePage />;
}

export default UserShopPage;
