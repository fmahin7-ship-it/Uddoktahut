"use client";

import { useUser } from "@/app/context/UserContext";
import { useUpdateTemplate } from "@/hooks/use-template";
import InteractiveTemplateGrid from "./InteractiveTemplateGrid";

export default function TemplateManagement() {
  const { user, setUser } = useUser();
  const { template_name, storeName } = user;

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
