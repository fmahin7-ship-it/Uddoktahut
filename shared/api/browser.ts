/**
 * Browser-side backend calls (login, signup, OTP, onboarding).
 *
 * These run in the browser on purpose: the backend sets the auth cookies on
 * the response, so the request must come from the user's browser with
 * credentials included.
 *
 * Always resolves to the backend's JSON body. On a network failure or a
 * non-JSON reply it resolves to { success: false, message } — never
 * undefined — so callers can read `result.message` safely.
 */

const NETWORK_ERROR = "Could not reach the server. Please try again.";

/** Common fields of the backend's JSON bodies; endpoints add their own. */
export interface BackendBody {
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

export async function browserRequest<T extends BackendBody = BackendBody>(
  path: string,
  { method = "GET", body }: { method?: "GET" | "POST"; body?: unknown } = {}
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}${path}`, {
      method,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: "include",
    });
  } catch {
    return { success: false, message: NETWORK_ERROR } as T;
  }

  try {
    const data: unknown = await response.json();
    if (data && typeof data === "object") return data as T;
  } catch {
    // fall through
  }
  return {
    success: false,
    message: response.ok
      ? "Unexpected response from server."
      : "Request failed. Please try again.",
  } as T;
}
