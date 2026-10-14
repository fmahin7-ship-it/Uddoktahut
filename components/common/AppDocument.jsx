import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import LoaderTopClient from "@/components/common/LoaderTopClient";
import { cn } from "@/lib/utils";

/**
 * <html>/<body> shell shared by every top-level layout. The root app/layout.jsx is a
 * passthrough so each tree can set its own lang and fonts without going dynamic.
 */
export default function AppDocument({ lang, fontClassName, children }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={cn("min-h-screen font-sans text-[15px] leading-6 antialiased", fontClassName)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LoaderTopClient />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
