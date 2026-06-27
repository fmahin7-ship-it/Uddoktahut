import { cache } from "react";
import { cookies } from "next/headers";

/**
 * Store server helpers (reads + mutations).
 * No file-level "use server" — only mutations mark themselves so cache() can be used on reads.
 */

export async function getAuthenticStore({ storeName }) {
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
      message: err?.message || "Network error",
    };
  }
}

/** One store fetch per request (layout + generateMetadata). */
export const getCachedStore = cache(async ({ storeName }) =>
  getAuthenticStore({ storeName })
);

export async function fetchStoreProducts({
  storeName,
  page = 1,
  pageSize = 10,
  search = "",
  sortBy = "id",
  sortOrder = "desc",
}) {
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
    return { data: [], error: error.message };
  }
}

/** One product-list fetch per request (store layout). */
export const getCachedStoreProducts = cache(
  async ({ storeName, pageSize = 20 }) =>
    fetchStoreProducts({ storeName, page: 1, pageSize })
);

export async function updateStoreTemplate({ storeName, templateName }) {
  "use server";

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/store/${storeName}/template`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ templateName }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      let errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || "Failed to update product");
      } catch {
        throw new Error(errorText || "Failed to update product");
      }
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating store template:", error);
    throw error;
  }
}
