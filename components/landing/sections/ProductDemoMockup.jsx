"use client";

import { useEffect, useState } from "react";
import { DEMO_CHAT } from "@/constants/landing/content";
import { Bot, Send, Sparkles } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";
import { cn } from "@/lib/utils";

export function ProductDemoMockup({ animated = false, onDark = false }) {
  const [step, setStep] = useState(animated ? 0 : 3);

  useEffect(() => {
    if (!animated) return;
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [animated]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-xl",
        onDark
          ? "border-green-400/25 bg-[#1a1d21] shadow-green-400/10"
          : "border-green-400/25 bg-card shadow-green-400/10"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b px-4 py-2.5",
          onDark ? "border-white/10 bg-white/5" : "border-border bg-muted/50"
        )}
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <span className={cn("ml-1 truncate text-xs", onDark ? "text-zinc-500" : "text-muted-foreground")}>
          uddoktahut.com/dashboard/analytics
        </span>
        <StatusBadge status="live" className="ml-auto hidden shrink-0 sm:inline-flex" />
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-green-400">
          <Sparkles className="h-4 w-4" />
          AI Business Copilot
        </div>

        {step >= 1 && (
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-green-400 px-3.5 py-2.5 text-sm font-medium text-green-900">
              {DEMO_CHAT.question}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div
              className={cn(
                "flex items-center rounded-2xl rounded-bl-sm border px-3.5 py-2.5",
                onDark ? "border-white/10 bg-white/5" : "border-border bg-muted"
              )}
            >
              <span className="inline-flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={cn("h-1.5 w-1.5 rounded-full bg-green-400", i > 0 && "opacity-40")}
                  />
                ))}
              </span>
            </div>
          </div>
        )}

        {step >= 3 && (
          <div className="flex gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div
              className={cn(
                "max-w-[90%] rounded-2xl rounded-bl-sm border px-3.5 py-2.5 text-sm leading-relaxed",
                onDark
                  ? "border-green-400/20 bg-white/5 text-zinc-200"
                  : "border-green-400/20 bg-muted/50"
              )}
            >
              {DEMO_CHAT.answer}
            </div>
          </div>
        )}

        <div
          className={cn(
            "flex items-center gap-2 rounded-xl border px-3 py-2.5",
            onDark ? "border-white/10 bg-[#131619]" : "border-border bg-background"
          )}
        >
          <span className={cn("flex-1 text-sm", onDark ? "text-zinc-500" : "text-muted-foreground")}>
            আপনার ব্যবসা সম্পর্কে জিজ্ঞেস করুন...
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-400/15">
            <Send className="h-4 w-4 text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
