"use client";
import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export function ProductList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(initialProducts);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Edit handlers
  const handleEdit = (product) => {
    setEditProduct(product);
    setEditForm(product);
  };
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSave = () => {
    // Ensure price and stock are numbers
    const updated = {
      ...editProduct,
      ...editForm,
      price: Number(editForm.price),
      stock: Number(editForm.stock),
    };
    setProducts((prev) =>
      prev.map((p) => (p.id === editProduct.id ? updated : p))
    );
    setEditProduct(null);
  };

  // Delete handlers
  const handleDelete = (product) => setDeleteProduct(product);
  const confirmDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteProduct.id));
    setDeleteProduct(null);
  };

  if (loading) {
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

      {/* Edit Modal */}
      {editProduct && (
        <AlertDialog
          open={!!editProduct}
          onOpenChange={() => setEditProduct(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Product</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-3">
                  <Input
                    name="name"
                    label="Name"
                    value={editForm.name || ""}
                    onChange={handleEditChange}
                    placeholder="Name"
                  />
                  <Input
                    name="category"
                    label="Category"
                    value={editForm.category || ""}
                    onChange={handleEditChange}
                    placeholder="Category"
                  />
                  <Input
                    name="sku"
                    label="SKU"
                    value={editForm.sku || ""}
                    onChange={handleEditChange}
                    placeholder="SKU"
                  />
                  <Input
                    name="price"
                    label="Price"
                    type="number"
                    value={editForm.price || ""}
                    onChange={handleEditChange}
                    placeholder="Price"
                  />
                  <Input
                    name="stock"
                    label="Stock"
                    type="number"
                    value={editForm.stock || ""}
                    onChange={handleEditChange}
                    placeholder="Stock"
                  />
                  <Input
                    name="status"
                    label="Status"
                    value={editForm.status || ""}
                    onChange={handleEditChange}
                    placeholder="Status"
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setEditProduct(null)}
                >
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button className="cursor-pointer" onClick={handleEditSave}>
                  Save
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Delete Confirmation */}
      {deleteProduct && (
        <AlertDialog
          open={!!deleteProduct}
          onOpenChange={() => setDeleteProduct(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold">{deleteProduct.name}</span>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setDeleteProduct(null)}
                >
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={confirmDelete}
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
