import type React from "react";
import LandingDocument from "@/features/landing/components/LandingDocument";
import { fontLatin } from "@/shared/fonts/latin";
import { fontBengali } from "@/shared/fonts/bengali";
import { cn } from "@/shared/lib/utils";

export default function BanglaLayout({ children }: { children: React.ReactNode }) {
  return (
    <LandingDocument locale="bn" fontClassName={cn(fontLatin.variable, fontBengali.variable)}>
      {children}
    </LandingDocument>
  );
}
