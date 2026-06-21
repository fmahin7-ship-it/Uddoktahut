"use client";

import ProductList from "@/components/shopui/ProductList";
import Shop from "@/components/shopui/Shop";
import { useShop } from "@/app/context/ShopContext";

export default function Store() {
  const { products, productsError } = useShop();

  return (
    <Shop>
      {productsError ? (
        <p className="p-6 text-destructive text-center">
          Could not load products. Please try again later.
        </p>
      ) : (
        <ProductList products={products} />
      )}
    </Shop>
  );
}
