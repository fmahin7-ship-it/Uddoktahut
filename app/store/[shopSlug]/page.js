import UnauthorizeAccess from "@/app/components/UnauthorizeAccess";

const validShops = ["shoporia", "salamkacchi", "shopup", "funnymg"];

export default async function ShopPage({ params }) {
  const { shopSlug } = await params;
  if (!validShops.includes(shopSlug)) {
    return <UnauthorizeAccess />;
  }
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to {shopSlug}s Shop</h1>
      <p>Enjoy shopping at {shopSlug}.uddoktahut.com</p>
    </div>
  );
}
