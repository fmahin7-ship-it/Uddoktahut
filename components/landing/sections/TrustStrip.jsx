import { TRUST_ITEMS, PARTNER_LABELS } from "@/constants/landing/content";
import { landing } from "../landing-tokens";
import { Marquee } from "../ui/Marquee";

export function TrustStrip() {
  return (
    <section className="border-y border-green-400/15 bg-muted/40 py-3.5">
      <div className={landing.container}>
        <Marquee items={TRUST_ITEMS} className="mb-3" />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            ইন্টিগ্রেশন
          </span>
          {PARTNER_LABELS.map((label) => (
            <span
              key={label}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-green-400/40 hover:text-foreground"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
