import type React from "react";
import LandingDocument from "@/features/landing/components/LandingDocument";
import { fontLatin } from "@/shared/fonts/latin";
import { fontBengaliLazy } from "@/shared/fonts/bengali-lazy";
import { cn } from "@/shared/lib/utils";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <LandingDocument locale="en" fontClassName={cn(fontLatin.variable, fontBengaliLazy.variable)}>
      {children}
    </LandingDocument>
  );
}
