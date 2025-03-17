import { notFound } from "next/navigation";

const validShops = ["shoporia", "salamkacchi", "shopup", "funnymg"];

export default async function ShopPage({ params }) {
  const { shopSlug } = await params;
  if (!validShops.includes(shopSlug)) {
    return notFound();
  }
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to {shopSlug}s Shop</h1>
      <p>Enjoy shopping at {shopSlug}.uddoktahut.com</p>
    </div>
  );
}
