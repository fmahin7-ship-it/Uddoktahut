"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useShop } from "@/app/context/ShopContext";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils/formatPrice";
import SubmitButton from "../common/SubmitButton";
import { Card, CardContent } from "../ui/card";

export default function ProductItem({ product, ctaColor, ctaHoverColor }) {
  const { shop } = useShop();
  const { addItem } = useCart(shop?.store_name);

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
    <Card className="rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition duration-300 pt-0 pb-2 overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/${product.id}`} className="block">
          <div className="relative w-full aspect-[3/2] overflow-hidden rounded-t-2xl bg-muted">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                quality={80}
                priority={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center rounded-t-2xl"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                No image
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-base font-semibold mb-1 text-neutral-800 line-clamp-1 hover:text-green-700">
              {product.name}
            </h2>
            <p className="text-sm text-neutral-700 font-medium mb-3">
              {formatPrice(product.price)}
            </p>
          </div>
        </Link>
        <div className="px-4 pb-4">
          <SubmitButton
            type="button"
            className={`w-full text-sm font-medium hover:bg-[${ctaHoverColor}]
                                        px-3 py-2 rounded-md shadow-sm cursor-pointer ${ctaColor}`}
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            <span className="font-semibold text-green-900">
              {product.stock <= 0 ? "Out of stock" : "Add to Cart"}
            </span>
          </SubmitButton>
        </div>
      </CardContent>
    </Card>
  );
}
