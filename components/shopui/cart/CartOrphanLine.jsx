"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartOrphanLine({ line, onRemove }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-border last:border-0 bg-destructive/5 rounded-lg px-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-destructive">
          Product #{line.productId} is no longer available
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Qty: {line.quantity} — remove to continue checkout
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="shrink-0 text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(line.productId)}
        aria-label="Remove unavailable item"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
