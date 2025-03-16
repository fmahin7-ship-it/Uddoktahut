import { NextResponse } from "next/server";

export function middleware(req) {
  const host = req.headers.get("host") || "";

  // Handle main domain
  if (host === "uddoktahut.com" || host === "www.uddoktahut.com") {
    return NextResponse.next(); // Serve the main website
  }

  // Handle shop subdomains like shop-xyz.uddoktahut.com
  if (host.endsWith(".uddoktahut.com")) {
    const subdomain = host.split(".")[0]; // Extract shop name

    if (subdomain && subdomain !== "all") {
      const url = req.nextUrl.clone();
      url.pathname = `/store/${subdomain}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
