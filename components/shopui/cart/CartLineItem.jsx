"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function CartLineItem({ line, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-0">
      <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-muted">
        {line.image ? (
          <Image
            src={line.image}
            alt={line.name}
            fill
            className="object-cover"
            sizes="80px"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm line-clamp-2">{line.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {formatPrice(line.unitPrice)} each
        </p>
        {line.stock < line.quantity && (
          <p className="text-xs text-destructive mt-1">
            Only {line.stock} in stock
          </p>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(line.productId, line.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {line.quantity}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(line.productId, line.quantity + 1)}
              disabled={line.quantity >= line.stock}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm">
              {formatPrice(line.lineTotal)}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(line.productId)}
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
