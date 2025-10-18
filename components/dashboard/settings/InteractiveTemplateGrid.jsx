"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getTemplateList,
  getTemplate,
} from "@/components/common/TemplateRegistry";
import { DEFAULT_TEMPLATE } from "@/constants/templates";
import { Palette, Check } from "lucide-react";
import { CTA_HOVER_COLOR } from "@/constants/colors";

export default function InteractiveTemplateGrid({
  initialTemplate,
  onTemplateChange,
  disabled = false,
}) {
  const [localSelectedTemplate, setLocalSelectedTemplate] = useState(
    initialTemplate || DEFAULT_TEMPLATE
  );

  // Update local state when initialTemplate changes (handles SSR/hydration)
  useEffect(() => {
    const newTemplate = initialTemplate || DEFAULT_TEMPLATE;
    if (newTemplate !== localSelectedTemplate) {
      setLocalSelectedTemplate(newTemplate);
    }
  }, [initialTemplate]);

  const templates = getTemplateList();

  const handleTemplateSelect = (templateId) => {
    setLocalSelectedTemplate(templateId);
    onTemplateChange?.(templateId);
  };

  return (
    <>
      {/* ✅ Interactive template grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => {
          const isSelected = localSelectedTemplate === template.id;

          return (
            <Card
              key={template.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      {template.name}
                      {isSelected && (
                        <Badge
                          variant="default"
                          className="bg-green-400 text-green-900 hover:bg-green-400 hover:text-green-900 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-100"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-[var(--color-dark-700)] mt-1">
                      {template.description}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Template Preview */}
                <div
                  className="h-32 rounded-lg border border-gray-200 dark:border-[var(--color-dark-500)] flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: template.colors.background }}
                >
                  <div className="absolute inset-0 p-2 space-y-1">
                    <div
                      className="h-4 rounded"
                      style={{ backgroundColor: template.colors.cardBg }}
                    ></div>
                    <div className="flex gap-1">
                      <div
                        className="h-3 w-3 rounded"
                        style={{ backgroundColor: template.colors.accent }}
                      ></div>
                      <div
                        className="h-3 flex-1 rounded"
                        style={{ backgroundColor: template.colors.secondaryBg }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-6 rounded"
                          style={{ backgroundColor: template.colors.cardBg }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="relative z-10 text-xs font-medium p-2 rounded"
                    style={{ color: template.colors.text }}
                  >
                    {template.name}
                  </div>
                </div>

                {/* Template Features */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                    Features:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {template.layout.heroLayout} Hero
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {template.layout.productGrid} Grid
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {template.layout.spacing} Spacing
                    </Badge>
                  </div>
                </div>

                {/* ✅ Interactive buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => handleTemplateSelect(template.id)}
                    disabled={isSelected || disabled}
                    className={`w-full bg-green-400 dark:bg-green-700 hover:bg-[${CTA_HOVER_COLOR}] dark:hover:bg-green-800 text-green-900 dark:text-green-100 font-bold cursor-pointer disabled:cursor-not-allowed disabled:bg-green-300 disabled:text-green-700 disabled:dark:bg-green-800 disabled:dark:text-green-300`}
                  >
                    {isSelected ? "Active" : "Select"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Template Info */}
      {localSelectedTemplate && (
        <Card className="bg-gradient-to-r from-gray-50 to-green-50 dark:from-[var(--color-dark-400)] dark:to-[var(--color-dark-500)] border-green-200 dark:border-[var(--color-dark-500)] mt-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-green-400 rounded-lg">
                <Palette className="w-5 h-5 text-green-900" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900 dark:text-white">
                  Current Template: {getTemplate(localSelectedTemplate)?.name}
                </h3>
                <p className="text-sm text-green-700 dark:text-[var(--color-dark-700)] mt-1">
                  Your store is using this template. Changes are applied
                  automatically.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
