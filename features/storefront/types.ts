import type { ComponentProps, ComponentType, CSSProperties, ReactNode } from "react";
import type { Product } from "@/shared/api/types";
import type { Button } from "@/shared/ui/button";
import type { TemplateId } from "@/shared/constants/templates";

/**
 * Every storefront template provides the same slots with the same props, so
 * pages can render `getTemplate(id).ProductCard` without knowing the template.
 */

export interface StoreShellProps {
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
}

export interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export type PrimaryButtonProps = ComponentProps<typeof Button>;

export type StoreCardProps = ComponentProps<"div">;

export interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
  actionHref?: string;
  actionLabel?: ReactNode;
}

export interface TemplateColors {
  background: string;
  secondaryBg: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  accent: string;
  cta: string;
  ctaHover: string;
  border: string;
}

export interface TemplateLayout {
  heroLayout: string;
  productGrid: string;
  headerStyle: string;
  spacing: string;
}

export interface TemplateTypography {
  fontFamily: string;
  headingWeight: string;
  bodyWeight: string;
}

export interface TemplateCommerce {
  maxWidth?: string;
  fontClass?: string;
  backgroundStyle?: "mesh" | "gradient" | "solid";
  radius?: string;
  radiusButton?: string;
  headingCase?: "normal" | "uppercase";
  productGrid?: string;
  shopTitle?: string;
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  /** Store home page. */
  component: ComponentType;
  Header: ComponentType;
  Footer: ComponentType<{ isShopList?: boolean }>;
  Shop: ComponentType;
  StoreShell: ComponentType<StoreShellProps>;
  ProductCard: ComponentType<ProductCardProps>;
  PrimaryButton: ComponentType<PrimaryButtonProps>;
  StoreCard: ComponentType<StoreCardProps>;
  SectionHeading: ComponentType<SectionHeadingProps>;
  colors: TemplateColors;
  layout: TemplateLayout;
  typography: TemplateTypography;
  commerce: TemplateCommerce;
}

export type StoreCssVars = CSSProperties & Record<`--store-${string}`, string>;
