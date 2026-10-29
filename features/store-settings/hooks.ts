import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateStoreTemplate } from "@/features/store-settings/actions";
import { unwrap } from "@/shared/api/result";

interface UpdateTemplateVariables {
  storeName: string;
  templateName: string;
}

/**
 * Changes the store's template. The public storefront is server-rendered and
 * re-fetches store data every 10 seconds, so there is no client cache to invalidate.
 */
export const useUpdateTemplate = (onSuccess?: (templateName: string) => void) =>
  useMutation({
    mutationFn: async ({ storeName, templateName }: UpdateTemplateVariables) =>
      unwrap(await updateStoreTemplate({ storeName, templateName })),

    onSuccess: (_, variables) => {
      toast.success("Template updated successfully!", {
        description: "Your store template has been changed.",
      });
      onSuccess?.(variables.templateName);
    },

    onError: (error) => {
      toast.error("Failed to update template", {
        description: error.message || "Please try again later.",
      });
    },
  });
