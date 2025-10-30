import dynamic from "next/dynamic";

// Lazy load AI Analytics components for better performance
const AIBusinessAnalytics = dynamic(
  () => import("@/components/dashboard/analytics/AIBusinessAnalytics"),
  {
    loading: () => (
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    ),
  }
);

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-[var(--color-dark-300)] dark:to-[var(--color-dark-500)]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="w-full">
          <div className="bg-white/80 dark:bg-[var(--color-dark-400)]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-[var(--color-dark-500)] overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-600 rounded-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    AI Business Analytics
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Get AI-powered insights about your products and sales trends
                  </p>
                </div>
              </div>

              <AIBusinessAnalytics />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
