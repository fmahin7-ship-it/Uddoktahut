import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const mockDB = new Map(); // Temporary in-memory database

export async function POST() {
  const shopSlug = `shop-${nanoid(5)}`;
  mockDB.set(shopSlug, { name: shopSlug, createdAt: new Date() });

  return NextResponse.json({
    shopSlug,
    shopURL: `https://${shopSlug}.uddoktahut.com`,
  });
}
