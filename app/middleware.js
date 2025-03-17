import { NextResponse } from "next/server";

export function middleware(req) {
  const host = req.headers.get("host") || "";

  // Handle main website (uddoktahut.com)
  if (host === "uddoktahut.com" || host === "www.uddoktahut.com") {
    return NextResponse.next(); // Serve main page
  }

  // Handle subdomains like shop-xyz.uddoktahut.com
  if (host.endsWith(".uddoktahut.com")) {
    const subdomain = host.split(".")[0]; // Extract shop name

    if (subdomain) {
      const url = req.nextUrl.clone();
      url.pathname = `/store/${subdomain}`; // Rewrite to store page
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
