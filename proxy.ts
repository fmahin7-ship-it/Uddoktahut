import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";
import { CONFIG } from "@/shared/config";
import { allRoles, protectedRoutes } from "@/shared/constants/rootConstant";
import { detectLocaleFromRequest } from "@/i18n/detectLocale";
import { detectMarketFromRequest } from "@/shared/market/detectMarket";
import { isLocale } from "./i18n/config";

/**
 * Next.js 16 proxy (formerly middleware). Runs on every request, in this order:
 *   1. skip framework/API paths
 *   2. "/" on the main site      → redirect to /bn or /en
 *   3. "/bn" or "/en"            → rewrite to the visitor's price-market page
 *   4. protected routes          → JWT check + onboarding redirects
 *   5. store subdomains          → rewrite shop.uddoktahut.com/x to /store/shop/x
 * The order matters; keep it when changing this file.
 */
export async function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const path = req.nextUrl.pathname;

  if (!host) return NextResponse.next();
  if (path.startsWith("/_next/") || path.startsWith("/api/")) {
    return NextResponse.next();
  }

  const storeSlug = storeSlugFromHost(host, CONFIG.isProd);

  if (path === "/" && !storeSlug) return redirectToLocaleHome(req);

  const landingLocale = path.slice(1);
  if (isLocale(landingLocale) && !storeSlug) {
    return rewriteToMarketLanding(req, landingLocale);
  }

  if (isProtectedPath(path)) return guardProtectedRoute(req, path);

  if (storeSlug) return rewriteToStore(req, storeSlug);

  return NextResponse.next();
}

/** Claims the backend puts in the access token. */
export interface SessionClaims extends JWTPayload {
  id?: number;
  onboarded?: boolean;
  roles?: number[];
  storeUrl?: string;
  country?: string;
}

// ---------------------------------------------------------------------------
// Pure helpers (exported for tests)
// ---------------------------------------------------------------------------

export const baseDomain = (isProd: boolean): string =>
  isProd ? "uddoktahut.com" : "uddoktahut.local";

/**
 * The store slug for a store subdomain host, or null for the main site
 * (apex, www, or any host that is not ours, e.g. a Vercel preview URL).
 */
export function storeSlugFromHost(host: string, isProd: boolean): string | null {
  const hostname = (host.split(":")[0] ?? "").toLowerCase();
  const base = baseDomain(isProd);
  if (hostname === base || hostname === `www.${base}`) return null;
  if (!hostname.endsWith(`.${base}`)) return null;
  return hostname.split(".")[0] || null;
}

export const isProtectedPath = (path: string): boolean =>
  protectedRoutes.some((route) => path.startsWith(route));

/** Path a store request is served from, e.g. ("shop", "/cart") → "/store/shop/cart". */
export const storePath = (slug: string, path: string): string =>
  `/store/${slug}${path === "/" ? "/" : path}`;

/**
 * Where a signed-in seller must go, or null to continue.
 * Not onboarded → /onboarding; onboarded staff on /onboarding → /dashboard.
 */
export function onboardingRedirect(payload: SessionClaims, path: string): string | null {
  const onboarded = payload.onboarded || false;
  const roles = payload.roles || [];
  const isStaff = roles.includes(allRoles.admin) || roles.includes(allRoles.employee);

  if (!onboarded && path !== "/onboarding") return "/onboarding";
  if (isStaff && onboarded && path === "/onboarding") return "/dashboard";
  return null;
}

// ---------------------------------------------------------------------------
// Request handlers
// ---------------------------------------------------------------------------

const jwtSecret = () => new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyAccessToken(req: NextRequest): Promise<SessionClaims | null> {
  const token = req.cookies.get("accessToken")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify<SessionClaims>(token, jwtSecret());
    return payload;
  } catch {
    return null;
  }
}

async function guardProtectedRoute(req: NextRequest, path: string) {
  const payload = await verifyAccessToken(req);
  if (!payload?.id) return NextResponse.redirect(new URL("/login", req.url));

  const target = onboardingRedirect(payload, path);
  if (target) return NextResponse.redirect(new URL(target, req.url));

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", String(payload.id));
  if (payload.storeUrl) requestHeaders.set("x-store-url", payload.storeUrl);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

function rewriteToStore(req: NextRequest, slug: string) {
  const url = req.nextUrl.clone();
  url.pathname = storePath(slug, req.nextUrl.pathname);
  return NextResponse.rewrite(url);
}

// 307, not 308: the target depends on cookie/language/country, so it must never be cached as permanent.
function redirectToLocaleHome(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = `/${detectLocaleFromRequest(req)}`;
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Cookie, Accept-Language");
  return response;
}

// Serves the pre-built page for the visitor's price market while the URL stays /en or /bn,
// so the right currency is in the first HTML (no client-side price swap).
async function rewriteToMarketLanding(req: NextRequest, locale: string) {
  const payload = await verifyAccessToken(req);
  const market = detectMarketFromRequest(req, {
    storeCountry: payload?.country ?? null,
  });
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}/${market.toLowerCase()}`;
  return NextResponse.rewrite(url);
}
