import { cn } from "@/lib/utils";

export function Marquee({ items, className }) {
  const doubled = [...items, ...items];

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-muted/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-muted/40 to-transparent" />
      <div className="landing-marquee-x flex w-max gap-10">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-medium text-foreground/70"
          >
            <span className="h-2 w-2 rounded-full bg-green-400" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
