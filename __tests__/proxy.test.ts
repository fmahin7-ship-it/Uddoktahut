/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { SignJWT, type JWTPayload } from "jose";

jest.mock("@/shared/config", () => ({ CONFIG: { isProd: true, isDev: false } }));

const {
  proxy,
  storeSlugFromHost,
  storePath,
  onboardingRedirect,
} = require("../proxy");

const SECRET = "test-secret-for-proxy";

beforeAll(() => {
  process.env.JWT_SECRET = SECRET;
});

const request = (
  host: string,
  path: string,
  { token, headers = {} }: { token?: string; headers?: Record<string, string> } = {}
) => {
  const req = new NextRequest(`https://${host}${path}`, {
    headers: { host, ...headers },
  });
  if (token) req.cookies.set("accessToken", token);
  return req;
};

const sign = (payload: JWTPayload) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(SECRET));

const rewriteTarget = (res: Response) =>
  new URL(res.headers.get("x-middleware-rewrite") ?? "").pathname;
const redirectTarget = (res: Response) => new URL(res.headers.get("location") ?? "").pathname;

describe("storeSlugFromHost", () => {
  test.each([
    ["rahim.uddoktahut.com", true, "rahim"],
    ["RAHIM.uddoktahut.com", true, "rahim"],
    ["uddoktahut.com", true, null],
    ["www.uddoktahut.com", true, null],
    ["my-app.vercel.app", true, null],
    ["shop.uddoktahut.local:3000", false, "shop"],
    ["uddoktahut.local:3000", false, null],
  ])("%s (prod=%s) → %s", (host, isProd, expected) => {
    expect(storeSlugFromHost(host, isProd)).toBe(expected);
  });
});

test("storePath keeps the visitor's path under /store/<slug>", () => {
  expect(storePath("shop", "/")).toBe("/store/shop/");
  expect(storePath("shop", "/cart")).toBe("/store/shop/cart");
});

describe("onboardingRedirect", () => {
  test("a seller who has not onboarded is sent to /onboarding", () => {
    expect(onboardingRedirect({ onboarded: false }, "/dashboard")).toBe("/onboarding");
  });
  test("an onboarded admin on /onboarding is sent to /dashboard", () => {
    expect(onboardingRedirect({ onboarded: true, roles: [1] }, "/onboarding")).toBe(
      "/dashboard"
    );
  });
  test("an onboarded seller on the dashboard continues", () => {
    expect(onboardingRedirect({ onboarded: true, roles: [1] }, "/dashboard")).toBeNull();
  });
});

describe("proxy", () => {
  test("store subdomain is rewritten to the store route", async () => {
    const res = await proxy(request("rahim.uddoktahut.com", "/cart"));
    expect(rewriteTarget(res)).toBe("/store/rahim/cart");
  });

  test("store subdomain home is rewritten, not sent to the landing page", async () => {
    const res = await proxy(request("rahim.uddoktahut.com", "/"));
    // Next.js normalises the trailing slash of the rewrite target.
    expect(rewriteTarget(res)).toBe("/store/rahim");
  });

  test("main site / redirects (307) to a locale landing page", async () => {
    const res = await proxy(
      request("uddoktahut.com", "/", { headers: { "accept-language": "bn-BD,bn;q=0.9" } })
    );
    expect(res.status).toBe(307);
    expect(redirectTarget(res)).toBe("/bn");
  });

  test("/en is served from the visitor's price-market page", async () => {
    const res = await proxy(
      request("uddoktahut.com", "/en", { headers: { "x-vercel-ip-country": "BD" } })
    );
    expect(rewriteTarget(res)).toBe("/en/bd");
  });

  test("a signed-in Australian seller sees AU prices even from Bangladesh", async () => {
    const token = await sign({ id: 7, country: "AU", onboarded: true, roles: [1] });
    const res = await proxy(
      request("uddoktahut.com", "/bn", {
        token,
        headers: { "x-vercel-ip-country": "BD" },
      })
    );
    expect(rewriteTarget(res)).toBe("/bn/au");
  });

  test("dashboard without a token redirects to /login", async () => {
    const res = await proxy(request("uddoktahut.com", "/dashboard"));
    expect(redirectTarget(res)).toBe("/login");
  });

  test("dashboard with a forged token redirects to /login", async () => {
    const res = await proxy(request("uddoktahut.com", "/dashboard", { token: "not.a.jwt" }));
    expect(redirectTarget(res)).toBe("/login");
  });

  test("dashboard with a valid token passes the user id downstream", async () => {
    const token = await sign({ id: 42, onboarded: true, roles: [1] });
    const res = await proxy(request("uddoktahut.com", "/dashboard", { token }));
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("x-middleware-request-x-user-id")).toBe("42");
  });

  test("API and framework paths are never touched", async () => {
    for (const path of ["/api/ai/stream", "/_next/static/chunk.js"]) {
      const res = await proxy(request("rahim.uddoktahut.com", path));
      expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    }
  });
});
