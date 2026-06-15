import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import LoaderTopClient from "@/components/common/LoaderTopClient";

const fontSans = Noto_Sans_Bengali({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: "UddoktaHut — AI-চালিত ই-কমার্স SaaS",
  description:
    "বাংলাদেশি উদ্যোক্তাদের জন্য AI-চালিত ই-কমার্স SaaS। অনলাইন স্টোর, AI copilot, টোকেন-ভিত্তিক প্রাইসিং।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sans text-[15px] leading-6 antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LoaderTopClient />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
