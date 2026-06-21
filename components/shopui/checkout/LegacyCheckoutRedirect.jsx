"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";
import { useCart } from "@/hooks/use-cart";
import Loader from "@/components/common/Loader";

export default function LegacyCheckoutRedirect({ productId }) {
  const router = useRouter();
  const { shop } = useShop();
  const shopSlug = shop?.store_name;
  const { addItem } = useCart(shopSlug);

  useEffect(() => {
    if (!shopSlug || !productId) return;
    addItem(Number(productId), 1);
    router.replace("/checkout");
  }, [shopSlug, productId, addItem, router]);

  return <Loader />;
}
