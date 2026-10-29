import { useShop } from "@/shared/providers/shop-provider";
import { getTemplate } from "@/features/storefront/components/templates/registry";

export function useTemplateConfig() {
  const { selectedTemplate } = useShop();
  const templateConfig = getTemplate(selectedTemplate);

  return {
    currentTheme: templateConfig,
    selectedTemplate,
    colors: templateConfig.colors,
    layout: templateConfig.layout,
    typography: templateConfig.typography,
    commerce: templateConfig.commerce,
  };
}
