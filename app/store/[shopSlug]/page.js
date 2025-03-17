import { notFound } from "next/navigation";

const validShops = ["shoporia", "salamkacchi", "shopup", "funnymg"];

export default async function ShopPage({ params }) {
  const { shopName } = await params;
  if (!validShops.includes(shopName)) return notFound();
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to {shopName}s Shop</h1>
      <p>Enjoy shopping at {shopName}.uddoktahut.com</p>
    </div>
  );
}
