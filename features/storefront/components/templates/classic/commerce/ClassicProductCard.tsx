"use client";

import type React from "react";
import type { ProductCardProps } from "@/features/storefront/types";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";
import { useShop } from "@/shared/providers/shop-provider";
import { useCart } from "@/features/storefront/hooks/use-cart";
import { formatPrice } from "@/shared/lib/formatPrice";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";
import { useStoreCurrency } from "@/features/storefront/hooks/useStoreCurrency";
import ClassicPrimaryButton from "@/features/storefront/components/templates/classic/commerce/ClassicPrimaryButton";

export default function ClassicProductCard({ product, compact = false }: ProductCardProps) {
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
      className={`group ${cardClass} overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-0.5 hover:shadow-lg`}
      style={cardStyle}
    >
      <Link href={`/${product.id}`} className="block flex-1">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
              unoptimized
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center text-sm"
              style={{ backgroundColor: colors.secondaryBg, color: colors.textSecondary }}
            >
              No image
            </div>
          )}
          {product.stock <= 0 && (
            <span className="absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
              Sold out
            </span>
          )}
        </div>
        <div className={compact ? "p-3.5" : "p-4"}>
          {product.category && (
            <p className="text-[11px] uppercase tracking-widest font-semibold mb-1.5" style={{ color: colors.accent }}>
              {product.category}
            </p>
          )}
          <h2 className={`font-semibold line-clamp-2 mb-2 ${compact ? "text-sm" : "text-base"}`} style={{ color: colors.text }}>
            {product.name}
          </h2>
          <p className={`font-bold ${compact ? "text-base" : "text-lg"}`} style={{ color: colors.text }}>
            {formatPrice(product.price, currency)}
          </p>
        </div>
      </Link>
      <div className={compact ? "px-3.5 pb-3.5 pt-0" : "px-4 pb-4 pt-0"}>
        {compact ? (
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full h-9 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-40"
            style={{ backgroundColor: `${colors.accent}14`, color: colors.accent }}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {product.stock <= 0 ? "Unavailable" : "Add"}
          </button>
        ) : (
          <ClassicPrimaryButton
            type="button"
            className="w-full h-11"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            {product.stock <= 0 ? "Out of stock" : "Add to cart"}
          </ClassicPrimaryButton>
        )}
      </div>
    </article>
  );
}
