import { CONFIG } from "@/lib/config";
import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    `${
      CONFIG.isProd ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"
    }/login`
  );

  response.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");

  return response;
}
