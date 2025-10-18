import { Palette, Sparkles, Wand2 } from "lucide-react";
import TemplateManagement from "./TemplateManagement";

export default function StoreAppearanceSettings() {
  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-br from-green-400 to-emerald-400 p-3 rounded-xl">
                  <Palette className="w-6 h-6 text-green-900" />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-[var(--color-dark-700)] bg-clip-text text-transparent">
                  Store Templates
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Sparkles className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-500 dark:text-[var(--color-dark-700)]">
                    Professional designs ready to use
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-green-50 dark:from-[var(--color-dark-400)] dark:to-[var(--color-dark-500)] rounded-2xl p-6 border border-green-100 dark:border-[var(--color-dark-500)]">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-[var(--color-dark-500)] p-2 rounded-lg">
                  <Wand2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-white mb-2">
                    Transform Your Store's Look
                  </h3>
                  <p className="text-green-700 dark:text-[var(--color-dark-700)] text-sm leading-relaxed">
                    Choose from our professionally designed templates to give
                    your store a unique personality. Each template is optimized
                    for conversions and mobile-friendly. Changes apply
                    instantly!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <TemplateManagement />
      </div>
    </div>
  );
}
