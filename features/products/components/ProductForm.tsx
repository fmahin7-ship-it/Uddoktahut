"use client";
import { useState, useEffect } from "react";
import { useAddProduct, useUpdateProduct } from "@/features/products/hooks";
import { Button } from "@/shared/ui/button";
import { CustomFormField, FormFieldType } from "@/shared/components/CustomFormField";
import { SelectItem } from "@/shared/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui/form";
import {
  productCreateSchema,
  type ProductFormInput,
  type ProductPayload,
} from "@/features/products/schema";
import type { Product } from "@/shared/api/types";
import { PRODUCT_STATUS, PRODUCT_STATUS_OPTIONS } from "@/features/products/constants";
import { CTA_HOVER_COLOR } from "@/shared/constants/colors";
import SubmitButton from "@/shared/components/SubmitButton";
import ErrorDisplay from "@/shared/components/ErrorDisplay";
import { FORM_MODES, type FormMode } from "@/shared/constants/formModes";

export default function ProductForm({
  storeName,
  initialData = null,
  onSuccess,
  onCancel,
  mode = FORM_MODES.ADD, // "add" or "edit"
}: {
  storeName: string;
  initialData?: Product | null;
  onSuccess?: () => void;
  onCancel?: () => void;
  mode?: FormMode;
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

  const form = useForm<ProductFormInput, unknown, ProductPayload>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
        name: initialData?.name || "",
        image: initialData?.image || "",
        price: initialData?.price ? Number(initialData?.price) : undefined,
        stock: initialData?.stock ?? undefined,
        status: initialData?.status
          ? initialData?.status.toLowerCase()
          : PRODUCT_STATUS.ACTIVE,
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
        price: initialData.price ? Number(initialData.price) : undefined,
        stock: initialData.stock ?? undefined,
        status: initialData.status
          ? initialData.status.toLowerCase()
          : PRODUCT_STATUS.ACTIVE,
        category: initialData.category || "",
        sku: initialData.sku || "",
        storeName: storeName || "",
      });
    }
  }, [initialData, form, storeName]);

  async function onSubmit(data: ProductPayload) {
    setError("");
    try {
      const transformedData: Partial<ProductPayload> = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        storeName,
      };
      if (!transformedData.image) {
        delete transformedData.image;
      }

      if (mode === FORM_MODES.EDIT && initialData && initialData.id) {
        await updateProduct({
          id: initialData.id,
          ...transformedData,
        });
      } else {
        await addProduct(transformedData);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
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
            setValueAs: (v: string | undefined) => {
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
            setValueAs: (v: string | undefined) => {
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
          {PRODUCT_STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
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
