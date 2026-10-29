import { Noto_Sans } from "next/font/google";

export const fontLatin = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-latin",
  display: "swap",
});
