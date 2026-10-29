"use client";

import type { CartItem } from "@/features/storefront/cart/types";
import { useCallback, useEffect, useState } from "react";
import {
  addItem as addCartItem,
  clearCart as clearStoredCart,
  getCart,
  getCartItemCount,
  removeItem as removeCartItem,
  updateItemQuantity as updateCartQty,
} from "@/features/storefront/cart/storage";

export function useCart(shopSlug: string | null | undefined) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [lineCount, setLineCount] = useState(0);

  const syncFromStorage = useCallback(() => {
    if (!shopSlug) return;
    const next = getCart(shopSlug);
    setItems(next);
    setLineCount(getCartItemCount(shopSlug));
  }, [shopSlug]);

  // The cart lives in localStorage (an external store that does not exist during
  // server render), so it is read once after mount and whenever the shop changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    syncFromStorage();
  }, [syncFromStorage]);

  const addItem = useCallback(
    (productId: number | string, quantity = 1) => {
      if (!shopSlug) return [] as CartItem[];
      const next = addCartItem(shopSlug, productId, quantity);
      setItems(next);
      setLineCount(getCartItemCount(shopSlug));
      return next;
    },
    [shopSlug]
  );

  const updateQuantity = useCallback(
    (productId: number | string, quantity: number) => {
      if (!shopSlug) return [] as CartItem[];
      const next = updateCartQty(shopSlug, productId, quantity);
      setItems(next);
      setLineCount(getCartItemCount(shopSlug));
      return next;
    },
    [shopSlug]
  );

  const removeItem = useCallback(
    (productId: number | string) => {
      if (!shopSlug) return [] as CartItem[];
      const next = removeCartItem(shopSlug, productId);
      setItems(next);
      setLineCount(getCartItemCount(shopSlug));
      return next;
    },
    [shopSlug]
  );

  const clearCart = useCallback(() => {
    if (!shopSlug) return;
    clearStoredCart(shopSlug);
    setItems([]);
    setLineCount(0);
  }, [shopSlug]);

  return {
    items,
    lineCount,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    refresh: syncFromStorage,
  };
}
