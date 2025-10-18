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
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                  <Palette className="w-6 h-6 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Store Templates
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Professional designs ready to use
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg">
                  <Wand2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Transform Your Store's Look
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
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
