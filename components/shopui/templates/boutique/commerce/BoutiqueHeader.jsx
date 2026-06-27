"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatStoreDisplayName } from "@/lib/utils";
import { useShop } from "@/app/context/ShopContext";
import { useTemplateConfig } from "@/hooks/useTemplateConfig";
import CartNavButton from "@/components/shopui/layout/CartNavButton";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
];

export default function BoutiqueHeader() {
  const { shop } = useShop();
  const { colors, typography } = useTemplateConfig();
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/" || pathname.match(/\/store\/[^/]+\/?$/);
    return pathname.includes(href);
  };

  return (
    <header
      className="w-full sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        backgroundColor: `${colors.cardBg}ee`,
        borderColor: colors.border,
      }}
    >
      <div className="px-6 h-20 mx-auto flex justify-between items-center max-w-5xl">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                <Menu className="w-5 h-5" style={{ color: colors.text }} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" style={{ backgroundColor: colors.cardBg }}>
              <nav className="mt-8 flex flex-col gap-3 font-serif">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg"
                    style={{ color: isActive(link.href) ? colors.accent : colors.text }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/">
            <h1
              className="text-2xl sm:text-3xl italic"
              style={{ color: colors.accent, fontWeight: typography.headingWeight }}
            >
              {formatStoreDisplayName(shop?.store_name)}
            </h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-10 font-serif text-base">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:opacity-70"
              style={{
                color: isActive(link.href) ? colors.accent : colors.textSecondary,
                fontStyle: isActive(link.href) ? "italic" : "normal",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <CartNavButton
          className="rounded-full"
          badgeStyle={{ backgroundColor: colors.accent, color: "#ffffff" }}
        />
      </div>
    </header>
  );
}
