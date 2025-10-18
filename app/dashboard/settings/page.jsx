import { Settings, Palette, Sparkles } from "lucide-react";
import StoreAppearanceSettings from "@/components/dashboard/settings/StoreAppearanceSettings";

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
