import { useShop } from "@/app/context/ShopContext";
import { getTemplate } from "@/components/shopui/templates/registry";

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
