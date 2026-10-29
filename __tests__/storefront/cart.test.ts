import {
  addItem,
  clearCart,
  getCart,
  getCartItemCount,
  removeItem,
  updateItemQuantity,
} from "@/features/storefront/cart/storage";
import { resolveCartLines } from "@/features/storefront/cart/resolveCartLines";
import type { Product } from "@/shared/api/types";

const SHOP = "rahim";
const KEY = "uddoktahut_cart_rahim";

const product = (overrides: Partial<Product>): Product => ({
  id: 1,
  name: "Cotton Saree",
  image: null,
  price: "1250.00",
  stock: 5,
  status: "active",
  category: "Clothing",
  sku: "SAR-1",
  store_id: 1,
  ...overrides,
});

beforeEach(() => localStorage.clear());

describe("cart storage", () => {
  test("adds items and merges the same product", () => {
    addItem(SHOP, 1, 2);
    addItem(SHOP, "1", 1);
    addItem(SHOP, 2, 1);
    expect(getCart(SHOP)).toEqual([
      { productId: 1, quantity: 3 },
      { productId: 2, quantity: 1 },
    ]);
    expect(getCartItemCount(SHOP)).toBe(4);
  });

  test("caps a line at 99 units", () => {
    addItem(SHOP, 1, 98);
    addItem(SHOP, 1, 5);
    expect(getCart(SHOP)).toEqual([{ productId: 1, quantity: 99 }]);
  });

  test("setting quantity to 0 removes the line", () => {
    addItem(SHOP, 1, 2);
    updateItemQuantity(SHOP, 1, 0);
    expect(getCart(SHOP)).toEqual([]);
  });

  test("remove and clear", () => {
    addItem(SHOP, 1, 1);
    addItem(SHOP, 2, 1);
    removeItem(SHOP, 1);
    expect(getCart(SHOP)).toEqual([{ productId: 2, quantity: 1 }]);
    clearCart(SHOP);
    expect(getCart(SHOP)).toEqual([]);
  });

  test("carts are separate per shop", () => {
    addItem(SHOP, 1, 1);
    expect(getCart("other-shop")).toEqual([]);
  });

  test("ignores corrupted or hand-edited localStorage", () => {
    localStorage.setItem(KEY, "{not json");
    expect(getCart(SHOP)).toEqual([]);

    localStorage.setItem(
      KEY,
      JSON.stringify({
        items: [
          { productId: 1, quantity: 2 },
          { productId: "x", quantity: 1 },
          { productId: 3, quantity: -4 },
          null,
        ],
      })
    );
    expect(getCart(SHOP)).toEqual([{ productId: 1, quantity: 2 }]);
  });
});

describe("resolveCartLines", () => {
  test("joins items with products and totals the cart", () => {
    const result = resolveCartLines(
      [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ],
      [product({ id: 1, price: "1250.50" }), product({ id: 2, name: "Mug", price: "99.99" })]
    );
    expect(result.lines.map((l) => l.lineTotal)).toEqual([2501, 99.99]);
    expect(result.subtotal).toBe(2600.99);
    expect(result.resolvedCount).toBe(3);
    expect(result.isValid).toBe(true);
  });

  test("flags products that are gone or short on stock", () => {
    const result = resolveCartLines(
      [
        { productId: 1, quantity: 9 },
        { productId: 404, quantity: 1 },
      ],
      [product({ id: 1, stock: 2 })]
    );
    expect(result.orphanLines).toEqual([{ productId: 404, quantity: 1 }]);
    expect(result.errors).toHaveLength(2);
    expect(result.errors[0]).toMatch(/only 2 in stock/);
    expect(result.isValid).toBe(false);
  });

  test("an empty cart is not valid for checkout", () => {
    expect(resolveCartLines([], []).isValid).toBe(false);
  });
});
