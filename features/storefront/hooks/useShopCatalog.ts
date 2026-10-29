import type { Product } from "@/shared/api/types";
import { useMemo, useState } from "react";

export type SortOption = "newest" | "price-asc" | "price-desc" | "name";

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
];

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => Number(a.price) - Number(b.price));
    case "price-desc":
      return list.sort((a, b) => Number(b.price) - Number(a.price));
    case "name":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return list;
  }
}

export function useShopCatalog(products: Product[]) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(cats).sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = products;
    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }
    return sortProducts(list, sort);
  }, [products, category, search, sort]);

  return {
    search,
    setSearch,
    sort,
    setSort,
    category,
    setCategory,
    categories,
    filteredProducts,
    sortOptions: SORT_OPTIONS,
  };
}
