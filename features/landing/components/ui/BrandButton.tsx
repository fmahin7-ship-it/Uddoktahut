import type React from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { landing } from "@/features/landing/components/landing-tokens";

export function BrandButton({ href, children, variant = "primary", className }: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const classNames = cn(
    variant === "primary" ? landing.btnPrimary : landing.btnSecondary,
    className
  );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}
