import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COMPANY } from "@/constants/company";

export const LEGAL_LAST_UPDATED = "14 October 2026";

export function LegalPage({ title, children }) {
  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:py-14">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {COMPANY.name}
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {LEGAL_LAST_UPDATED}</p>

        <div className="mt-8 space-y-8 text-[15px] leading-7 text-foreground/90">{children}</div>

        <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>
            {COMPANY.legalName}
            {COMPANY.abn && ` · ABN ${COMPANY.abn}`} · {COMPANY.location}
          </p>
          <p className="mt-1">
            Questions?{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-green-600 hover:underline dark:text-green-400">
              {COMPANY.email}
            </a>
          </p>
        </footer>
      </article>
    </main>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export function LegalList({ items }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
