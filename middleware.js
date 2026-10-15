import { NextResponse } from "next/server";
import { CONFIG } from "./lib/config";
import { allRoles, protectedRoutes } from "./constants/rootConstant";
import { jwtVerify } from "jose";
import { detectLocaleFromRequest } from "./lib/i18n/detectLocale";
import { detectMarketFromRequest } from "./lib/market/detectMarket";
import { isLocale } from "./i18n/config";

export async function middleware(req) {
  const host = req.headers.get("host") || "";

  if (!host) return NextResponse.next();
  if (req.nextUrl.pathname.startsWith("/_next/")) return NextResponse.next();
  if (req.nextUrl.pathname.startsWith("/api/")) return NextResponse.next();

  if (req.nextUrl.pathname === "/" && !isStoreHost(host)) {
    return redirectToLocaleHome(req);
  }

  const landingLocale = req.nextUrl.pathname.slice(1);
  if (isLocale(landingLocale) && !isStoreHost(host)) {
    return rewriteToMarketLanding(req, landingLocale);
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const path = req.nextUrl.pathname;

  if (isProtectedRoute) {
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) return NextResponse.redirect(new URL("/login", req.url));

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(accessToken, secret);

      const requestHeaders = new Headers(req.headers);

      if (!payload?.id)
        return NextResponse.redirect(new URL("/login", req.url));

      requestHeaders.set("x-user-id", payload.id);

      if (payload.storeUrl) requestHeaders.set("x-store-url", payload.storeUrl);

      const onboarded = payload.onboarded || false;
      const roles = payload.roles || [];
      const isAdmin = roles.includes(allRoles.admin);
      const isEmployee = roles.includes(allRoles.employee);

      if (!onboarded && path !== "/onboarding") {
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }

      if ((isAdmin || isEmployee) && onboarded && path === "/onboarding") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (err) {
      console.log(err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ✅ Subdomain rewriting logic
  return CONFIG.isProd
    ? productionMiddleware(host, req)
    : developmentMiddleware(host, req);
}

function isStoreHost(host) {
  const hostname = host.split(":")[0];
  const baseDomain = CONFIG.isProd ? "uddoktahut.com" : "uddoktahut.local";
  return hostname.endsWith(`.${baseDomain}`) && hostname !== `www.${baseDomain}`;
}

// 307, not 308: the target depends on cookie/language/country, so it must never be cached as permanent.
function redirectToLocaleHome(req) {
  const url = req.nextUrl.clone();
  url.pathname = `/${detectLocaleFromRequest(req)}`;
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Cookie, Accept-Language");
  return response;
}

// Serves the pre-built page for the visitor's price market while the URL stays /en or /bn,
// so the right currency is in the first HTML (no client-side price swap).
async function rewriteToMarketLanding(req, locale) {
  const storeCountry = await readStoreCountry(req);
  const market = detectMarketFromRequest(req, { storeCountry });
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}/${market.toLowerCase()}`;
  return NextResponse.rewrite(url);
}

/** Store country from a signed-in seller's access token; null for visitors or invalid tokens. */
async function readStoreCountry(req) {
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(accessToken, secret);
    return payload.country ?? null;
  } catch {
    return null;
  }
}

function productionMiddleware(host, req) {
  if (host === "uddoktahut.com" || host === "www.uddoktahut.com") {
    return NextResponse.next();
  }

  if (host.endsWith(".uddoktahut.com")) {
    const subdomain = host.split(".")[0];
    if (subdomain) {
      const url = req.nextUrl.clone();
      url.pathname = `/store/${subdomain}${req.nextUrl.pathname}`;
      const response = NextResponse.rewrite(url);
      // response.cookies.set("subdomain", subdomain);
      return response;
    }
  }

  return NextResponse.next();
}

function developmentMiddleware(host, req) {
  host = host.split(":")[0];

  if (host === "uddoktahut.local" || host === "www.uddoktahut.local") {
    return NextResponse.next();
  }

  if (host.endsWith(".uddoktahut.local")) {
    const subdomain = host.split(".")[0];
    if (subdomain) {
      const url = req.nextUrl.clone();
      url.pathname = `/store/${subdomain}${req.nextUrl.pathname}`;
      const response = NextResponse.rewrite(url);
      // response.cookies.set("subdomain", subdomain);
      return response;
    }
  }

  return NextResponse.next();
}
