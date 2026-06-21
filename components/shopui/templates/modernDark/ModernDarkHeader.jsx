"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { capitalizeWords } from "@/lib/utils";
import { useShop } from "@/app/context/ShopContext";
import { useTemplateConfig } from "@/hooks/useTemplateConfig";
import CartNavButton from "@/components/shopui/layout/CartNavButton";

export default function ModernDarkHeader({ sheet = false }) {
  const { shop } = useShop();
  const { colors, typography } = useTemplateConfig();
  const { store_name } = shop;

  return (
    <header
      className="w-full py-4 text-sm sticky top-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: `${colors.background}ee`,
        borderBottomColor: colors.border,
      }}
    >
      <div className="px-6 mx-auto flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-3">
          {sheet && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden rounded-none">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                style={{ backgroundColor: colors.cardBg }}
              >
                <nav className="mt-6 flex flex-col gap-4 uppercase tracking-widest font-bold">
                  <Link href="/" style={{ color: colors.text }}>Home</Link>
                  <Link href="/shop" style={{ color: colors.text }}>Collection</Link>
                  <Link href="/cart" style={{ color: colors.text }}>Cart</Link>
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <Link href="/">
            <h1
              className="text-2xl sm:text-3xl font-black tracking-wider uppercase"
              style={{
                color: colors.accent,
                fontWeight: typography.headingWeight,
              }}
            >
              {capitalizeWords(store_name)}
            </h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-lg font-medium hover:underline underline-offset-4 transition-all uppercase"
            style={{ color: colors.text }}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-lg font-medium hover:underline underline-offset-4 transition-all uppercase"
            style={{ color: colors.text }}
          >
            Collection
          </Link>
          <Link
            href="/cart"
            className="text-lg font-medium hover:underline underline-offset-4 transition-all uppercase"
            style={{ color: colors.text }}
          >
            Cart
          </Link>
        </nav>

        <CartNavButton
          buttonVariant="ghost"
          className="hover:bg-transparent rounded-none"
          badgeClassName="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full text-xs flex items-center justify-center font-bold"
          badgeStyle={{
            backgroundColor: colors.accent,
            color: colors.background,
          }}
        />
      </div>
    </header>
  );
}
