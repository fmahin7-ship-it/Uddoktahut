import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandLogo({ className, onDark = false, asLink = true }) {
  const content = (
    <>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-400 text-green-900 shadow-sm shadow-green-400/25 sm:h-8 sm:w-8">
        <ShoppingBag className="h-4 w-4" />
      </span>
      <span
        className={cn(
          "whitespace-nowrap text-[15px] font-semibold leading-none tracking-tight sm:text-base",
          onDark ? "text-white" : "text-foreground"
        )}
      >
        UddoktaHut.
      </span>
    </>
  );

  const classes = cn("flex min-w-0 items-center gap-2", className);

  if (asLink) {
    return (
      <Link href="/" className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
