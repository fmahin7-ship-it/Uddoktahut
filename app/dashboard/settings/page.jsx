import { Settings, Palette, Sparkles } from "lucide-react";
import StoreAppearanceSettings from "@/components/dashboard/settings/StoreAppearanceSettings";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="w-full">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            <div className="p-8">
              <StoreAppearanceSettings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
