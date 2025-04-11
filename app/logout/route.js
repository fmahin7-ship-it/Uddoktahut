import { CONFIG } from "@/lib/config";
import { NextResponse } from "next/server";

export async function GET() {
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`, {
    method: "GET",
    credentials: "include",
  });
  return NextResponse.redirect(
    `${
      CONFIG.isProd ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"
    }/login`
  );
}
