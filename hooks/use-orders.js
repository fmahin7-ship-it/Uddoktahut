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
} from "@/lib/actions/order.action";

export const ORDERS_QUERY_KEY = "orders";

export function useOrders({ page = 1, pageSize = 10, status = "" } = {}) {
  return useQuery({
    queryKey: [ORDERS_QUERY_KEY, status, page, pageSize],
    queryFn: () => fetchOrders({ page, pageSize, status }),
    placeholderData: keepPreviousData,
  });
}

export function useOrder(orderId) {
  return useQuery({
    queryKey: [ORDERS_QUERY_KEY, orderId],
    queryFn: () => fetchOrderById(orderId),
    enabled: Boolean(orderId),
  });
}

export function useOrderReturns(orderId) {
  return useQuery({
    queryKey: [ORDERS_QUERY_KEY, orderId, "returns"],
    queryFn: () => fetchOrderReturns(orderId),
    enabled: Boolean(orderId),
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY, orderId] });
    },
  });
}

export function useCreateOrderReturn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, payload }) => createOrderReturn(orderId, payload),
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
    mutationFn: ({ returnId, payload }) =>
      updateReturnStatus(returnId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY] });
    },
  });
}
