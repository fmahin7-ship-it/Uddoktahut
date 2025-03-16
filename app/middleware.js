// app/middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const host = req.headers.get("host"); // Get the full domain (e.g., shop-abc12.uddoktahut.com)

  if (host && host.endsWith(".uddoktahut.com")) {
    const subdomain = host.split(".")[0]; // Extract subdomain (shop-abc12)

    // Ignore 'www' or the main domain
    if (subdomain !== "www" && subdomain !== "uddoktahut") {
      const url = req.nextUrl.clone();
      url.pathname = `/store/${subdomain}`; // Rewrite to /store/shopSlug
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next(); // Continue normally for the main site
}
