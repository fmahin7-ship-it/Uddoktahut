"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addItem as addCartItem,
  clearCart as clearStoredCart,
  getCart,
  getCartItemCount,
  removeItem as removeCartItem,
  updateItemQuantity as updateCartQty,
} from "@/lib/cart/storage";

export function useCart(shopSlug) {
  const [items, setItems] = useState([]);
  const [lineCount, setLineCount] = useState(0);

  const syncFromStorage = useCallback(() => {
    if (!shopSlug) return;
    const next = getCart(shopSlug);
    setItems(next);
    setLineCount(getCartItemCount(shopSlug));
  }, [shopSlug]);

  useEffect(() => {
    syncFromStorage();
  }, [syncFromStorage]);

  const addItem = useCallback(
    (productId, quantity = 1) => {
      if (!shopSlug) return [];
      const next = addCartItem(shopSlug, productId, quantity);
      setItems(next);
      setLineCount(getCartItemCount(shopSlug));
      return next;
    },
    [shopSlug]
  );

  const updateQuantity = useCallback(
    (productId, quantity) => {
      if (!shopSlug) return [];
      const next = updateCartQty(shopSlug, productId, quantity);
      setItems(next);
      setLineCount(getCartItemCount(shopSlug));
      return next;
    },
    [shopSlug]
  );

  const removeItem = useCallback(
    (productId) => {
      if (!shopSlug) return [];
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
