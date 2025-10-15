"use client";

import { createContext, useContext, useState } from "react";
import { DEFAULT_TEMPLATE } from "@/constants/templates";

const intialState = {
  id: 1,
  store_name: "UddoktaHut",
  store_type: "",
  store_address: "",
  isActive: false,
  products: [],
  productsError: null,
  template_name: DEFAULT_TEMPLATE, // Default template
};

const ShopContext = createContext();

const ShopProvider = ({ children, initialData }) => {
  const data = initialData || intialState;
  const [shop, setShop] = useState(data);
  const [products, setProducts] = useState(data.products || []);
  const [productsError, setProductsError] = useState(
    data.productsError || null
  );
  const [selectedTemplate, setSelectedTemplate] = useState(
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
};

const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
};

export { ShopProvider, useShop };
