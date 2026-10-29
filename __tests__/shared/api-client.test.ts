/**
 * @jest-environment node
 */
import { ok, fail, unwrap } from "@/shared/api/result";

const mockCookieGet = jest.fn();
jest.mock("next/headers", () => ({
  cookies: async () => ({ get: mockCookieGet }),
}));

const { apiRequest } = require("@/shared/api/server");
const { browserRequest } = require("@/shared/api/browser");

const jsonResponse = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const fetchMock = jest.fn();

beforeEach(() => {
  process.env.NEXT_PUBLIC_BACKEND_API = "https://api.test";
  fetchMock.mockReset();
  global.fetch = fetchMock as unknown as typeof fetch;
  mockCookieGet.mockReset();
});

describe("result helpers", () => {
  test("unwrap returns data for ok results", () => {
    expect(unwrap(ok({ id: 1 }))).toEqual({ id: 1 });
  });

  test("unwrap throws the backend message (kept in the browser)", () => {
    expect(() => unwrap(fail("Product limit reached", 403))).toThrow(
      "Product limit reached"
    );
  });
});

describe("apiRequest (server)", () => {
  test("returns the backend error message instead of throwing", async () => {
    mockCookieGet.mockReturnValue({ value: "tok" });
    fetchMock.mockResolvedValue(
      jsonResponse(403, { success: false, message: "Product limit reached" })
    );

    const result = await apiRequest("/product", {
      method: "POST",
      auth: true,
      body: { name: "x" },
    });

    expect(result).toEqual({
      ok: false,
      error: "Product limit reached",
      status: 403,
    });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.test/product");
    expect(init.headers.Authorization).toBe("Bearer tok");
  });

  test("asks to log in again when an auth call has no token", async () => {
    mockCookieGet.mockReturnValue(undefined);
    const result = await apiRequest("/orders", { auth: true });
    expect(result).toMatchObject({ ok: false, status: 401 });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("maps a network failure to a friendly 503 result", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    const result = await apiRequest("/plans");
    expect(result).toMatchObject({ ok: false, status: 503 });
  });

  test("returns parsed JSON on success", async () => {
    fetchMock.mockResolvedValue(jsonResponse(200, { data: [1, 2] }));
    expect(await apiRequest("/plans")).toEqual({ ok: true, data: { data: [1, 2] } });
  });
});

describe("browserRequest", () => {
  test("never resolves to undefined on a network failure", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    const result = await browserRequest("/auth/login", { method: "POST", body: {} });
    expect(result).toEqual({ success: false, message: expect.any(String) });
  });

  test("passes the backend body through, including error messages", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse(409, { success: false, message: "This store name isn't available." })
    );
    const result = await browserRequest("/user/assign-role", { method: "POST", body: {} });
    expect(result.message).toBe("This store name isn't available.");
    expect(fetchMock.mock.calls[0][1].credentials).toBe("include");
  });
});
