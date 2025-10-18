import { Palette } from "lucide-react";
import TemplateManagement from "./TemplateManagement";

export default function StoreAppearanceSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Palette className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Store Templates</h2>
      </div>

      <p className="text-gray-600">
        Choose a template that best represents your brand and style. You can
        change this anytime.
      </p>
      <TemplateManagement />
    </div>
  );
}
