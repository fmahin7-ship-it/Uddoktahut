import { NextResponse } from "next/server";

export function middleware(req) {
  const host = req.headers.get("host") || "";

  if (host === "uddoktahut.com" || host === "www.uddoktahut.com") {
    return NextResponse.next();
  }

  if (host.endsWith(".uddoktahut.com")) {
    const subdomain = host.split(".")[0];

    if (subdomain) {
      const url = req.nextUrl.clone();
      url.pathname = `/store/${subdomain}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
