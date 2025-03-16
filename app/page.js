"use client";
import { useState } from "react";

export default function Home() {
  const [shopSlug, setShopSlug] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCreateShop() {
    setLoading(true);
    setShopSlug(null);

    const res = await fetch("/api/createShop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.error("Error creating shop");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setShopSlug(data.shopSlug); // Save generated shop name
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Create Your Shop Instantly</h1>
      <button
        onClick={handleCreateShop}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Creating Shop..." : "Create Shop"}
      </button>

      {/* Show shop URL if created */}
      {shopSlug && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md border border-gray-300 text-center">
          <p className="text-lg font-semibold">Your shop is ready! 🎉</p>
          <a
            href={`/store/${shopSlug}`}
            target="_blank"
            className="text-blue-600 underline"
          >
            {`https://uddoktahut.com/store/${shopSlug}`}
          </a>
        </div>
      )}
    </div>
  );
}
