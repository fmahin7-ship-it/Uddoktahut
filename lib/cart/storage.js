import { CART_STORAGE_PREFIX } from "@/constants/order";

const getCartKey = (shopSlug) => `${CART_STORAGE_PREFIX}_${shopSlug}`;

const readRaw = (shopSlug) => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getCartKey(shopSlug));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.items) ? parsed.items : [];
  } catch {
    return [];
  }
};

const writeRaw = (shopSlug, items) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    getCartKey(shopSlug),
    JSON.stringify({ items, updatedAt: new Date().toISOString() })
  );
};

const getCart = (shopSlug) => readRaw(shopSlug);

const setCart = (shopSlug, items) => writeRaw(shopSlug, items);

const addItem = (shopSlug, productId, quantity = 1) => {
  const items = readRaw(shopSlug);
  const id = Number(productId);
  const qty = Number(quantity);
  const existing = items.find((item) => item.productId === id);

  if (existing) {
    existing.quantity = Math.min(existing.quantity + qty, 99);
  } else {
    items.push({ productId: id, quantity: qty });
  }

  writeRaw(shopSlug, items);
  return items;
};

const updateItemQuantity = (shopSlug, productId, quantity) => {
  const id = Number(productId);
  const qty = Number(quantity);
  let items = readRaw(shopSlug);

  if (qty <= 0) {
    items = items.filter((item) => item.productId !== id);
  } else {
    items = items.map((item) =>
      item.productId === id ? { ...item, quantity: Math.min(qty, 99) } : item
    );
  }

  writeRaw(shopSlug, items);
  return items;
};

const removeItem = (shopSlug, productId) => {
  const id = Number(productId);
  const items = readRaw(shopSlug).filter((item) => item.productId !== id);
  writeRaw(shopSlug, items);
  return items;
};

const clearCart = (shopSlug) => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(getCartKey(shopSlug));
};

const getCartItemCount = (shopSlug) =>
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
