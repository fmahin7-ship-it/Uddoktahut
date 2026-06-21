"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, ShoppingBag } from "lucide-react";
import { useShop } from "@/app/context/ShopContext";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import { Button } from "@/components/ui/button";

export default function ModernDarkProductCard({ product }) {
  const { shop } = useShop();
  const { addItem } = useCart(shop?.store_name);
  const { colors, typography, cardStyle } = useStoreTheme();

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
      className="group overflow-hidden border-0 transition-all duration-500 hover:scale-[1.02]"
      style={{
        ...cardStyle,
        boxShadow: `0 4px 20px ${colors.background}40`,
      }}
    >
      <Link href={`/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <div className="relative w-full aspect-[4/5]">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="33vw"
                unoptimized
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: colors.secondaryBg, color: colors.textSecondary }}
              >
                NO IMAGE
              </div>
            )}

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
              <Button
                size="icon"
                className="rounded-full"
                style={{ backgroundColor: colors.accent, color: colors.background }}
                onClick={(e) => e.preventDefault()}
                asChild
              >
                <span>
                  <Eye className="w-5 h-5" />
                </span>
              </Button>
              <Button
                size="icon"
                className="rounded-full"
                style={{ backgroundColor: colors.cta, color: colors.background }}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </div>

            <div
              className="absolute top-4 right-4 px-3 py-1 font-bold text-sm"
              style={{ backgroundColor: colors.accent, color: colors.background }}
            >
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="p-6">
            <h3
              className="text-lg font-bold mb-2 uppercase tracking-wider line-clamp-2"
              style={{ color: colors.text, fontWeight: typography.headingWeight }}
            >
              {product.name}
            </h3>
            {product.category && (
              <div className="flex items-center justify-between">
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: colors.textSecondary }}
                >
                  {product.category}
                </span>
                <div className="w-8 h-px" style={{ backgroundColor: colors.accent }} />
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
