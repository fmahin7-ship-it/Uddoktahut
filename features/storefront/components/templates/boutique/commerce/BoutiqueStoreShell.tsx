"use client";

import type { StoreShellProps } from "@/features/storefront/types";
import Link from "next/link";
import BoutiqueHeader from "@/features/storefront/components/templates/boutique/commerce/BoutiqueHeader";
import BoutiqueFooter from "@/features/storefront/components/templates/boutique/commerce/BoutiqueFooter";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";

export default function BoutiqueStoreShell({
  children,
  backHref,
  backLabel = "Back",
}: StoreShellProps) {
  const { cssVars, colors, pageBackground, fontClass, maxWidth } = useStoreTheme();

  return (
    <div
      className={`min-h-screen flex flex-col ${fontClass}`}
      style={{ ...cssVars, background: pageBackground, color: colors.text }}
    >
      <BoutiqueHeader />
      {backHref && (
        <div className={`px-6 pt-6 ${maxWidth} mx-auto w-full text-center`}>
          <Link
            href={backHref}
            className="inline-block text-sm italic hover:underline underline-offset-4"
            style={{ color: colors.textSecondary }}
          >
            ← {backLabel}
          </Link>
        </div>
      )}
      <main className="flex-1 w-full">{children}</main>
      <BoutiqueFooter isShopList />
    </div>
  );
}
