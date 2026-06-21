"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { useShop } from "@/app/context/ShopContext";
import { useShopCatalog } from "@/hooks/useShopCatalog";
import { useStoreTheme } from "@/hooks/useStoreTheme";
import ModernDarkHeader from "../ModernDarkHeader";
import ModernDarkFooter from "../ModernDarkFooter";
import ModernDarkSectionHeading from "./ModernDarkSectionHeading";
import ModernDarkProductCard from "./ModernDarkProductCard";
import NoDataFound from "@/components/common/NoDataFound";

export default function ModernDarkShop() {
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
      style={{ ...cssVars, backgroundColor: pageBackground, color: colors.text }}
    >
      <ModernDarkHeader />
      <main className={`flex-1 ${maxWidth} mx-auto w-full px-6 py-12 sm:py-16`}>
        <ModernDarkSectionHeading
          title={commerce.shopTitle}
          subtitle={`${filteredProducts.length} PREMIUM ITEMS`}
        />

        <div
          className="flex flex-col lg:flex-row gap-4 mb-10 p-6 border-2"
          style={{ borderColor: colors.border, backgroundColor: colors.secondaryBg }}
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none"
              style={{ color: colors.textSecondary }}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH PRODUCTS..."
              className="h-14 pl-12 rounded-none border-2 uppercase tracking-wide font-medium"
              style={inputStyle}
            />
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger
              className="w-full lg:w-64 h-14 rounded-none border-2 uppercase tracking-wide font-bold"
              style={inputStyle}
            >
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
          <div className="flex flex-wrap gap-6 mb-12 border-b pb-6" style={{ borderColor: colors.border }}>
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className="text-sm font-bold uppercase tracking-widest transition-all pb-1"
                  style={{
                    color: active ? colors.accent : colors.textSecondary,
                    borderBottom: active ? `2px solid ${colors.accent}` : "2px solid transparent",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {productsError ? (
          <p
            className="p-10 text-center text-xl font-bold uppercase"
            style={{ color: colors.accent }}
          >
            Failed to load products
          </p>
        ) : filteredProducts.length === 0 ? (
          <NoDataFound title="No products found" />
        ) : (
          <div className={`grid gap-8 ${commerce.productGrid}`}>
            {filteredProducts.map((product) => (
              <ModernDarkProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <ModernDarkFooter isShopList />
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
        }}
      />
    </div>
  );
}
