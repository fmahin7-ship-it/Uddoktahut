"use client";

import { useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/actions/product.action";

export const PRODUCTS_QUERY_KEY = "products";
const DEFAULT_PAGE_SIZE = 5;
const PREFETCH_AHEAD = 2;

function prefetchProductPages(queryClient, { searchTerm, page, pageSize, pageCount }) {
  for (let offset = 1; offset <= PREFETCH_AHEAD; offset++) {
    const nextPage = page + offset;
    if (nextPage > pageCount) break;

    queryClient.prefetchQuery({
      queryKey: [PRODUCTS_QUERY_KEY, searchTerm, nextPage, pageSize],
      queryFn: () => fetchProducts({ searchTerm, page: nextPage, pageSize }),
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
    queryFn: () => fetchProducts({ searchTerm, page, pageSize }),
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
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
    },
  });
}
