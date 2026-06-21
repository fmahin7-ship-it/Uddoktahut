"use client";

import Link from "next/link";
import { useCurrentYear } from "@/hooks/useCurrentYear";
import { useShop } from "@/app/context/ShopContext";
import { capitalizeWords } from "@/lib/utils";
import { useStoreTheme } from "@/hooks/useStoreTheme";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Cart" },
];

export default function ClassicFooter({ isShopList = true }) {
  const currentYear = useCurrentYear();
  const { shop } = useShop();
  const { colors } = useStoreTheme();
  const storeName = capitalizeWords(shop?.store_name || "Store");

  return (
    <footer
      className="w-full border-t mt-auto"
      style={{
        borderColor: colors.border,
        backgroundColor: colors.cardBg,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div className="sm:col-span-1">
            <p
              className="text-lg font-bold tracking-tight mb-2"
              style={{ color: colors.accent }}
            >
              {storeName}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
              Your neighborhood store, online. Order today, pay on delivery.
            </p>
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: colors.textSecondary }}
            >
              Navigate
            </p>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:underline underline-offset-4 transition-colors"
                    style={{ color: colors.text }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: colors.textSecondary }}
            >
              Support
            </p>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Questions about your order? Contact the store directly after
              checkout — we will call to confirm.
            </p>
          </div>
        </div>

        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-sm"
          style={{ borderColor: colors.border, color: colors.textSecondary }}
        >
          <span>&copy; {currentYear} {storeName}</span>
          {!isShopList && (
            <span>
              Powered by{" "}
              <span className="font-semibold" style={{ color: colors.accent }}>
                UddoktaHut
              </span>
            </span>
          )}
          {isShopList && (
            <span>
              Built with{" "}
              <span className="font-semibold" style={{ color: colors.accent }}>
                UddoktaHut
              </span>
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
