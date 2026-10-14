import Link from "next/link";
import { useTranslations } from "next-intl";
import { FOOTER_COLUMNS } from "@/constants/landing/content";
import { COMPANY } from "@/constants/company";
import { landing } from "../landing-tokens";
import { BrandLogo } from "../ui/BrandLogo";
import { cn } from "@/lib/utils";

const linkClass = "transition-colors hover:text-green-400";

function FooterLink({ href, children }) {
  return href.startsWith("/") ? (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  ) : (
    <a href={href} className={linkClass}>
      {children}
    </a>
  );
}

export function LandingFooter() {
  const t = useTranslations("Landing");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-500 bg-dark-200 px-4 py-10 text-dark-700 sm:px-6">
      <div className={cn(landing.container, "grid gap-6 sm:grid-cols-2 lg:grid-cols-4")}>
        <div className="sm:col-span-2 lg:col-span-1">
          <BrandLogo onDark className="w-fit" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed">{t("footer.tagline")}</p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.id}>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-white">
              {t(`footer.columns.${col.id}`)}
            </h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.labelKey}>
                  <FooterLink href={link.href}>{t(link.labelKey)}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className={cn(
          landing.container,
          "mt-8 flex flex-col items-center gap-1 border-t border-dark-500 pt-5 text-center text-sm sm:flex-row sm:justify-between"
        )}
      >
        <p>{t("footer.copyright", { year })}</p>
        <p className="text-xs">
          {COMPANY.abn && <span>{t("footer.abn", { abn: COMPANY.abn })} · </span>}
          {COMPANY.location}
        </p>
      </div>
    </footer>
  );
}
