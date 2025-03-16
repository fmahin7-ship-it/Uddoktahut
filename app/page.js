"use client";
import { useState } from "react";

export default function Home() {
  const [shopUrl, setShopUrl] = useState("");

  const createShop = async () => {
    const response = await fetch("/api/createShop", { method: "POST" });
    const data = await response.json();
    setShopUrl(data.shopUrl);
  };

  return (
    <div>
      <h1>Welcome to Uddoktahut!</h1>
      <button onClick={createShop}>Create Shop</button>
      {shopUrl && (
        <p>
          Your shop is ready: <a href={shopUrl}>{shopUrl}</a>
        </p>
      )}
    </div>
  );
}
