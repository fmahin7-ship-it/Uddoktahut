import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import AppDocument from "@/components/common/AppDocument";

export default async function LandingDocument({ locale, fontClassName, children }) {
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
