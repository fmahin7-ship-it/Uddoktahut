import { cache } from "react";
import type { Product } from "@/shared/api/types";
import type { ShopData } from "@/shared/providers/shop-provider";

export type StoreResult =
  | { storeData?: ShopData; error?: undefined; type?: undefined }
  | { error: true; type: "unauthorized" | "network"; status?: number; message?: string; storeData?: undefined };

/**
 * Store read helpers for Server Components (layout, metadata).
 * Mutations live in store-template.action.js so client hooks can import them safely.
 */

export async function getAuthenticStore({ storeName }: { storeName: string }): Promise<StoreResult> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/subscription/store/${storeName}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 10 },
      }
    );
    if (!response.ok)
      return { error: true, type: "unauthorized", status: response.status };

    return await response.json();
  } catch (err) {
    return {
      error: true,
      type: "network",
      message: err instanceof Error ? err.message : "Network error",
    };
  }
}

/** One store fetch per request (layout + generateMetadata). */
export const getCachedStore = cache(async ({ storeName }: { storeName: string }) =>
  getAuthenticStore({ storeName })
);

export async function fetchStoreProducts({
  storeName,
  page = 1,
  pageSize = 10,
  search = "",
  sortBy = "id",
  sortOrder = "desc",
}: {
  storeName: string;
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<{ data: Product[]; error: string | null }> {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_API
      }/store/${storeName}/products?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(
        search
      )}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 10 },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch store products");
    const productRes = await res.json();
    return { data: productRes?.data || [], error: null };
  } catch (error) {
    return { data: [], error: error instanceof Error ? error.message : "Failed to fetch store products" };
  }
}

/** One product-list fetch per request (store layout). */
export const getCachedStoreProducts = cache(
  async ({ storeName, pageSize = 20 }: { storeName: string; pageSize?: number }) =>
    fetchStoreProducts({ storeName, page: 1, pageSize })
);
