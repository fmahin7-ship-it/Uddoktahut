import { NextResponse } from "next/server";

const mockDB = new Map(); // Temporary in-memory database

export async function POST(req) {
  const { shopName } = await req.json();

  if (!shopName) {
    return NextResponse.json(
      { error: "Shop name is required" },
      { status: 400 }
    );
  }

  const shopSlug = shopName.split(" ").join("-");

  // ✅ Check if shop name already exists
  if (mockDB.has(shopSlug)) {
    return NextResponse.json(
      { error: "Shop name already taken. Choose a different one." },
      { status: 409 }
    );
  }

  // ✅ Store the new shop in the mock database
  mockDB.set(shopSlug, { name: shopSlug, createdAt: new Date() });

  return NextResponse.json({
    shopSlug,
    shopURL: `https://${shopSlug}.uddoktahut.com`,
  });
}
