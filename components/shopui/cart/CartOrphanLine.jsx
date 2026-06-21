"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function CartOrphanLine({ line, onRemove }) {
  const { colors } = useStoreTheme();

  return (
    <div
      className="flex items-center justify-between gap-4 py-4 border-b last:border-0 rounded-xl px-3"
      style={{
        borderColor: colors.border,
        backgroundColor: `${colors.accent}11`,
      }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-destructive">
          Product #{line.productId} is no longer available
        </p>
        <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
          Qty: {line.quantity} — remove to continue checkout
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="shrink-0 hover:text-destructive"
        style={{ color: colors.textSecondary }}
        onClick={() => onRemove(line.productId)}
        aria-label="Remove unavailable item"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
