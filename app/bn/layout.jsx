import LandingDocument from "@/components/landing/LandingDocument";
import { fontLatin } from "@/lib/fonts/latin";
import { fontBengali } from "@/lib/fonts/bengali";
import { cn } from "@/lib/utils";

export default function BanglaLayout({ children }) {
  return (
    <LandingDocument locale="bn" fontClassName={cn(fontLatin.variable, fontBengali.variable)}>
      {children}
    </LandingDocument>
  );
}
