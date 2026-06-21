"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
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
        <div className="flex items-center">
          {sheet && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                style={{ backgroundColor: colors.cardBg }}
              >
                <div className="mt-4 space-y-2">
                  <p
                    className="text-lg font-semibold"
                    style={{ color: colors.text }}
                  >
                    Menu
                  </p>
                  {/* Add nav links here */}
                </div>
              </SheetContent>
            </Sheet>
          )}

          <h1
            className="text-3xl font-black tracking-wider uppercase"
            style={{
              color: colors.accent,
              fontWeight: typography.headingWeight,
            }}
          >
            {capitalizeWords(store_name)}
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-lg font-medium hover:underline underline-offset-4 transition-all"
            style={{ color: colors.text }}
          >
            HOME
          </Link>
          <Link
            href="/shop"
            className="text-lg font-medium hover:underline underline-offset-4 transition-all"
            style={{ color: colors.text }}
          >
            COLLECTION
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium hover:underline underline-offset-4 transition-all"
            style={{ color: colors.text }}
          >
            ABOUT
          </Link>
        </nav>

        <div className="flex gap-4 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent"
            style={{ color: colors.text }}
          >
            <Search className="w-6 h-6" />
          </Button>

          <CartNavButton
            buttonVariant="ghost"
            className="hover:bg-transparent"
            badgeClassName="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full text-xs flex items-center justify-center font-bold"
            badgeStyle={{
              backgroundColor: colors.accent,
              color: colors.background,
            }}
          />
        </div>
      </div>
    </header>
  );
}
