import type React from "react";
import { cn } from "@/shared/lib/utils";
import { landing } from "@/features/landing/components/landing-tokens";

export function SectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  onDark,
}: {
  id?: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div
      id={id}
      className={cn(
        landing.headerMb,
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className={onDark ? landing.eyebrowOnDark : landing.eyebrow}>{eyebrow}</p>
      )}
      <h2 className={cn(landing.title, onDark ? "text-zinc-50" : "text-foreground")}>
        {title}
      </h2>
      {subtitle && (
        <p className={onDark ? landing.subtitleOnDark : landing.subtitle}>{subtitle}</p>
      )}
      {align === "center" && !onDark && <div className={landing.divider} />}
    </div>
  );
}
