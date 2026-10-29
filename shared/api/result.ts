/**
 * Result shape every server action returns instead of throwing.
 *
 * Next.js replaces the message of an error thrown inside a server action with
 * a generic one in production, so "Product limit reached" would never reach
 * the seller. Returning { ok: false, error } keeps the real message.
 */

export type Ok<T> = { ok: true; data: T };
export type Fail = { ok: false; error: string; status?: number };
export type Result<T> = Ok<T> | Fail;

const DEFAULT_ERROR = "Something went wrong. Please try again.";

export const ok = <T>(data: T): Ok<T> => ({ ok: true, data });

export const fail = (error?: string, status?: number): Fail => ({
  ok: false,
  error: error || DEFAULT_ERROR,
  ...(status ? { status } : {}),
});

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Client-side: turn a Result back into a value or a thrown ApiError.
 * The throw happens in the browser, so the message is kept, and
 * React Query's onError / try-catch callers see the backend's message.
 */
export const unwrap = <T>(result: Result<T> | null | undefined): T => {
  if (result?.ok) return result.data;
  throw new ApiError(result?.error || DEFAULT_ERROR, result?.status);
};
