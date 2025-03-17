import Link from "next/link";

const validShops = ["shoporia", "salamkacchi", "shopup", "funnymg"];

export default async function ShopPage({ params }) {
  const { shopSlug } = await params;
  if (!validShops.includes(shopSlug)) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        <h1>🚫 Unauthorized Access</h1>
        <p>
          Sorry, <strong>{shopSlug}</strong> does not have permission to create
          a store.
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
