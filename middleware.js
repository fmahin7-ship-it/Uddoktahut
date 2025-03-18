import { NextResponse } from "next/server";
import { CONFIG } from "./app/_lib/config";

export function middleware(req) {
  const host = req.headers.get("host") || "";

  if (!host) return NextResponse.next();

  if (req.nextUrl.pathname.startsWith("/_next/")) return NextResponse.next();

  if (req.nextUrl.pathname.startsWith("/api/")) return NextResponse.next();

  return CONFIG.isProd
    ? productionMiddleware(host, req)
    : developmentMiddleware(host, req);
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
      return NextResponse.rewrite(url);
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
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
