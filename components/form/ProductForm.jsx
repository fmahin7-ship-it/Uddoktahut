"use client";
import { useState, useEffect } from "react";
import { useAddProduct, useUpdateProduct } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { CustomFormField, FormFieldType } from "@/components/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { productCreateSchema } from "@/lib/validation/productCreateSchema";
import { CTA_HOVER_COLOR } from "@/constants/colors";
import SubmitButton from "../common/SubmitButton";
import ErrorDisplay from "../common/ErrorDisplay";
import { FORM_MODES } from "@/constants/formModes";

export default function ProductForm({
  storeName,
  initialData = null,
  onSuccess,
  onCancel,
  mode = FORM_MODES.ADD, // "add" or "edit"
}) {
  const [error, setError] = useState("");
  const addProductMutation = useAddProduct();
  const updateProductMutation = useUpdateProduct();

  // Destructure all properties from mutations
  const {
    mutateAsync: addProduct,
    isPending: isAddingProduct,
    error: addError,
  } = addProductMutation;

  const {
    mutateAsync: updateProduct,
    isPending: isUpdatingProduct,
    error: updateError,
  } = updateProductMutation;

  const form = useForm({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
      name: initialData?.name || "",
      image: initialData?.image || "",
      price: initialData?.price || "",
      stock: initialData?.stock || "",
      status: initialData?.status || "Active",
      category: initialData?.category || "",
      sku: initialData?.sku || "",
      storeName: storeName || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || "",
        image: initialData.image || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        status: initialData.status || "Active",
        category: initialData.category || "",
        sku: initialData.sku || "",
        storeName: storeName || "",
      });
    }
  }, [initialData, form, storeName]);

  async function onSubmit(data) {
    setError("");
    try {
      if (mode === FORM_MODES.EDIT && initialData && initialData.id) {
        await updateProduct({
          id: initialData.id,
          ...data,
          price: Number(data.price),
          stock: Number(data.stock),
          storeName,
        });
      } else {
        await addProduct({
          ...data,
          price: Number(data.price),
          stock: Number(data.stock),
          storeName,
        });
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-h-[70vh] overflow-y-auto"
      >
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Product Name"
          placeholder="Name"
          inputProps={{ autoFocus: mode === FORM_MODES.ADD }}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="image"
          label="Image URL"
          placeholder="Image URL"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="price"
          label="Price"
          placeholder="Price"
          inputProps={form.register("price", {
            setValueAs: (v) => {
              if (v === "" || v === undefined) return undefined;
              const num = Number(v);
              return isNaN(num) ? undefined : num;
            },
          })}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="stock"
          label="Stock"
          placeholder="Stock"
          inputProps={form.register("stock", {
            setValueAs: (v) => {
              if (v === "" || v === undefined) return undefined;
              const num = Number(v);
              return isNaN(num) ? undefined : num;
            },
          })}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="category"
          label="Category"
          inputProps={{}}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="sku"
          label="SKU"
          placeholder="SKU"
        />
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="status"
          label="Status"
          placeholder="Select status"
          inputProps={{}}
        >
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Inactive">Inactive</SelectItem>
        </CustomFormField>
        <ErrorDisplay errors={[error, addError, updateError]} />
        <div className="flex gap-2 pt-4  bg-background sticky bottom-0 left-0 z-10 mt-4">
          <SubmitButton
            isLoading={isAddingProduct || isUpdatingProduct}
            className={`cursor-pointer bg-green-400 hover:bg-[${CTA_HOVER_COLOR}] 
            text-green-900 font-[600]`}
            loadingMessage={
              isAddingProduct || isUpdatingProduct
                ? mode === FORM_MODES.EDIT
                  ? "Editing..."
                  : "Adding..."
                : ""
            }
          >
            <span className="font-semibold text-green-900">Save</span>
          </SubmitButton>

          {onCancel && (
            <Button
              type="button"
              className="cursor-pointer text-green-900 font-[600]"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
