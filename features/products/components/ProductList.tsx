"use client";
import type { DataTable as DataTableComponent } from "@/shared/ui/data-table";
import type { Product } from "@/shared/api/types";
import { useProducts, useDeleteProduct } from "@/features/products/hooks";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { useModal } from "@/shared/providers/modal-provider";
import { toast } from "sonner";
import dynamic from "next/dynamic";

import { FORM_MODES, MODAL_TYPES } from "@/shared/constants/formModes";
import TableSkeleton from "@/shared/components/TableSkeleton";
import { createProductColumns } from "@/features/products/columns";
import { useState } from "react";
import { useUser } from "@/shared/providers/user-provider";

const PAGE_SIZE = 5;

// Lazy load ProductForm since it's only used in modals
const ProductForm = dynamic(() => import("@/features/products/components/ProductForm"), {
  loading: () => (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  ),
});

// Define skeleton columns first (before dynamic imports)
const productTableSkeletonColumns = [
  { header: "Image", skeletonClassName: "w-12 h-12 rounded border" },
  { header: "Name", skeletonClassName: "h-4 w-full rounded" },
  { header: "Category", skeletonClassName: "h-4 w-full rounded" },
  { header: "SKU", skeletonClassName: "h-4 w-full rounded" },
  { header: "Price", skeletonClassName: "h-4 w-full rounded" },
  { header: "Stock", skeletonClassName: "h-4 w-full rounded" },
  { header: "Status", skeletonClassName: "h-4 w-full rounded" },
  { header: "Actions", skeletonClassName: "h-4 w-full rounded" },
];

// Lazy load heavy components
const DataTable = dynamic(
  () =>
    import("@/shared/ui/data-table").then((mod) => ({
      default: mod.DataTable,
    })),
  {
    loading: () => <TableSkeleton columns={productTableSkeletonColumns} />,
    ssr: false, // Data tables are interactive, don't need SSR
  }
  // next/dynamic drops the generic; restore it so rows stay typed.
) as typeof DataTableComponent;

// Lazy load modals since they're conditionally rendered
const FormModal = dynamic(() => import("@/shared/components/FormModal"), {
  loading: () => (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-96 w-full" />
  ),
});

const ConfirmationModal = dynamic(
  () => import("@/shared/components/ConfirmationModal"),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-48 w-full" />
    ),
  }
);

export function ProductList() {
  const { user } = useUser();
  const shopSlug = user?.storeName;
  const { modal, openModal, closeModal } = useModal();
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const debouncedSearch = useDebouncedValue(search, 300);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPageIndex(0);
  };

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useProducts({
    searchTerm: debouncedSearch,
    page: pageIndex + 1,
    pageSize: PAGE_SIZE,
  });

  const products = data?.data ?? [];
  const totalProducts = data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));

  const { mutateAsync, isPending: isDeletingProduct } = useDeleteProduct();

  const handleEdit = (product: Product) => {
    openModal(MODAL_TYPES.EDIT_PRODUCT, product);
  };

  const handleDelete = (product: Product) =>
    openModal(MODAL_TYPES.DELETE_PRODUCT, product);

  const columns = createProductColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  const selectedProduct = modal.data as Product | null;

  const handleConfirmDelete = async () => {
    if (selectedProduct?.id) {
      try {
        await mutateAsync(selectedProduct.id);
        toast.success("Product deleted successfully", {
          description: `${selectedProduct.name} has been removed from your store.`,
        });
        closeModal();
      } catch (error) {
        toast.error("Failed to delete product", {
          description: error instanceof Error ? error.message : "Please try again later.",
        });
      }
    }
  };

  return (
    <>
      {isError && <div className="text-red-500">Failed to load products.</div>}
      <DataTable
        columns={columns}
        data={products}
        search={search}
        setSearch={handleSearchChange}
        filterPlaceholder="Search products..."
        loading={isLoading || isFetching}
        skeletonColumns={productTableSkeletonColumns}
        serverSide={true}
        pageIndex={pageIndex}
        pageSize={PAGE_SIZE}
        pageCount={pageCount}
        totalRows={totalProducts}
        onPageChange={setPageIndex}
      />

      <FormModal
        isOpen={
          modal.type === MODAL_TYPES.ADD_PRODUCT ||
          modal.type === MODAL_TYPES.EDIT_PRODUCT
        }
        onClose={closeModal}
        title={
          modal.type === MODAL_TYPES.EDIT_PRODUCT
            ? "Edit Product"
            : "Add Product"
        }
        description={
          modal.type === MODAL_TYPES.EDIT_PRODUCT
            ? "Update the product information below."
            : "Enter the details for your new product below."
        }
      >
        <ProductForm
          storeName={shopSlug ?? ""}
          initialData={
            modal.type === MODAL_TYPES.EDIT_PRODUCT ? selectedProduct : null
          }
          mode={
            modal.type === MODAL_TYPES.EDIT_PRODUCT
              ? FORM_MODES.EDIT
              : FORM_MODES.ADD
          }
          onSuccess={closeModal}
          onCancel={closeModal}
        />
      </FormModal>

      <ConfirmationModal
        isOpen={modal.type === MODAL_TYPES.DELETE_PRODUCT}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedProduct?.name}</span>?
            <br />
            <span className="text-sm text-muted-foreground">
              This will permanently remove the product from your store and
              cannot be undone.
            </span>
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeletingProduct}
        variant="destructive"
      />
    </>
  );
}
