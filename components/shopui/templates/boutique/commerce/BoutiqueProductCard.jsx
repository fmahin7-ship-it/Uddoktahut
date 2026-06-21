"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useShop } from "@/app/context/ShopContext";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import BoutiquePrimaryButton from "./BoutiquePrimaryButton";

export default function BoutiqueProductCard({ product }) {
  const { shop } = useShop();
  const { addItem } = useCart(shop?.store_name);
  const { colors, cardClass, cardStyle } = useStoreTheme();

  const handleAddToCart = (e) => {
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
            {formatPrice(product.price)}
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
