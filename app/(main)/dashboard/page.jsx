import { headers } from "next/headers";
import dynamic from "next/dynamic";

// Lazy load ProductManagementSection for better performance
const ProductManagementSection = dynamic(
  () =>
    import(
      "@/components/dashboard/product-management/ProductManagementSection"
    ),
  {
    loading: () => (
      <div className="animate-pulse space-y-4 p-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    ),
    ssr: true, // Keep SSR for dashboard content for SEO
  }
);

export default async function Dashboard() {
  const requestHeader = await headers();
  const storeUrl = requestHeader.get("x-store-url");
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0 bg-gradient-to-br from-gray-50 to-green-50 dark:from-[var(--color-dark-300)] dark:to-[var(--color-dark-500)] min-h-screen">
      <ProductManagementSection storeUrl={storeUrl}>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white text-left">
          Product Management
        </h1>
        <a
          href={storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 dark:bg-green-800 px-5 py-2 text-white font-semibold shadow hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 6.75V5.25A2.25 2.25 0 0015 3h-6A2.25 2.25 0 006.75 5.25v13.5A2.25 2.25 0 009 21h6a2.25 2.25 0 002.25-2.25v-1.5M15.75 12h6m0 0l-3-3m3 3l-3 3"
            />
          </svg>
          Go to your website
        </a>
      </ProductManagementSection>
    </div>
  );
}
