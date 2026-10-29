import "server-only";
import { cookies } from "next/headers";
import { fail, ok, type Result } from "./result";

/**
 * Server-side backend client for server actions and Server Components.
 * Never throws for HTTP or network errors — always returns a Result.
 */

const NETWORK_ERROR = "Could not reach the server. Please try again.";

export const backendUrl = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}${path}`;

export async function getAccessToken(): Promise<string | null> {
  return (await cookies()).get("accessToken")?.value ?? null;
}

const readBody = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const messageFrom = (body: unknown, fallback: string): string => {
  if (body && typeof body === "object" && "message" in body) {
    const { message } = body as { message?: unknown };
    if (typeof message === "string") return message;
  }
  if (typeof body === "string" && body.length < 300) return body;
  return fallback;
};

export interface ApiRequestOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  /** Send the seller's accessToken cookie as a Bearer token. */
  auth?: boolean;
  cache?: RequestCache;
  next?: { revalidate?: number | false; tags?: string[] };
  fallbackError?: string;
}

/**
 * The response body type is not validated at runtime — `T` documents what
 * the backend sends (see shared/api/types.ts).
 */
export async function apiRequest<T = unknown>(
  path: string,
  { method = "GET", body, auth = false, cache, next, fallbackError }: ApiRequestOptions = {}
): Promise<Result<T>> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (auth) {
    const token = await getAccessToken();
    if (!token) return fail("Please log in again.", 401);
    headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(backendUrl(path), {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      ...(cache ? { cache } : {}),
      ...(next ? { next } : {}),
    });
  } catch {
    return fail(NETWORK_ERROR, 503);
  }

  const data = await readBody(response);
  if (!response.ok) {
    return fail(
      messageFrom(data, fallbackError || "Request failed. Please try again."),
      response.status
    );
  }
  return ok(data as T);
}
