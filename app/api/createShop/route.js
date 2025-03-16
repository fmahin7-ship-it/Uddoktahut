// app/api/createShop.js
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const shops = new Map(); // Temporary in-memory database

export async function POST() {
  const shopSlug = `shop-${nanoid(5)}`;
  shops.set(shopSlug, { name: shopSlug, createdAt: new Date() });

  return NextResponse.json({ shopUrl: `https://${shopSlug}.uddoktahut.com` });
}
