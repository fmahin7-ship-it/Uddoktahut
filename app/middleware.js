import { NextResponse } from "next/server";

export function middleware(req) {
  const host = req.headers.get("host") || "";

  // Handle root domains
  if (host === "uddoktahut.com" || host === "www.uddoktahut.com") {
    return NextResponse.next(); // Continue normally for main domain
  }

  // Handle subdomains like shop-xyz.uddoktahut.com
  if (host.endsWith(".uddoktahut.com")) {
    const subdomain = host.split(".")[0]; // Extract subdomain (e.g., "shop-abc12")

    if (subdomain && subdomain !== "all") {
      // Redirect shop subdomains to store pages
      const url = req.nextUrl.clone();
      url.pathname = `/store/${subdomain}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
