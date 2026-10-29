"use client";

import { useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
  type QueryClient,
} from "@tanstack/react-query";
import type { ProductPayload } from "@/features/products/schema";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/features/products/actions";
import { unwrap } from "@/shared/api/result";

export const PRODUCTS_QUERY_KEY = "products";
const DEFAULT_PAGE_SIZE = 5;
const PREFETCH_AHEAD = 2;

function prefetchProductPages(
  queryClient: QueryClient,
  {
    searchTerm,
    page,
    pageSize,
    pageCount,
  }: { searchTerm: string; page: number; pageSize: number; pageCount: number }
) {
  for (let offset = 1; offset <= PREFETCH_AHEAD; offset++) {
    const nextPage = page + offset;
    if (nextPage > pageCount) break;

    queryClient.prefetchQuery({
      queryKey: [PRODUCTS_QUERY_KEY, searchTerm, nextPage, pageSize],
      queryFn: async () =>
        unwrap(await fetchProducts({ searchTerm, page: nextPage, pageSize })),
    });
  }
}

export function useProducts({
  searchTerm = "",
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
} = {}) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, searchTerm, page, pageSize],
    queryFn: async () => unwrap(await fetchProducts({ searchTerm, page, pageSize })),
    placeholderData: keepPreviousData,
  });

  const total = query.data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    if (!query.isSuccess) return;

    prefetchProductPages(queryClient, {
      searchTerm,
      page,
      pageSize,
      pageCount,
    });
  }, [query.isSuccess, queryClient, searchTerm, page, pageSize, pageCount]);

  return query;
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<ProductPayload>) => unwrap(await addProduct(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<ProductPayload> & { id: number }) =>
      unwrap(await updateProduct(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => unwrap(await deleteProduct(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
    },
  });
}
