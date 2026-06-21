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
import BoutiqueHeader from "./BoutiqueHeader";
import BoutiqueFooter from "./BoutiqueFooter";
import BoutiqueSectionHeading from "./BoutiqueSectionHeading";
import BoutiqueProductCard from "./BoutiqueProductCard";
import NoDataFound from "@/components/common/NoDataFound";

export default function BoutiqueShop() {
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
      <BoutiqueHeader />
      <main className={`flex-1 ${maxWidth} mx-auto w-full px-6 py-10 sm:py-14`}>
        <BoutiqueSectionHeading
          title={commerce.shopTitle}
          subtitle={`${filteredProducts.length} exquisite pieces`}
        />

        <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
              style={{ color: colors.textSecondary }}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the collection..."
              className="h-12 pl-11 rounded-full border font-serif"
              style={inputStyle}
            />
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-48 h-12 rounded-full font-serif" style={inputStyle}>
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
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className="rounded-full px-5 py-2 text-sm font-serif transition-all"
                  style={{
                    backgroundColor: active ? colors.accent : "transparent",
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
          <p className="text-center italic" style={{ color: colors.accent }}>
            Could not load products.
          </p>
        ) : filteredProducts.length === 0 ? (
          <NoDataFound title="No products found" />
        ) : (
          <div className={`grid gap-8 ${commerce.productGrid}`}>
            {filteredProducts.map((product) => (
              <BoutiqueProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <BoutiqueFooter isShopList />
    </div>
  );
}
