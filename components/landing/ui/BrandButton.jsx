import Link from "next/link";
import { cn } from "@/lib/utils";
import { landing } from "../landing-tokens";

export function BrandButton({ href, children, variant = "primary", className }) {
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
