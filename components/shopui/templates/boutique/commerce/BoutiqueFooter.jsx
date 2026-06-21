"use client";

import Link from "next/link";
import { useCurrentYear } from "@/hooks/useCurrentYear";
import { useShop } from "@/app/context/ShopContext";
import { capitalizeWords } from "@/lib/utils";
import { useTemplateConfig } from "@/hooks/useTemplateConfig";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Cart" },
];

export default function BoutiqueFooter() {
  const currentYear = useCurrentYear();
  const { shop } = useShop();
  const { colors } = useTemplateConfig();
  const storeName = capitalizeWords(shop?.store_name || "Store");

  return (
    <footer
      className="w-full border-t mt-auto font-serif"
      style={{ borderColor: colors.border, backgroundColor: colors.secondaryBg }}
    >
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <p className="text-2xl italic mb-6" style={{ color: colors.accent }}>
          {storeName}
        </p>
        <nav className="flex flex-wrap justify-center gap-6 mb-8">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:italic transition-all"
              style={{ color: colors.text }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          &copy; {currentYear} · Crafted with{" "}
          <span style={{ color: colors.accent }}>UddoktaHut</span>
        </p>
      </div>
    </footer>
  );
}
