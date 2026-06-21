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
import StoreShell from "@/components/shopui/layout/StoreShell";

export default function ProductDetails({ productId }) {
  const router = useRouter();
  const { shop, products } = useShop();
  const shopSlug = shop?.store_name;
  const { addItem } = useCart(shopSlug);
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(
    () => products.find((p) => String(p.id) === String(productId)),
    [products, productId]
  );

  if (!product) {
    return (
      <StoreShell backHref="/shop" backLabel="Back to shop">
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <h1 className="text-xl font-semibold mb-2">Product not found</h1>
          <p className="text-muted-foreground mb-6">
            This product may have been removed from the store.
          </p>
          <Button asChild>
            <Link href="/shop">Back to shop</Link>
          </Button>
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
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
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No image
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold text-green-700">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-muted-foreground">
              {product.category ? `Category: ${product.category} · ` : ""}
              Stock: {product.stock}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-sm font-medium">Quantity</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                Add to cart
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
              >
                Buy now
              </Button>
            </div>

            <Button variant="link" asChild className="px-0">
              <Link href="/cart">View cart</Link>
            </Button>
          </div>
        </div>
      </div>
    </StoreShell>
  );
}
