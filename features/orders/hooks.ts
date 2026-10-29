"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  fetchOrders,
  fetchOrderById,
  updateOrderStatus,
  createOrderReturn,
  fetchOrderReturns,
  updateReturnStatus,
} from "@/features/orders/actions";
import type {
  CreateReturnPayload,
  OrderStatus,
  UpdateReturnPayload,
} from "@/shared/api/types";
import { unwrap } from "@/shared/api/result";

export const ORDERS_QUERY_KEY = "orders";

export function useOrders({ page = 1, pageSize = 10, status = "" } = {}) {
  return useQuery({
    queryKey: [ORDERS_QUERY_KEY, status, page, pageSize],
    queryFn: async () => unwrap(await fetchOrders({ page, pageSize, status })),
    placeholderData: keepPreviousData,
  });
}

export function useOrder(orderId: number | string) {
  return useQuery({
    queryKey: [ORDERS_QUERY_KEY, orderId],
    queryFn: async () => unwrap(await fetchOrderById(orderId)),
    enabled: Boolean(orderId),
  });
}

export function useOrderReturns(orderId: number) {
  return useQuery({
    queryKey: [ORDERS_QUERY_KEY, orderId, "returns"],
    queryFn: async () => unwrap(await fetchOrderReturns(orderId)),
    enabled: Boolean(orderId),
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: number; status: OrderStatus }) =>
      unwrap(await updateOrderStatus(orderId, status)),
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY, orderId] });
    },
  });
}

export function useCreateOrderReturn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, payload }: { orderId: number; payload: CreateReturnPayload }) =>
      unwrap(await createOrderReturn(orderId, payload)),
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY, orderId] });
      queryClient.invalidateQueries({
        queryKey: [ORDERS_QUERY_KEY, orderId, "returns"],
      });
    },
  });
}

export function useUpdateReturnStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      returnId,
      payload,
    }: {
      returnId: number;
      payload: UpdateReturnPayload;
    }) =>
      unwrap(await updateReturnStatus(returnId, payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY] });
    },
  });
}
