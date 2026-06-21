"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useShop } from "@/app/context/ShopContext";
import { capitalizeWords } from "@/lib/utils";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import StorePrimaryButton from "@/components/shopui/common/StorePrimaryButton";

export default function ClassicHero({ deliverySystem }) {
  const { shop, products } = useShop();
  const { colors, typography } = useStoreTheme();
  const heroImage = products[0]?.image || deliverySystem;
  const storeName = capitalizeWords(shop?.store_name || "Our Store");

  return (
    <section className="relative px-6 pt-10 pb-16 sm:pt-14 sm:pb-20 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="order-2 lg:order-1">
          <p
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-5"
            style={{
              backgroundColor: `${colors.accent}14`,
              color: colors.accent,
            }}
          >
            Welcome to {storeName}
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.1] mb-5"
            style={{
              color: colors.text,
              fontWeight: typography.headingWeight,
            }}
          >
            Shop smarter.
            <br />
            <span style={{ color: colors.accent }}>Delivered to your door.</span>
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            style={{ color: colors.textSecondary }}
          >
            Browse curated products, add to cart in seconds, and pay cash on
            delivery — simple shopping built for your neighborhood store.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <StorePrimaryButton asChild className="h-12 px-8 rounded-xl text-base">
              <Link href="/shop" className="inline-flex items-center gap-2">
                Browse collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </StorePrimaryButton>
            <StorePrimaryButton
              asChild
              variant="outline"
              className="h-12 px-8 rounded-xl text-base"
            >
              <Link href="/cart">View cart</Link>
            </StorePrimaryButton>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div
            className="relative aspect-[4/3] sm:aspect-square lg:aspect-[5/4] rounded-3xl overflow-hidden border shadow-xl"
            style={{ borderColor: colors.border }}
          >
            <Image
              src={heroImage}
              alt={`${storeName} showcase`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, transparent 40%, ${colors.accent}22 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
