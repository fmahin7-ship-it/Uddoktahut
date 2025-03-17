import Link from "next/link";
import { notFound } from "next/navigation";

const validShops = ["shoporia", "salamkacchi", "shopup", "funnymg"];

export default async function ShopPage({ params }) {
  const { shopSlug } = await params;
  if (!validShops.includes(shopSlug)) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>🚫 Store Not Found</h1>
        <p>
          The store <strong>{shopSlug}</strong> does not exist.
        </p>
        <Link href="/">Go Back to Home</Link>
      </div>
    );
  }
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to {shopSlug}s Shop</h1>
      <p>Enjoy shopping at {shopSlug}.uddoktahut.com</p>
    </div>
  );
}
