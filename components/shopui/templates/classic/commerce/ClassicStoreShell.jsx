"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ClassicHeader from "../ClassicHeader";
import ClassicFooter from "../ClassicFooter";
import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function ClassicStoreShell({
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
      <ClassicHeader />
      {backHref && (
        <div className={`px-6 pt-5 ${maxWidth} mx-auto w-full`}>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium rounded-xl px-3 py-2 transition-colors hover:opacity-80"
            style={{
              color: colors.textSecondary,
              backgroundColor: `${colors.accent}0a`,
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </div>
      )}
      <main className="flex-1 w-full">{children}</main>
      <ClassicFooter isShopList />
    </div>
  );
}
