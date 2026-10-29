"use client";

import { useUser } from "@/shared/providers/user-provider";
import { useUpdateTemplate } from "@/features/store-settings/hooks";
import { DEFAULT_TEMPLATE } from "@/shared/constants/templates";
import InteractiveTemplateGrid from "@/features/store-settings/components/InteractiveTemplateGrid";
import { toast } from "sonner";

export default function TemplateManagement() {
  const { user, setUser } = useUser();
  
  const template_name = user?.template_name || DEFAULT_TEMPLATE;
  // Never fall back to the seller's personal name — that is not a store slug.
  const storeName = user?.storeName;

  const updateTemplateMutation = useUpdateTemplate((newTemplateId: string) => {
    setUser((prevUser) => ({ ...prevUser, template_name: newTemplateId }));
  });

  const handleTemplateChange = (templateId: string) => {
    if (!storeName) {
      toast.error("Failed to update template", {
        description: "Store not found for your account. Please log in again.",
      });
      return;
    }
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
