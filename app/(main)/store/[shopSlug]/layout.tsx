import { ShopProvider } from "@/shared/providers/shop-provider";
import SomethingWentWrong from "@/shared/components/SomethingWentWrong";
import UnauthorizeAccess from "@/shared/components/UnauthorizeAccess";
import {
  getCachedStore,
  getCachedStoreProducts,
  type StoreResult,
} from "@/features/storefront/data";
import { formatStoreDisplayName } from "@/shared/lib/utils";

function renderStoreError({ error, type, storeData }: StoreResult, shopSlug: string) {
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

export async function generateMetadata({ params }: LayoutProps<"/store/[shopSlug]">) {
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

export default async function layout({ params, children }: LayoutProps<"/store/[shopSlug]">) {
  const { shopSlug } = await params;
  const store = await getCachedStore({ storeName: shopSlug });
  const errorElement = renderStoreError(store, shopSlug);
  if (errorElement || !store.storeData) return errorElement;
  const { storeData } = store;

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
