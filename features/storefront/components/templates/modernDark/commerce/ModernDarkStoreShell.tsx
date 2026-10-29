"use client";

import type { StoreShellProps } from "@/features/storefront/types";
import Link from "next/link";
import ModernDarkHeader from "@/features/storefront/components/templates/modernDark/ModernDarkHeader";
import ModernDarkFooter from "@/features/storefront/components/templates/modernDark/ModernDarkFooter";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";

export default function ModernDarkStoreShell({
  children,
  backHref,
  backLabel = "Back",
}: StoreShellProps) {
  const { cssVars, colors, pageBackground, fontClass, maxWidth } = useStoreTheme();

  return (
    <div
      className={`min-h-screen flex flex-col ${fontClass}`}
      style={{ ...cssVars, backgroundColor: pageBackground, color: colors.text }}
    >
      <ModernDarkHeader />
      {backHref && (
        <div className={`px-6 pt-6 ${maxWidth} mx-auto w-full`}>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:underline underline-offset-4"
            style={{ color: colors.accent }}
          >
            ← {backLabel}
          </Link>
        </div>
      )}
      <main className="flex-1 w-full">{children}</main>
      <ModernDarkFooter isShopList />
    </div>
  );
}
