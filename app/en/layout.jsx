import LandingDocument from "@/components/landing/LandingDocument";
import { fontLatin } from "@/lib/fonts/latin";
import { fontBengaliLazy } from "@/lib/fonts/bengali-lazy";
import { cn } from "@/lib/utils";

export default function EnglishLayout({ children }) {
  return (
    <LandingDocument locale="en" fontClassName={cn(fontLatin.variable, fontBengaliLazy.variable)}>
      {children}
    </LandingDocument>
  );
}
