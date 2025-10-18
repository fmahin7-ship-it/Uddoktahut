import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStoreTemplate } from "@/lib/actions/store.action";
import { toast } from "sonner";

export const useUpdateTemplate = (onSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeName, templateName }) =>
      updateStoreTemplate({ storeName, templateName }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["store", variables.storeName]);
      toast.success("Template updated successfully!", {
        description: "Your store template has been changed.",
      });
      onSuccess && onSuccess(variables.templateName);
    },

    onError: (error) => {
      toast.error("Failed to update template", {
        description: error.message || "Please try again later.",
      });
    },
  });
};
