"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function ReturnFormModal({
  order,
  open,
  onClose,
  onSubmit,
  isPending,
}) {
  const [reason, setReason] = useState("");
  const [lines, setLines] = useState(() =>
    (order?.OrderItems || []).map((item) => ({
      orderItemId: item.id,
      productName: item.product_name,
      maxQty: item.quantity,
      quantityReturned: item.quantity,
      restock: true,
    }))
  );

  if (!open || !order) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      reason: reason || undefined,
      items: lines
        .filter((line) => line.quantityReturned > 0)
        .map((line) => ({
          orderItemId: line.orderItemId,
          quantityReturned: line.quantityReturned,
          restock: line.restock,
        })),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-xl border shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-lg font-semibold mb-4">Create return</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="reason">Reason (optional)</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-3">
            {lines.map((line, index) => (
              <div
                key={line.orderItemId}
                className="rounded-lg border p-3 space-y-2"
              >
                <p className="text-sm font-medium">{line.productName}</p>
                <div className="flex items-center gap-3">
                  <Label className="text-xs">Qty to return</Label>
                  <Input
                    type="number"
                    min={0}
                    max={line.maxQty}
                    value={line.quantityReturned}
                    onChange={(e) => {
                      const next = [...lines];
                      next[index] = {
                        ...line,
                        quantityReturned: Math.min(
                          line.maxQty,
                          Math.max(0, Number(e.target.value))
                        ),
                      };
                      setLines(next);
                    }}
                    className="w-20 h-8"
                  />
                  <span className="text-xs text-muted-foreground">
                    / {line.maxQty}
                  </span>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={line.restock}
                    onCheckedChange={(checked) => {
                      const next = [...lines];
                      next[index] = { ...line, restock: Boolean(checked) };
                      setLines(next);
                    }}
                  />
                  Restock inventory
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create return"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
