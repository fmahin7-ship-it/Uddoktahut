"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useShop } from "@/app/context/ShopContext";
import { useCart } from "@/hooks/use-cart";
import { resolveCartLines } from "@/lib/cart/resolveCartLines";
import { checkoutFormSchema } from "@/lib/validation/checkoutSchema";
import { placeStoreOrder } from "@/lib/actions/order.action";
import { Form } from "@/components/ui/form";
import { CustomFormField, FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/common/SubmitButton";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import CheckoutOrderSummary from "./CheckoutOrderSummary";
import StoreShell from "@/components/shopui/layout/StoreShell";
import { Button } from "@/components/ui/button";

export default function CheckoutForm() {
  const router = useRouter();
  const { shop, products } = useShop();
  const shopSlug = shop?.store_name;
  const { items, lineCount, clearCart } = useCart(shopSlug);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { lines, subtotal, resolvedCount, errors } = useMemo(
    () => resolveCartLines(items, products),
    [items, products]
  );

  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      note: "",
    },
  });

  const onSubmit = async (values) => {
    if (!shopSlug || items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (errors.length > 0) {
      setError(errors[0]);
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const result = await placeStoreOrder({
        storeName: shopSlug,
        payload: {
          customer: {
            name: values.name,
            phone: values.phone,
            address: values.address,
          },
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          paymentMethod: "cod",
          note: values.note || undefined,
        },
      });

      const order = result.data;
      clearCart();
      toast.success("Order placed successfully");

      const params = new URLSearchParams({
        orderNumber: order.order_number,
        total: String(order.total),
        phone: values.phone,
      });
      router.push(`/order/success?${params.toString()}`);
    } catch (err) {
      setError(err.message || "Could not place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <StoreShell backHref="/shop" backLabel="Back to shop">
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-2">Nothing to checkout</h1>
          <p className="text-muted-foreground mb-6">Your cart is empty.</p>
          <Button asChild>
            <Link href="/shop">Browse products</Link>
          </Button>
        </div>
      </StoreShell>
    );
  }

  return (
    <StoreShell backHref="/cart" backLabel="Back to cart">
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <CustomFormField
                control={form.control}
                name="name"
                label="Full name"
                placeholder="Your name"
                fieldType={FormFieldType.INPUT}
              />
              <CustomFormField
                control={form.control}
                name="phone"
                label="Phone"
                placeholder="01XXXXXXXXX"
                fieldType={FormFieldType.INPUT}
                inputProps={{ type: "tel", inputMode: "numeric", autoComplete: "tel" }}
              />
              <CustomFormField
                control={form.control}
                name="address"
                label="Delivery address"
                placeholder="Area, city, details"
                fieldType={FormFieldType.TEXTAREA}
              />
              <CustomFormField
                control={form.control}
                name="note"
                label="Order note (optional)"
                placeholder="Call before delivery"
                fieldType={FormFieldType.TEXTAREA}
              />

              {errors.length > 0 && (
                <ul className="text-sm text-destructive space-y-1">
                  {errors.map((msg) => (
                    <li key={msg}>{msg}</li>
                  ))}
                </ul>
              )}

              <ErrorDisplay message={error} />

              <SubmitButton
                isLoading={isSubmitting}
                loadingMessage="Placing order..."
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Place order (COD)
              </SubmitButton>
            </form>
          </Form>
        </div>

        <div className="lg:col-span-2">
          <CheckoutOrderSummary
            lines={lines}
            subtotal={subtotal}
            lineCount={resolvedCount || lineCount}
          />
        </div>
      </div>
    </div>
    </StoreShell>
  );
}
