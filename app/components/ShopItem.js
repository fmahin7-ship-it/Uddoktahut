"use client";

import { useRouter } from "next/navigation";

function ShopItem({ item }) {
  const router = useRouter();
  return (
    <div key={item.productId}>
      <p onClick={() => router.push(`/${item.productId}`)}>
        {item.productName}
      </p>
    </div>
  );
}

export default ShopItem;
