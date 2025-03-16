import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

const mockDB = new Map(); // Temporary in-memory database

export async function POST() {
  const randomShopName = `shop-${nanoid(5)}`; // Generate a unique shop name
  mockDB.set(randomShopName, { name: randomShopName, createdAt: new Date() });

  return NextResponse.json({ shopSlug: randomShopName });
}
