"use client";
import { useProducts, useDeleteProduct } from "@/hooks/use-products";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useModal } from "@/app/context/ModalContext";
import { toast } from "sonner";
import dynamic from "next/dynamic";

import { getShopSlug } from "@/lib/utils";
import { FORM_MODES, MODAL_TYPES } from "@/constants/formModes";
import TableSkeleton from "@/components/common/TableSkeleton";
import { createProductColumns } from "@/lib/table-columns/product-columns";
import { useState } from "react";

// Lazy load ProductForm since it's only used in modals
const ProductForm = dynamic(() => import("@/components/form/ProductForm"), {
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
    import("@/components/ui/data-table").then((mod) => ({
      default: mod.DataTable,
    })),
  {
    loading: () => <TableSkeleton columns={productTableSkeletonColumns} />,
    ssr: false, // Data tables are interactive, don't need SSR
  }
);

// Lazy load modals since they're conditionally rendered
const FormModal = dynamic(() => import("@/components/common/FormModal"), {
  loading: () => (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-96 w-full" />
  ),
});

const ConfirmationModal = dynamic(
  () => import("@/components/common/ConfirmationModal"),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-48 w-full" />
    ),
  }
);

export function ProductList({ storeUrl }) {
  const shopSlug = getShopSlug(storeUrl);
  const { modal, openModal, closeModal } = useModal();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const {
    data: products = [],
    isLoading: loading,
    isError,
  } = useProducts(debouncedSearch);

  const { mutateAsync, isPending: isDeletingProduct } = useDeleteProduct();

  const handleEdit = (product) => {
    openModal(MODAL_TYPES.EDIT_PRODUCT, product);
  };

  const handleDelete = (product) =>
    openModal(MODAL_TYPES.DELETE_PRODUCT, product);

  const columns = createProductColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  const handleConfirmDelete = async () => {
    if (modal.data?.id) {
      try {
        await mutateAsync(modal.data.id);
        toast.success("Product deleted successfully", {
          description: `${modal.data.name} has been removed from your store.`,
        });
        closeModal();
      } catch (error) {
        toast.error("Failed to delete product", {
          description: error.message || "Please try again later.",
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
        setSearch={setSearch}
        filterColumn="name"
        filterPlaceholder="Search products..."
        loading={loading}
        skeletonColumns={productTableSkeletonColumns}
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
          storeName={shopSlug}
          initialData={
            modal.type === MODAL_TYPES.EDIT_PRODUCT ? modal.data : null
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
            <span className="font-semibold">{modal.data?.name}</span>?
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
