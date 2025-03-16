"use client";

import { useState } from "react";

export default function Home() {
  const [shopURL, setShopURL] = useState(null);

  async function createShop() {
    const res = await fetch("/api/createShop", { method: "POST" });
    const data = await res.json();
    setShopURL(data.shopURL); // Show the generated shop link
  }

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to Uddoktahut</h1>
      <button onClick={createShop}>Create My Shop</button>

      {shopURL && (
        <p>
          Your shop is ready: <a href={shopURL}>{shopURL}</a>
        </p>
      )}
    </div>
  );
}
