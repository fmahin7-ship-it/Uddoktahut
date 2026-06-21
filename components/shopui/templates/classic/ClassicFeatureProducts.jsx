"use client";

import ProductItem from "@/components/shopui/ProductItem";
import StoreSectionHeading from "@/components/shopui/common/StoreSectionHeading";
import { useShop } from "@/app/context/ShopContext";

export default function ClassicFeatureProducts() {
  const { products, productsError } = useShop();
  const featured = products.slice(0, 8);

  return (
    <section className="px-6 py-12 sm:py-16 max-w-6xl mx-auto">
      <StoreSectionHeading
        title="Featured products"
        subtitle="Hand-picked items from our catalog"
        actionHref="/shop"
        actionLabel="View all →"
      />

      {productsError && products.length === 0 ? (
        <p className="text-center text-destructive font-medium">
          Failed to load products: {productsError}
        </p>
      ) : featured.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Products will appear here once added to your store.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product) => (
            <ProductItem key={product.id} product={product} compact />
          ))}
        </div>
      )}
    </section>
  );
}
