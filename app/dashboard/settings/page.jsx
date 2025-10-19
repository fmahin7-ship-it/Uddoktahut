import { Settings, Palette, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

// Lazy load StoreAppearanceSettings for better performance
const StoreAppearanceSettings = dynamic(
  () => import("@/components/dashboard/settings/StoreAppearanceSettings"),
  {
    loading: () => (
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 dark:bg-gray-700 rounded"
            ></div>
          ))}
        </div>
      </div>
    ),
    ssr: true, // Keep SSR for settings content
  }
);

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-[var(--color-dark-300)] dark:to-[var(--color-dark-500)]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="w-full">
          <div className="bg-white/80 dark:bg-[var(--color-dark-400)]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-[var(--color-dark-500)] overflow-hidden">
            <div className="p-8">
              <StoreAppearanceSettings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
