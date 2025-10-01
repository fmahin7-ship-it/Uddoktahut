import { ProductList } from "@/components/dashboard/product-management/ProductList";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CTA_HOVER_COLOR } from "@/constants/colors";

export default async function Deshboard() {
  const requestHeader = await headers();
  const storeUrl = requestHeader.get("x-store-url");
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0 bg-gradient-to-br from-gray-50 to-green-50 dark:from-[var(--color-dark-300)] dark:to-[var(--color-dark-500)] min-h-screen">
      <div className="max-w-5xl w-full mx-auto bg-white/90 dark:bg-[var(--color-dark-400)] rounded-2xl shadow-xl p-2 sm:p-4 md:p-8 border border-gray-100 dark:border-[var(--color-dark-600)] mt-10 md:mt-16 transition-colors">
        <div className="flex flex-row items-start justify-between mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white text-left">
            Product Management
          </h1>
          <div className="flex flex-col gap-2 w-auto min-w-[160px] items-end">
            <Button
              className={`w-full px-6 py-2 font-bold text-green-900 dark:text-green-100 shadow bg-green-400 dark:bg-green-700 hover:bg-[${CTA_HOVER_COLOR}] dark:hover:bg-green-600 cursor-pointer transition-colors`}
            >
              Add Product
            </Button>
            <Link
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
            </Link>
          </div>
        </div>
        <ProductList />
      </div>
    </div>
  );
}
