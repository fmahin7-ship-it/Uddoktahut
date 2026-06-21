"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useStoreTheme } from "@/hooks/useStoreTheme";

export default function CartLineItem({ line, onUpdateQuantity, onRemove }) {
  const { colors } = useStoreTheme();

  return (
    <div
      className="flex gap-4 py-4 border-b last:border-0"
      style={{ borderColor: colors.border }}
    >
      <div
        className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden"
        style={{ backgroundColor: colors.secondaryBg }}
      >
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
          <div
            className="w-full h-full flex items-center justify-center text-xs"
            style={{ color: colors.textSecondary }}
          >
            No image
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm line-clamp-2" style={{ color: colors.text }}>
          {line.name}
        </h3>
        <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
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
              className="h-8 w-8 rounded-lg"
              style={{ borderColor: colors.border, color: colors.text }}
              onClick={() => onUpdateQuantity(line.productId, line.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span
              className="w-8 text-center text-sm font-medium"
              style={{ color: colors.text }}
            >
              {line.quantity}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg"
              style={{ borderColor: colors.border, color: colors.text }}
              onClick={() => onUpdateQuantity(line.productId, line.quantity + 1)}
              disabled={line.quantity >= line.stock}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm" style={{ color: colors.accent }}>
              {formatPrice(line.lineTotal)}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:text-destructive"
              style={{ color: colors.textSecondary }}
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
