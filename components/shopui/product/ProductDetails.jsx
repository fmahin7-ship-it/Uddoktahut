"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useShop } from "@/app/context/ShopContext";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import StoreShell from "@/components/shopui/layout/StoreShell";
import StoreCard from "@/components/shopui/common/StoreCard";
import StorePrimaryButton from "@/components/shopui/common/StorePrimaryButton";

export default function ProductDetails({ productId }) {
  const router = useRouter();
  const { shop, products } = useShop();
  const shopSlug = shop?.store_name;
  const { addItem } = useCart(shopSlug);
  const [quantity, setQuantity] = useState(1);
  const { colors, maxWidth } = useStoreTheme();

  const product = useMemo(
    () => products.find((p) => String(p.id) === String(productId)),
    [products, productId]
  );

  if (!product) {
    return (
      <StoreShell backHref="/shop" backLabel="Back to shop">
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <h1 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
            Product not found
          </h1>
          <p className="mb-6" style={{ color: colors.textSecondary }}>
            This product may have been removed from the store.
          </p>
          <StorePrimaryButton asChild className="inline-flex w-auto px-8">
            <Link href="/shop">Back to shop</Link>
          </StorePrimaryButton>
        </div>
      </StoreShell>
    );
  }

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    addItem(product.id, quantity);
    router.push("/checkout");
  };

  return (
    <StoreShell backHref="/shop" backLabel="Back to shop">
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 py-8 sm:py-10`}>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <StoreCard className="overflow-hidden p-0">
            <div className="relative aspect-square">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  unoptimized
                />
              ) : (
                <div
                  className="flex items-center justify-center h-full"
                  style={{ color: colors.textSecondary }}
                >
                  No image
                </div>
              )}
            </div>
          </StoreCard>

          <div className="space-y-5">
            {product.category && (
              <p
                className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: colors.textSecondary }}
              >
                {product.category}
              </p>
            )}
            <h1
              className="text-3xl font-bold leading-tight"
              style={{ color: colors.text }}
            >
              {product.name}
            </h1>
            <p className="text-3xl font-bold" style={{ color: colors.accent }}>
              {formatPrice(product.price)}
            </p>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              {product.stock > 0
                ? `${product.stock} in stock`
                : "Out of stock"}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-sm font-medium" style={{ color: colors.text }}>
                Quantity
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{ borderColor: colors.border }}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                disabled={quantity >= product.stock}
                style={{ borderColor: colors.border }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <StorePrimaryButton
                type="button"
                className="flex-1 h-11 rounded-xl"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                Add to cart
              </StorePrimaryButton>
              <StorePrimaryButton
                type="button"
                variant="outline"
                className="flex-1 h-11 rounded-xl"
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
              >
                Buy now
              </StorePrimaryButton>
            </div>

            <Link
              href="/cart"
              className="inline-block text-sm font-medium hover:underline"
              style={{ color: colors.accent }}
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </StoreShell>
  );
}
