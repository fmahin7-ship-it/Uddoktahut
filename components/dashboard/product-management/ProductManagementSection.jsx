"use client";
import { Children } from "react";
import { useModal } from "@/app/context/ModalContext";
import { Button } from "@/components/ui/button";
import { CTA_HOVER_COLOR } from "@/constants/colors";
import { ProductList } from "@/components/dashboard/product-management/ProductList";

export default function ProductManagementSection({ children, storeUrl }) {
  const childArray = Children.toArray(children);
  const { openModal } = useModal();
  return (
    <div className="max-w-5xl w-full mx-auto bg-white/90 dark:bg-[var(--color-dark-400)] rounded-2xl shadow-xl p-2 sm:p-4 md:p-8 border border-gray-100 dark:border-[var(--color-dark-600)] mt-10 md:mt-16 transition-colors">
      <div className="flex flex-col md:flex-row items-stretch md:items-start justify-between mb-6 gap-4 md:gap-4">
        <div className="flex-1 flex flex-col gap-2">{childArray[0]}</div>
        <div className="flex flex-col gap-2 w-full md:w-auto min-w-[160px] items-stretch md:items-end">
          <Button
            className={`w-full px-6 py-2 font-bold text-green-900 dark:text-green-100 shadow bg-green-400 dark:bg-green-700 hover:bg-[${CTA_HOVER_COLOR}] dark:hover:bg-green-600 cursor-pointer transition-colors`}
            onClick={() => openModal("addProduct")}
          >
            Add Product
          </Button>
          {childArray[1]}
        </div>
      </div>
      <ProductList storeUrl={storeUrl} />
    </div>
  );
}
