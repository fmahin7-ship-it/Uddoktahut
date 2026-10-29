import { useTranslations } from "next-intl";
import { landing } from "@/features/landing/components/landing-tokens";
import { Marquee } from "@/features/landing/components/ui/Marquee";

export function TrustStrip() {
  const t = useTranslations("Landing.trust");

  return (
    <section className="border-y border-green-400/15 bg-muted/40 py-3.5">
      <div className={landing.container}>
        <Marquee items={t.raw("items") as string[]} />
      </div>
    </section>
  );
}
