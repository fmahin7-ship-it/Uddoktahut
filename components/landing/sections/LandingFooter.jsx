import Link from "next/link";
import { FOOTER_CONTENT } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { BrandLogo } from "../ui/BrandLogo";
import { cn } from "@/lib/utils";

const FOOTER_COLUMNS = [
  { id: "product", title: "প্রোডাক্ট", links: FOOTER_CONTENT.product },
  { id: "company", title: "কোম্পানি", links: FOOTER_CONTENT.company },
  { id: "legal", title: "লিগ্যাল", links: FOOTER_CONTENT.legal },
];

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-500 bg-dark-200 px-4 py-10 text-dark-700 sm:px-6">
      <div className={cn(landing.container, "grid gap-6 sm:grid-cols-2 lg:grid-cols-4")}>
        <div className="sm:col-span-2 lg:col-span-1">
          <BrandLogo onDark className="w-fit" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed">{FOOTER_CONTENT.tagline}</p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.id}>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-white">
              {col.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={`${col.id}-${link.label}`}>
                  <a href={link.href} className="transition-colors hover:text-green-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className={cn(landing.container, "mt-8 border-t border-dark-500 pt-5 text-center text-sm")}>
        © {year} UddoktaHut. সর্বস্বত্ব সংরক্ষিত।
      </p>
    </footer>
  );
}
