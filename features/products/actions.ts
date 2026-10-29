"use server";

import { apiRequest } from "@/shared/api/server";
import { ok } from "@/shared/api/result";
import type { Paginated, Product } from "@/shared/api/types";
import type { ProductPayload } from "@/features/products/schema";

/** All actions return a Result ({ ok, data } | { ok: false, error }). */

export const addProduct = async (productData: Partial<ProductPayload>) =>
  apiRequest<Product>("/product", {
    method: "POST",
    auth: true,
    body: productData,
    fallbackError: "Failed to add product",
  });

export const fetchProducts = async ({
  searchTerm = "",
  page = 1,
  pageSize = 5,
} = {}) => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  if (searchTerm) params.set("search", searchTerm);

  const result = await apiRequest<Partial<Paginated<Product>>>(`/product?${params.toString()}`, {
    auth: true,
    cache: "no-store",
    fallbackError: "Failed to load products",
  });
  if (!result.ok) return result;

  const body = result.data ?? {};
  return ok<Paginated<Product>>({
    data: body.data || [],
    total: body.total ?? 0,
    page: body.page ?? page,
    pageSize: body.pageSize ?? pageSize,
  });
};

export const updateProduct = async (id: number, productData: Partial<ProductPayload>) =>
  apiRequest<Product>(`/product/${id}`, {
    method: "PATCH",
    auth: true,
    body: productData,
    fallbackError: "Failed to update product",
  });

export const deleteProduct = async (id: number) =>
  apiRequest(`/product/${id}`, {
    method: "DELETE",
    auth: true,
    fallbackError: "Failed to delete product",
  });
