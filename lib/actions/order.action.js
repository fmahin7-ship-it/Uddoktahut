"use server";

import { cookies } from "next/headers";

const getBaseUrl = () => process.env.NEXT_PUBLIC_BACKEND_API;

async function parseErrorResponse(response) {
  const errorText = await response.text();
  try {
    const errorJson = JSON.parse(errorText);
    throw new Error(errorJson.message || "Request failed");
  } catch (err) {
    if (err instanceof Error && err.message !== "Request failed") throw err;
    throw new Error(errorText || "Request failed");
  }
}

async function orderRequest(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) throw new Error("Authentication required");
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${getBaseUrl()}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    await parseErrorResponse(response);
  }

  return response.json();
}

/** Public guest checkout */
export const placeStoreOrder = async ({ storeName, payload }) => {
  return orderRequest(`/store/${storeName}/orders`, {
    method: "POST",
    body: payload,
  });
};

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

  return orderRequest(`/orders?${params.toString()}`, { auth: true });
};

export const fetchOrderById = async (orderId) => {
  const result = await orderRequest(`/orders/${orderId}`, { auth: true });
  return result.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const result = await orderRequest(`/orders/${orderId}/status`, {
    method: "PATCH",
    auth: true,
    body: { status },
  });
  return result.data;
};

export const createOrderReturn = async (orderId, payload) => {
  const result = await orderRequest(`/orders/${orderId}/returns`, {
    method: "POST",
    auth: true,
    body: payload,
  });
  return result.data;
};

export const fetchOrderReturns = async (orderId) => {
  const result = await orderRequest(`/orders/${orderId}/returns`, {
    auth: true,
  });
  return result.data;
};

export const updateReturnStatus = async (returnId, payload) => {
  const result = await orderRequest(`/orders/returns/${returnId}`, {
    method: "PATCH",
    auth: true,
    body: payload,
  });
  return result.data;
};
