import { CART_STORAGE_PREFIX, MAX_LINE_QUANTITY } from "@/features/orders/constants";
import type { CartItem } from "@/features/storefront/cart/types";

/** localStorage is user-editable — keep only well-formed entries. */
const isCartItem = (value: unknown): value is CartItem =>
  typeof value === "object" &&
  value !== null &&
  Number.isInteger((value as CartItem).productId) &&
  Number.isInteger((value as CartItem).quantity) &&
  (value as CartItem).quantity > 0;

const getCartKey = (shopSlug: string) => `${CART_STORAGE_PREFIX}_${shopSlug}`;

const readRaw = (shopSlug: string): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getCartKey(shopSlug));
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    const items = (parsed as { items?: unknown } | null)?.items;
    return Array.isArray(items) ? items.filter(isCartItem) : [];
  } catch {
    return [];
  }
};

const writeRaw = (shopSlug: string, items: CartItem[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    getCartKey(shopSlug),
    JSON.stringify({ items, updatedAt: new Date().toISOString() })
  );
};

const getCart = (shopSlug: string) => readRaw(shopSlug);

const setCart = (shopSlug: string, items: CartItem[]) => writeRaw(shopSlug, items);

const addItem = (shopSlug: string, productId: number | string, quantity = 1) => {
  const items = readRaw(shopSlug);
  const id = Number(productId);
  const qty = Number(quantity);
  const existing = items.find((item) => item.productId === id);

  if (existing) {
    existing.quantity = Math.min(existing.quantity + qty, MAX_LINE_QUANTITY);
  } else {
    items.push({ productId: id, quantity: qty });
  }

  writeRaw(shopSlug, items);
  return items;
};

const updateItemQuantity = (
  shopSlug: string,
  productId: number | string,
  quantity: number | string
) => {
  const id = Number(productId);
  const qty = Number(quantity);
  let items = readRaw(shopSlug);

  if (qty <= 0) {
    items = items.filter((item) => item.productId !== id);
  } else {
    items = items.map((item) =>
      item.productId === id ? { ...item, quantity: Math.min(qty, MAX_LINE_QUANTITY) } : item
    );
  }

  writeRaw(shopSlug, items);
  return items;
};

const removeItem = (shopSlug: string, productId: number | string) => {
  const id = Number(productId);
  const items = readRaw(shopSlug).filter((item) => item.productId !== id);
  writeRaw(shopSlug, items);
  return items;
};

const clearCart = (shopSlug: string) => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(getCartKey(shopSlug));
};

const getCartItemCount = (shopSlug: string) =>
  readRaw(shopSlug).reduce((sum, item) => sum + item.quantity, 0);

export {
  getCart,
  setCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
  getCartItemCount,
};
