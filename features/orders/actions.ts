"use server";

import { apiRequest } from "@/shared/api/server";
import { ok, type Result } from "@/shared/api/result";
import type {
  CreateReturnPayload,
  Order,
  OrderReturn,
  OrderStatus,
  Paginated,
  PlaceOrderPayload,
  UpdateReturnPayload,
} from "@/shared/api/types";

/** All actions return a Result ({ ok, data } | { ok: false, error }). */

/** Unwraps the backend's { data } envelope. */
const dataOf = <T>(result: Result<{ data: T }>): Result<T> =>
  result.ok ? ok(result.data.data) : result;

/** Public guest checkout. data = the created order. */
export const placeStoreOrder = async ({
  storeName,
  payload,
}: {
  storeName: string;
  payload: PlaceOrderPayload;
}) =>
  dataOf(
    await apiRequest<{ data: Order }>(`/store/${storeName}/orders`, {
      method: "POST",
      body: payload,
      cache: "no-store",
      fallbackError: "Could not place order. Please try again.",
    })
  );

/** data = { data, total, page, pageSize } (list response as-is). */
export const fetchOrders = async ({
  page = 1,
  pageSize = 10,
  status = "",
} = {}) => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  if (status) params.set("status", status);

  return apiRequest<Paginated<Order>>(`/orders?${params.toString()}`, {
    auth: true,
    cache: "no-store",
  });
};

export const fetchOrderById = async (orderId: number | string) =>
  dataOf(await apiRequest<{ data: Order }>(`/orders/${orderId}`, { auth: true, cache: "no-store" }));

export const updateOrderStatus = async (orderId: number, status: OrderStatus) =>
  dataOf(
    await apiRequest<{ data: Order }>(`/orders/${orderId}/status`, {
      method: "PATCH",
      auth: true,
      body: { status },
      fallbackError: "Failed to update order",
    })
  );

export const createOrderReturn = async (orderId: number, payload: CreateReturnPayload) =>
  dataOf(
    await apiRequest<{ data: OrderReturn }>(`/orders/${orderId}/returns`, {
      method: "POST",
      auth: true,
      body: payload,
      fallbackError: "Failed to create return",
    })
  );

export const fetchOrderReturns = async (orderId: number) =>
  dataOf(
    await apiRequest<{ data: OrderReturn[] }>(`/orders/${orderId}/returns`, { auth: true, cache: "no-store" })
  );

export const updateReturnStatus = async (returnId: number, payload: UpdateReturnPayload) =>
  dataOf(
    await apiRequest<{ data: OrderReturn }>(`/orders/returns/${returnId}`, {
      method: "PATCH",
      auth: true,
      body: payload,
      fallbackError: "Failed to update return",
    })
  );
