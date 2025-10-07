"use server";

import { cookies } from "next/headers";

export const addProduct = async (productData) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/product`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
        credentials: "include",
      }
    );
    if (!response.ok) {
      let errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || "Failed to add product");
      } catch {
        throw new Error(errorText || "Failed to add product");
      }
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const fetchProducts = async (searchTerm = "") => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/product${
      searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ""
    }`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (!response.ok) {
      let errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || "Failed to fetch products");
      } catch {
        throw new Error(errorText || "Failed to fetch products");
      }
    }
    const result = await response.json();
    return result.data || [];
  } catch (err) {
    // Optionally handle error
    return [];
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/product/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
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
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async (id) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/product/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      let errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || "Failed to delete product");
      } catch {
        throw new Error(errorText || "Failed to delete product");
      }
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
};
