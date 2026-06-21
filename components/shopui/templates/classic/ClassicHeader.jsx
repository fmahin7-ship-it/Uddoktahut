"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { capitalizeWords } from "@/lib/utils";
import { useShop } from "@/app/context/ShopContext";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import CartNavButton from "@/components/shopui/layout/CartNavButton";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
];

export default function ClassicHeader() {
  const { shop } = useShop();
  const { colors, typography } = useStoreTheme();
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/" || pathname.match(/\/store\/[^/]+\/?$/);
    }
    return pathname.includes(href);
  };

  return (
    <header
      className="w-full sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        backgroundColor: `${colors.cardBg}e8`,
        borderColor: colors.border,
      }}
    >
      <div className="px-6 h-16 mx-auto flex justify-between items-center max-w-6xl">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-xl"
                style={{ color: colors.text }}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-72"
              style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}
            >
              <p
                className="text-lg font-bold mt-2 mb-6"
                style={{ color: colors.accent }}
              >
                {capitalizeWords(shop?.store_name)}
              </p>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-3 py-2.5 text-base font-medium transition-colors"
                    style={{
                      color: isActive(link.href) ? colors.accent : colors.text,
                      backgroundColor: isActive(link.href)
                        ? `${colors.accent}12`
                        : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="h-9 w-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ backgroundColor: colors.accent }}
            >
              {(shop?.store_name || "S").charAt(0).toUpperCase()}
            </div>
            <h1
              className="text-lg sm:text-xl font-bold tracking-tight hidden sm:block"
              style={{
                color: colors.text,
                fontWeight: typography.headingWeight,
              }}
            >
              {capitalizeWords(shop?.store_name)}
            </h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{
                color: isActive(link.href) ? colors.accent : colors.textSecondary,
                backgroundColor: isActive(link.href)
                  ? `${colors.accent}12`
                  : "transparent",
                fontWeight: isActive(link.href) ? 600 : 500,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <CartNavButton
          className="rounded-xl"
          badgeStyle={{
            backgroundColor: colors.accent,
            color: "#ffffff",
          }}
        />
      </div>
    </header>
  );
}
