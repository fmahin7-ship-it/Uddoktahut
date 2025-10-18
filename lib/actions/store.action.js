"use server";
import { cookies } from "next/headers";

export const fetchStoreProducts = async ({
  storeName,
  page = 1,
  pageSize = 10,
  search = "",
  sortBy = "id",
  sortOrder = "desc",
}) => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_API
      }/store/${storeName}/products?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(
        search
      )}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch store products");
    const productRes = await res.json();
    return { data: productRes?.data || [], error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

export const updateStoreTemplate = async ({ storeName, templateName }) => {
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
};
