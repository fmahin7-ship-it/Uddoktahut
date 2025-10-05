"use client";
import { useProducts } from "@/hooks/use-products";
import { useModal } from "@/app/context/ModalContext";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import ProductForm from "@/components/form/ProductForm";
import { DataTable } from "@/components/ui/data-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getShopSlug } from "@/lib/utils";
import { FORM_MODES, MODAL_TYPES } from "@/constants/formModes";
import FormModal from "@/components/common/FormModal";
import ConfirmationModal from "@/components/common/ConfirmationModal";

function getColumns({ onEdit, onDelete }) {
  return [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.name}
          className="w-12 h-12 object-cover rounded border"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={
            row.original.status === "Active"
              ? "font-semibold text-green-600 dark:text-green-400"
              : "font-semibold text-gray-400 dark:text-gray-500"
          }
        >
          {row.original.status}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={() => onEdit(row.original)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="cursor-pointer"
            onClick={() => onDelete(row.original)}
          >
            Delete
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];
}
// Removed duplicate/stray actions column and JSX

export function ProductList({ storeUrl }) {
  const shopSlug = getShopSlug(storeUrl);
  const { modal, openModal, closeModal } = useModal();
  const { data: products = [], isLoading: loading, isError } = useProducts();

  // Add/Edit handlers
  const handleEdit = (product) => {
    openModal(MODAL_TYPES.EDIT_PRODUCT, product);
  };

  // handleEditSave is now handled by ProductForm via React Query

  // Delete handlers
  const handleDelete = (product) =>
    openModal(MODAL_TYPES.DELETE_PRODUCT, product);
  // confirmDelete will be handled by mutation (to be implemented)

  if (loading) {
    if (isError) {
      return <div className="text-red-500">Failed to load products.</div>;
    }
    // Table skeleton: 5 rows, 7 columns, using shadcn/ui Table components
    return (
      <div className="overflow-x-auto w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(8)].map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton
                      className={
                        j === 0
                          ? "w-12 h-12 rounded border"
                          : "h-4 w-full rounded"
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={getColumns({ onEdit: handleEdit, onDelete: handleDelete })}
        data={products}
      />

      {/* Add/Edit Modal (generic, reusable) */}
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

      {/* Delete Confirmation (generic, reusable) */}
      <ConfirmationModal
        isOpen={modal.type === MODAL_TYPES.DELETE_PRODUCT}
        onClose={closeModal}
        onConfirm={() => {
          // TODO: Implement delete mutation
          console.log("Delete product:", modal.data);
          closeModal();
        }}
        title="Delete Product"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{modal.data?.name}</span>?
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
