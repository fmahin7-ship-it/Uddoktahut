// export const dynamic = "auto";

import { ShopProvider } from "@/app/context/ShopContext";
import UnauthorizeAccess from "@/components/common/UnauthorizeAccess";
import { getAuthenticStore } from "@/lib/actions/auth.action";

export default async function layout({ params, children }) {
    const { shopSlug } = await params;

    const { storeData } = await getAuthenticStore({ storeName: shopSlug });

    if (!storeData) return <UnauthorizeAccess shopSlug={shopSlug} />;

    const { isActive } = storeData;


    if (!isActive) return <UnauthorizeAccess shopSlug={shopSlug} />;

    return (
        <div>
            <ShopProvider initialData={storeData}>
                {children}
            </ShopProvider>
        </div>
    )
}