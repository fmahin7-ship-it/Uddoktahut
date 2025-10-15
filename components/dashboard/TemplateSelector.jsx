"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getTemplateList,
  getTemplate,
} from "@/components/shopui/templates/TemplateRegistry";
import { Palette, Eye, Check } from "lucide-react";
import { DEFAULT_TEMPLATE } from "@/constants/templates";

export default function TemplateSelector({
  initialTemplate = DEFAULT_TEMPLATE,
  onTemplateChange,
  isDashboard = false,
}) {
  // Use local state for dashboard, or ShopContext for store pages
  const [localSelectedTemplate, setLocalSelectedTemplate] =
    useState(initialTemplate);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // For dashboard use, use local state; for store use, this would come from props or context
  const selectedTemplate = localSelectedTemplate;
  const setSelectedTemplate = (templateId) => {
    setLocalSelectedTemplate(templateId);
    onTemplateChange?.(templateId);
  };

  const templates = getTemplateList();

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setPreviewTemplate(null);
  };

  const handlePreview = (templateId) => {
    setPreviewTemplate(templateId);
    // In a real implementation, this would open a preview modal or new tab
    console.log(`Previewing template: ${templateId}`);
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const isPreviewing = previewTemplate === template.id;

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
                        <Badge variant="default" className="bg-blue-600">
                          <Check className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {template.description}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Template Preview */}
                <div
                  className="h-32 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: template.colors.background }}
                >
                  {/* Mini Preview */}
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
                  <h4 className="font-medium text-sm">Features:</h4>
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

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(template.id)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => handleTemplateSelect(template.id)}
                    disabled={isSelected}
                    className="flex-1"
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
      {selectedTemplate && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">
                  Current Template: {getTemplate(selectedTemplate)?.name}
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Your store is using this template. Changes are applied
                  automatically.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
