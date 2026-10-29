import type React from "react";
import AppDocument from "@/shared/components/AppDocument";
import { fontLatin } from "@/shared/fonts/latin";
import { fontBengaliLazy } from "@/shared/fonts/bengali-lazy";
import { cn } from "@/shared/lib/utils";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppDocument lang="en" fontClassName={cn(fontLatin.variable, fontBengaliLazy.variable)}>
      {children}
    </AppDocument>
  );
}
