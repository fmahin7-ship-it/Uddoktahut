import { ShopProvider } from "@/app/context/ShopContext";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import UnauthorizeAccess from "@/components/common/UnauthorizeAccess";
import { getCachedStore, getCachedStoreProducts } from "@/lib/actions/store.action";
import { formatStoreDisplayName } from "@/lib/utils";

function renderStoreError({ error, type, storeData }, shopSlug) {
  if (error) {
    return type === "unauthorized" ? (
      <UnauthorizeAccess shopSlug={shopSlug} />
    ) : (
      <SomethingWentWrong />
    );
  }

  if (!storeData) {
    return <UnauthorizeAccess shopSlug={shopSlug} />;
  }

  if (!storeData.isActive) {
    return <UnauthorizeAccess shopSlug={shopSlug} />;
  }

  return null;
}

export async function generateMetadata({ params }) {
  const { shopSlug } = await params;
  const { storeData, error } = await getCachedStore({ storeName: shopSlug });

  if (error || !storeData?.store_name) {
    return {
      title: "Store",
      description: "Online store on UddoktaHut",
    };
  }

  const displayName = formatStoreDisplayName(storeData.store_name);
  const description = storeData.store_type
    ? `${displayName} — ${storeData.store_type}. Shop online on UddoktaHut.`
    : `Shop online at ${displayName} on UddoktaHut.`;

  return {
    title: {
      default: displayName,
      template: `%s · ${displayName}`,
    },
    description,
  };
}

export default async function layout({ params, children }) {
  const { shopSlug } = await params;
  const { storeData, error, type } = await getCachedStore({ storeName: shopSlug });
  const errorElement = renderStoreError({ error, type, storeData }, shopSlug);
  if (errorElement) return errorElement;

  const { data: products, error: productsError } = await getCachedStoreProducts(
    { storeName: shopSlug, pageSize: 20 }
  );

  return (
    <div>
      <ShopProvider initialData={{ ...storeData, products, productsError }}>
        {children}
      </ShopProvider>
    </div>
  );
}
