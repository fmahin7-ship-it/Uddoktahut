// export const dynamic = "auto";

import { ShopProvider } from "@/app/context/ShopContext";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import UnauthorizeAccess from "@/components/common/UnauthorizeAccess";
import { getAuthenticStore } from "@/lib/actions/auth.action";
import { fetchStoreProducts } from "@/lib/actions/store.action";

function renderStoreError(storeData, shopSlug) {
  const { error, type, isActive } = storeData;
  if (error) {
    return type === "unauthorized" ? (
      <UnauthorizeAccess shopSlug={shopSlug} />
    ) : (
      <SomethingWentWrong />
    );
  }
  if (!isActive) {
    return <UnauthorizeAccess shopSlug={shopSlug} />;
  }
  return null;
}

export default async function layout({ params, children }) {
  const { shopSlug } = await params;
  const { storeData } = await getAuthenticStore({ storeName: shopSlug });
  const errorElement = renderStoreError(storeData, shopSlug);
  if (errorElement) return errorElement;

  const productRes = await fetchStoreProducts({
    storeName: shopSlug,
    page: 1,
    pageSize: 20,
  });
  const products = productRes.data;
  const productsError = productRes.error;

  return (
    <div>
      <ShopProvider initialData={{ ...storeData, products, productsError }}>
        {children}
      </ShopProvider>
    </div>
  );
}
