"use client";

import { useState } from "react";
import TemplateSelector from "@/components/dashboard/TemplateSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Store, Palette, CheckCircle } from "lucide-react";
import { DEFAULT_TEMPLATE } from "@/constants/templates";

export default function SettingsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    setShowSavedMessage(true);

    // Auto-hide the saved message after 3 seconds
    setTimeout(() => setShowSavedMessage(false), 3000);

    // Here you would typically save to database/API
    console.log("Template changed to:", templateId);
  };
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0 bg-gradient-to-br from-gray-50 to-green-50 dark:from-[var(--color-dark-300)] dark:to-[var(--color-dark-500)] min-h-screen">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-8 h-8 text-gray-700" />
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Store Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Settings Menu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">
                    Store Appearance
                  </span>
                </div>
                <p className="text-sm text-blue-700 mt-1">Currently viewing</p>
              </div>

              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Store Information</span>
                </div>
              </button>

              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">General Settings</span>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Template Selector */}
        <div className="lg:col-span-2">
          {/* Success Message */}
          {showSavedMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Template Updated!</p>
                <p className="text-sm text-green-700">
                  Your store template has been changed successfully.
                </p>
              </div>
            </div>
          )}

          <TemplateSelector
            initialTemplate={selectedTemplate}
            onTemplateChange={handleTemplateChange}
            isDashboard={true}
          />
        </div>
      </div>
    </div>
  );
}
