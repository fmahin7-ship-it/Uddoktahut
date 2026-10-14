import { Noto_Sans_Bengali } from "next/font/google";

// Not preloaded: the browser only fetches it if Bangla glyphs actually render (unicode-range).
export const fontBengaliLazy = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
  preload: false,
});
