"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

export default function StoreShell({
  children,
  backHref,
  backLabel = "Back",
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fdfcfb] to-[#f6f4f1] text-neutral-900 font-sans">
      <Header />
      {backHref && (
        <div className="px-6 pt-4 max-w-6xl mx-auto w-full">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </div>
      )}
      <main className="flex-1 w-full">{children}</main>
      <Footer isShopList />
    </div>
  );
}
