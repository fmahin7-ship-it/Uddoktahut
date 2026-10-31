"use client";

import type React from "react";
import type { ProductCardProps } from "@/features/storefront/types";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useShop } from "@/shared/providers/shop-provider";
import { useCart } from "@/features/storefront/hooks/use-cart";
import { formatPrice } from "@/shared/lib/formatPrice";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";
import { useStoreCurrency } from "@/features/storefront/hooks/useStoreCurrency";
import BoutiquePrimaryButton from "@/features/storefront/components/templates/boutique/commerce/BoutiquePrimaryButton";

export default function BoutiqueProductCard({ product }: ProductCardProps) {
  const { shop } = useShop();
  const { addItem } = useCart(shop?.store_name);
  const { colors, cardClass, cardStyle } = useStoreTheme();
  const currency = useStoreCurrency();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) {
      toast.error("Out of stock");
      return;
    }
    addItem(product.id, 1);
    toast.success("Added to cart");
  };

  return (
    <article
      className={`group ${cardClass} overflow-hidden transition-all duration-500 hover:shadow-xl flex flex-col`}
      style={cardStyle}
    >
      <Link href={`/${product.id}`} className="block flex-1">
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
              unoptimized
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center text-sm italic"
              style={{ backgroundColor: colors.secondaryBg, color: colors.textSecondary }}
            >
              No image
            </div>
          )}
        </div>
        <div className="p-6 text-center">
          {product.category && (
            <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: colors.textSecondary }}>
              {product.category}
            </p>
          )}
          <h2 className="text-xl italic mb-2 line-clamp-2" style={{ color: colors.text }}>
            {product.name}
          </h2>
          <p className="text-lg font-medium" style={{ color: colors.accent }}>
            {formatPrice(product.price, currency)}
          </p>
        </div>
      </Link>
      <div className="px-6 pb-6 pt-0">
        <BoutiquePrimaryButton
          type="button"
          className="w-full h-11"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          {product.stock <= 0 ? "Unavailable" : "Add to bag"}
        </BoutiquePrimaryButton>
      </div>
    </article>
  );
}
