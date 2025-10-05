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
const initialProducts = [
  {
    id: 4,
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=facearea&w=60&h=60&q=80",
    price: 89.99,
    stock: 30,
    status: "Active",
    category: "Footwear",
    sku: "RS-003",
  },
  {
    id: 5,
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=facearea&w=60&h=60&q=80",
    price: 89.99,
    stock: 30,
    status: "Active",
    category: "Footwear",
    sku: "RS-003",
  },
  {
    id: 6,
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=facearea&w=60&h=60&q=80",
    price: 89.99,
    stock: 30,
    status: "Active",
    category: "Footwear",
    sku: "RS-003",
  },
  {
    id: 7,
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=facearea&w=60&h=60&q=80",
    price: 89.99,
    stock: 30,
    status: "Active",
    category: "Footwear",
    sku: "RS-003",
  },
  {
    id: 8,
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=facearea&w=60&h=60&q=80",
    price: 89.99,
    stock: 30,
    status: "Active",
    category: "Footwear",
    sku: "RS-003",
  },
  {
    id: 9,
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=facearea&w=60&h=60&q=80",
    price: 89.99,
    stock: 30,
    status: "Active",
    category: "Footwear",
    sku: "RS-003",
  },
  {
    id: 10,
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=facearea&w=60&h=60&q=80",
    price: 89.99,
    stock: 30,
    status: "Active",
    category: "Footwear",
    sku: "RS-003",
  },
  {
    id: 11,
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=facearea&w=60&h=60&q=80",
    price: 89.99,
    stock: 30,
    status: "Active",
    category: "Footwear",
    sku: "RS-003",
  },
  {
    id: 12,
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=facearea&w=60&h=60&q=80",
    price: 89.99,
    stock: 30,
    status: "Active",
    category: "Footwear",
    sku: "RS-003",
  },
  {
    id: 13,
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=facearea&w=60&h=60&q=80",
    price: 89.99,
    stock: 30,
    status: "Active",
    category: "Footwear",
    sku: "RS-003",
  },
  {
    id: 14,
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=facearea&w=60&h=60&q=80",
    price: 89.99,
    stock: 30,
    status: "Active",
    category: "Footwear",
    sku: "RS-003",
  },
];

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
    openModal("editProduct", product);
  };

  // handleEditSave is now handled by ProductForm via React Query

  // Delete handlers
  const handleDelete = (product) => openModal("deleteProduct", product);
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

      {/* Add/Edit Modal (generic, global via context) */}
      {(modal.type === "addProduct" || modal.type === "editProduct") && (
        <AlertDialog open onOpenChange={closeModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {modal.type === "editProduct" ? "Edit Product" : "Add Product"}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <ProductForm
              storeName={shopSlug}
              initialData={modal.type === "editProduct" ? modal.data : null}
              mode={modal.type === "editProduct" ? "edit" : "add"}
              onSuccess={closeModal}
              onCancel={closeModal}
            />
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Delete Confirmation (global via context) */}
      {/* TODO: Wire up delete mutation with React Query */}
      {modal.type === "deleteProduct" && (
        <AlertDialog open onOpenChange={closeModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold">{modal.data?.name}</span>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  // TODO: Implement delete mutation
                  onClick={closeModal}
                >
                  Delete
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
