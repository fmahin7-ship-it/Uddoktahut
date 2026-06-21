"use client";

import Link from "next/link";
import BoutiqueHeader from "./BoutiqueHeader";
import BoutiqueFooter from "./BoutiqueFooter";
import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function BoutiqueStoreShell({
  children,
  backHref,
  backLabel = "Back",
}) {
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
