"use client";

import dynamic from "next/dynamic";

const AIBusinessAnalytics = dynamic(
  () => import("@/components/dashboard/analytics/AIBusinessAnalytics"),
  {
    loading: () => (
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    ),
    ssr: false,
  }
);

export default function AnalyticsChat() {
  return <AIBusinessAnalytics />;
}
