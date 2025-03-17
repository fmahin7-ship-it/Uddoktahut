import { notFound } from "next/navigation";

const validShops = ["shoporia", "salamkacchi", "shopup", "funnymg"];

export default function ShopPage({ params }) {
  if (!validShops.includes(params.shopName)) return notFound();
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to {params.shopName}s Shop</h1>
      <p>Enjoy shopping at {params.shopName}.uddoktahut.com</p>
    </div>
  );
}
