"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { DEFAULT_TEMPLATE } from "@/shared/constants/templates";
import type { Product } from "@/shared/api/types";

/** Public store data the storefront layout loads for /store/[shopSlug]. */
export interface ShopData {
  id?: number;
  store_name: string;
  store_type?: string;
  store_address?: string | null;
  template_name?: string;
  isActive?: boolean;
  country?: string;
  products?: Product[];
  productsError?: string | null;
  [key: string]: unknown;
}

interface ShopContextValue {
  shop: ShopData;
  setShop: Dispatch<SetStateAction<ShopData>>;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  productsError: string | null;
  setProductsError: Dispatch<SetStateAction<string | null>>;
  selectedTemplate: string;
  setSelectedTemplate: Dispatch<SetStateAction<string>>;
}

const EMPTY_SHOP: ShopData = {
  store_name: "",
  isActive: false,
  products: [],
  productsError: null,
  template_name: DEFAULT_TEMPLATE,
};

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export function ShopProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: ShopData | null;
}) {
  const data = initialData ?? EMPTY_SHOP;
  const [shop, setShop] = useState<ShopData>(data);
  const [products, setProducts] = useState<Product[]>(data.products ?? []);
  const [productsError, setProductsError] = useState<string | null>(
    data.productsError ?? null
  );
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    data.template_name || DEFAULT_TEMPLATE
  );

  return (
    <ShopContext.Provider
      value={{
        shop,
        setShop,
        products,
        setProducts,
        productsError,
        setProductsError,
        selectedTemplate,
        setSelectedTemplate,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop(): ShopContextValue {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within a ShopProvider");
  return context;
}
