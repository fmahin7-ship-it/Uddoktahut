"use client";

import { createContext, useContext, useState } from "react";

const intialState = {
  id: 1,
  store_name: "UddoktaHut",
  store_type: "",
  store_address: "",
  isActive: false,
  products: [],
  productsError: null,
};

const ShopContext = createContext();

const ShopProvider = ({ children, initialData }) => {
  const data = initialData || intialState;
  const [shop, setShop] = useState(data);
  const [products, setProducts] = useState(data.products || []);
  const [productsError, setProductsError] = useState(
    data.productsError || null
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
