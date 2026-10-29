import type React from "react";
import type { Locale } from "@/i18n/config";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import AppDocument from "@/shared/components/AppDocument";

export default async function LandingDocument({ locale, fontClassName, children }: {
  locale: Locale;
  fontClassName?: string;
  children: React.ReactNode;
}) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <AppDocument lang={locale} fontClassName={fontClassName}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </AppDocument>
  );
}
