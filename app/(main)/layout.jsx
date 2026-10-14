import AppDocument from "@/components/common/AppDocument";
import { fontLatin } from "@/lib/fonts/latin";
import { fontBengaliLazy } from "@/lib/fonts/bengali-lazy";
import { cn } from "@/lib/utils";

export default function MainLayout({ children }) {
  return (
    <AppDocument lang="en" fontClassName={cn(fontLatin.variable, fontBengaliLazy.variable)}>
      {children}
    </AppDocument>
  );
}
