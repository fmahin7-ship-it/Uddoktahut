import Link from "next/link";
import AppDocument from "@/shared/components/AppDocument";
import { fontLatin } from "@/shared/fonts/latin";
import { fontBengaliLazy } from "@/shared/fonts/bengali-lazy";
import { cn } from "@/shared/lib/utils";

// The root layout is a passthrough, so the global 404 renders its own document.
export default function NotFound() {
  return (
    <AppDocument lang="en" fontClassName={cn(fontLatin.variable, fontBengaliLazy.variable)}>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>⚠️ Page Not Found</h1>
        <p>The page you requested does not exist.</p>
        <Link href="/">Go Back Home</Link>
      </div>
    </AppDocument>
  );
}
