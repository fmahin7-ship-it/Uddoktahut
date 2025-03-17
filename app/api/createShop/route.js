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

  // ✅ Check if shop name already exists
  if (mockDB.has(shopName)) {
    return NextResponse.json(
      { error: "Shop name already taken. Choose a different one." },
      { status: 409 }
    );
  }

  // ✅ Store the new shop in the mock database
  mockDB.set(shopName, { name: shopName, createdAt: new Date() });

  return NextResponse.json({
    shopName,
    shopURL: `https://${shopName}.uddoktahut.com`,
  });
}
