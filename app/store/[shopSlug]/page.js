import Loader from "@/app/components/Loader";
import ProductList from "@/app/components/ProductList";
import UnauthorizeAccess from "@/app/components/UnauthorizeAccess";
import { Suspense } from "react";

const validShops = ["shoporia", "salamkacchi", "shopup", "funnymg"];

async function UserShopPage({ params }) {
  const { shopSlug } = await params;

  if (!validShops.includes(shopSlug)) {
    return <UnauthorizeAccess shopSlug={shopSlug} />;
  }

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to {shopSlug}s Shop</h1>
      <p>Enjoy shopping at {shopSlug}.uddoktahut.com</p>

      <Suspense fallback={<Loader />}>
        <ProductList validShops={validShops} />
      </Suspense>
    </div>
  );
}

export default UserShopPage;
