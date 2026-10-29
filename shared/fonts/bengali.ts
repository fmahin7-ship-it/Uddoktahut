import { Noto_Sans_Bengali } from "next/font/google";

// Preloaded — only import this from the /bn layout. Everywhere else use bengali-lazy.
export const fontBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});
