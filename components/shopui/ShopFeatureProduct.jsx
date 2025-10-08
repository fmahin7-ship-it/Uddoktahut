"use client";

import { useShop } from "@/app/context/ShopContext";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export default function ShopFeatureProduct({ deliverySystem }) {
  const { products, productsError } = useShop();

  let content;
  if (productsError && products.length === 0) {
    content = (
      <p className="col-span-full text-center text-red-400 font-medium">
        Failed to load products: {productsError}
      </p>
    );
  } else if (!productsError && products.length === 0) {
    content = (
      <p className="col-span-full text-center text-neutral-500">
        No featured products found.
      </p>
    );
  } else {
    content = products.map((item, index) => (
      <Card key={item.id || index} className="overflow-hidden text-center pt-0">
        <div className="relative w-full aspect-square bg-neutral-100">
          <Image
            src={item.image || deliverySystem}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="pt-4">
          <h3 className="text-sm font-medium mb-1">{item.name}</h3>
          <p className="text-sm text-neutral-600">
            {item.price ? `$${item.price}` : ""}
          </p>
        </CardContent>
      </Card>
    ));
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {content}
    </div>
  );
}
