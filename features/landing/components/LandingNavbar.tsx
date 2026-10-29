"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { LANDING_NAV_LINKS } from "@/features/landing/content";
import { landing } from "@/features/landing/components/landing-tokens";
import { ModeToggle } from "@/shared/components/ModeToggle";
import { LanguageSwitcher } from "@/features/landing/components/LanguageSwitcher";
import { Button } from "@/shared/ui/button";
import { BrandLogo } from "@/features/landing/components/ui/BrandLogo";
import { cn } from "@/shared/lib/utils";

export function LandingNavbar() {
  const t = useTranslations("Landing.nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border/60 bg-background/98 shadow-sm backdrop-blur-sm sm:bg-background/95 sm:backdrop-blur-md"
          : "border-transparent bg-background/90"
      )}
    >
      <div className="px-4 sm:px-6">
        <div
          className={cn(
            landing.container,
            "flex h-14 items-center justify-between gap-3 sm:h-16"
          )}
        >
          <BrandLogo className="min-w-0 shrink-0" />

          <nav className="hidden items-center gap-1 lg:flex">
            {LANDING_NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-green-600 dark:hover:text-green-400"
              >
                {t(link.id)}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <ModeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">{t("login")}</Link>
            </Button>
            <Button size="sm" className="bg-green-400 font-semibold text-green-900 hover:bg-[#05f27c]" asChild>
              <Link href="/signup">{t("signup")}</Link>
            </Button>
          </div>

          <button
            type="button"
            className="-mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-md lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={t("menu")}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-border bg-background px-4 sm:px-6 lg:hidden">
          <nav className={cn(landing.container, "flex flex-col gap-1 py-3")}>
            {LANDING_NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium hover:bg-green-400/10"
              >
                {t(link.id)}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <div className="flex items-center justify-between px-3">
                <LanguageSwitcher />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{t("theme")}</span>
                  <ModeToggle />
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/login">{t("login")}</Link>
              </Button>
              <Button size="sm" className="w-full bg-green-400 font-semibold text-green-900" asChild>
                <Link href="/signup">{t("signup")}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
