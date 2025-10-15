"use client";

import { useShop } from "@/app/context/ShopContext";
import { useTemplateConfig } from "@/hooks/useTemplateConfig";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingBag, Eye } from "lucide-react";

export default function ModernDarkFeatureProducts({ deliverySystem }) {
  const { products, productsError } = useShop();
  const { colors, typography } = useTemplateConfig();

  let content;
  if (productsError && products.length === 0) {
    content = (
      <div className="col-span-full text-center py-12">
        <p className="text-xl font-medium" style={{ color: colors.accent }}>
          Failed to load products: {productsError}
        </p>
      </div>
    );
  } else if (!productsError && products.length === 0) {
    content = (
      <div className="col-span-full text-center py-12">
        <p className="text-xl" style={{ color: colors.textSecondary }}>
          No featured products found.
        </p>
      </div>
    );
  } else {
    content = products.map((item, index) => (
      <Card
        key={item.id || index}
        className="group overflow-hidden border-0 transition-all duration-500 hover:scale-105"
        style={{
          backgroundColor: colors.cardBg,
          boxShadow: `0 4px 20px ${colors.background}40`,
        }}
      >
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="relative w-full aspect-[4/5] bg-neutral-800">
            <Image
              src={item.image || deliverySystem}
              alt={item.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
            />

            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
              <Button
                size="icon"
                className="rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.background,
                }}
              >
                <Eye className="w-5 h-5" />
              </Button>

              <Button
                size="icon"
                className="rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: colors.cta,
                  color: colors.background,
                }}
              >
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </div>

            {/* Price Badge */}
            <div
              className="absolute top-4 right-4 px-3 py-1 rounded-full font-bold text-sm"
              style={{
                backgroundColor: colors.accent,
                color: colors.background,
              }}
            >
              {item.price ? `$${item.price}` : "PREMIUM"}
            </div>
          </div>

          {/* Product Info */}
          <CardContent className="p-6">
            <h3
              className="text-lg font-bold mb-2 uppercase tracking-wider"
              style={{
                color: colors.text,
                fontWeight: typography.headingWeight,
              }}
            >
              {item.name}
            </h3>

            <div className="flex items-center justify-between">
              <span
                className="text-sm uppercase tracking-widest"
                style={{ color: colors.textSecondary }}
              >
                PREMIUM COLLECTION
              </span>

              <div
                className="w-8 h-px"
                style={{ backgroundColor: colors.accent }}
              ></div>
            </div>
          </CardContent>
        </div>
      </Card>
    ));
  }

  return (
    <section
      className="px-6 py-20"
      style={{ backgroundColor: colors.secondaryBg }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
            style={{
              color: colors.text,
              fontWeight: typography.headingWeight,
            }}
          >
            FEATURED
          </h2>

          <div
            className="w-24 h-1 mx-auto mb-6"
            style={{ backgroundColor: colors.accent }}
          ></div>

          <p
            className="text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: colors.textSecondary }}
          >
            Discover our handpicked selection of extraordinary products
          </p>
        </div>

        {/* Products Grid - Masonry Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {content}
        </div>
      </div>
    </section>
  );
}
