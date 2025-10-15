"use client";

import { useShop } from "@/app/context/ShopContext";
import TemplateSelector from "./TemplateSelector";

export default function StoreTemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useShop();

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
  };

  return (
    <TemplateSelector
      initialTemplate={selectedTemplate}
      onTemplateChange={handleTemplateChange}
      isDashboard={false}
    />
  );
}
