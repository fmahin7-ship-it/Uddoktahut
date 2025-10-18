"use client";

import { useUser } from "@/app/context/UserContext";
import { useUpdateTemplate } from "@/hooks/use-template";
import { DEFAULT_TEMPLATE } from "@/constants/templates";
import InteractiveTemplateGrid from "./InteractiveTemplateGrid";

export default function TemplateManagement() {
  const { user, setUser } = useUser();
  
  // Use fallback values and handle different possible field names
  const template_name = user?.template_name || user?.templateName || user?.template || DEFAULT_TEMPLATE;
  const storeName = user?.storeName || user?.store_name || user?.name;



  const updateTemplateMutation = useUpdateTemplate((newTemplateId) => {
    setUser((prevUser) => ({ ...prevUser, template_name: newTemplateId }));
  });

  const handleTemplateChange = (templateId) => {
    updateTemplateMutation.mutate({
      storeName: storeName,
      templateName: templateId,
    });
  };

  return (
    <InteractiveTemplateGrid
      initialTemplate={template_name}
      onTemplateChange={handleTemplateChange}
      disabled={updateTemplateMutation.isPending}
    />
  );
}
