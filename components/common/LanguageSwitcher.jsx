"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { LOCALES, LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from "@/i18n/config";
import { cn } from "@/lib/utils";

function rememberLocale(locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}

export function LanguageSwitcher({ className }) {
  const current = useLocale();
  const t = useTranslations("Common.language");

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn("inline-flex items-center gap-0.5 rounded-lg border border-border p-0.5", className)}
    >
      <Languages className="mx-1 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      {LOCALES.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={`/${locale}`}
            hrefLang={locale}
            lang={locale}
            aria-current={active ? "true" : undefined}
            onClick={() => rememberLocale(locale)}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
              active
                ? "bg-green-400/20 text-green-700 dark:text-green-400"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t(locale)}
          </Link>
        );
      })}
    </div>
  );
}
