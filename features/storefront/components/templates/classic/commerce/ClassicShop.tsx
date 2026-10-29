"use client";

import type { SortOption } from "@/features/storefront/hooks/useShopCatalog";
import { Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/shared/ui/select";
import { useShop } from "@/shared/providers/shop-provider";
import { useShopCatalog } from "@/features/storefront/hooks/useShopCatalog";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";
import ClassicHeader from "@/features/storefront/components/templates/classic/ClassicHeader";
import ClassicFooter from "@/features/storefront/components/templates/classic/ClassicFooter";
import ClassicSectionHeading from "@/features/storefront/components/templates/classic/commerce/ClassicSectionHeading";
import ClassicProductCard from "@/features/storefront/components/templates/classic/commerce/ClassicProductCard";
import NoDataFound from "@/shared/components/NoDataFound";

export default function ClassicShop() {
  const { products, productsError } = useShop();
  const { colors, cssVars, pageBackground, fontClass, maxWidth, commerce, inputStyle } =
    useStoreTheme();
  const {
    search,
    setSearch,
    sort,
    setSort,
    category,
    setCategory,
    categories,
    filteredProducts,
    sortOptions,
  } = useShopCatalog(products);

  return (
    <div
      className={`min-h-screen flex flex-col ${fontClass}`}
      style={{ ...cssVars, background: pageBackground, color: colors.text }}
    >
      <ClassicHeader />
      <main className={`flex-1 ${maxWidth} mx-auto w-full px-6 py-8 sm:py-10`}>
        <ClassicSectionHeading
          title={commerce.shopTitle}
          subtitle={`${filteredProducts.length} item${filteredProducts.length === 1 ? "" : "s"} available`}
        />

        <div className="flex flex-col lg:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
              style={{ color: colors.textSecondary }}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="h-12 pl-10 rounded-xl border"
              style={inputStyle}
            />
          </div>
          <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
            <SelectTrigger className="w-full lg:w-56 h-12 rounded-xl" style={inputStyle}>
              {sortOptions.find((o) => o.value === sort)?.label}
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className="rounded-full px-4 py-2 text-sm font-medium transition-all"
                  style={{
                    backgroundColor: active ? colors.accent : colors.cardBg,
                    color: active ? "#ffffff" : colors.textSecondary,
                    border: `1px solid ${active ? colors.accent : colors.border}`,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {productsError ? (
          <p className="p-8 text-center text-destructive rounded-2xl border border-destructive/20 bg-destructive/5">
            Could not load products. Please try again later.
          </p>
        ) : filteredProducts.length === 0 ? (
          <NoDataFound title="No products found" />
        ) : (
          <div className={`grid gap-5 ${commerce.productGrid}`}>
            {filteredProducts.map((product) => (
              <ClassicProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <ClassicFooter isShopList />
    </div>
  );
}
