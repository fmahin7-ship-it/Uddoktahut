"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useShop } from "@/shared/providers/shop-provider";
import { useCart } from "@/features/storefront/hooks/use-cart";
import { resolveCartLines } from "@/features/storefront/cart/resolveCartLines";
import {
  checkoutFormSchemaForCountry,
  phonePlaceholderForCountry,
  stripPhone,
  type CheckoutFormValues,
} from "@/features/storefront/checkout-schema";
import { placeStoreOrder } from "@/features/orders/actions";
import { unwrap } from "@/shared/api/result";
import { Form } from "@/shared/ui/form";
import { CustomFormField, FormFieldType } from "@/shared/components/CustomFormField";
import ErrorDisplay from "@/shared/components/ErrorDisplay";
import CheckoutOrderSummary from "@/features/storefront/components/checkout/CheckoutOrderSummary";
import StoreShell from "@/features/storefront/components/layout/StoreShell";
import StoreCard from "@/features/storefront/components/common/StoreCard";
import StorePrimaryButton from "@/features/storefront/components/common/StorePrimaryButton";
import { useStoreTheme } from "@/features/storefront/hooks/useStoreTheme";
import { currencyFromCountry } from "@/shared/market/config";

export default function CheckoutForm() {
  const router = useRouter();
  const { shop, products } = useShop();
  const shopSlug = shop?.store_name;
  const currency = currencyFromCountry(shop?.country);
  const { items, lineCount, clearCart } = useCart(shopSlug);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { colors, maxWidth } = useStoreTheme();

  const schema = useMemo(
    () => checkoutFormSchemaForCountry(shop?.country),
    [shop?.country]
  );

  const { lines, subtotal, resolvedCount, errors } = useMemo(
    () => resolveCartLines(items, products),
    [items, products]
  );

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      note: "",
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    if (!shopSlug || items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (errors.length > 0) {
      setError(errors[0] ?? "");
      return;
    }

    setError("");
    setIsSubmitting(true);
    const phone = stripPhone(values.phone);

    try {
      const order = unwrap(
        await placeStoreOrder({
          storeName: shopSlug,
          payload: {
            customer: {
              name: values.name,
              phone,
              address: values.address,
            },
            items: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
            paymentMethod: "cod",
            note: values.note || undefined,
          },
        })
      );

      clearCart();
      toast.success("Order placed successfully");

      const params = new URLSearchParams({
        orderNumber: order.order_number,
        total: String(order.total),
        phone,
      });
      router.push(`/order/success?${params.toString()}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not place order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <StoreShell backHref="/shop" backLabel="Back to shop">
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
            Nothing to checkout
          </h1>
          <p className="mb-8" style={{ color: colors.textSecondary }}>
            Your cart is empty.
          </p>
          <StorePrimaryButton asChild className="inline-flex w-auto px-8">
            <Link href="/shop">Browse products</Link>
          </StorePrimaryButton>
        </div>
      </StoreShell>
    );
  }

  return (
    <StoreShell backHref="/cart" backLabel="Back to cart">
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 py-8 sm:py-10`}>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: colors.text }}>
          Checkout
        </h1>
        <p className="mb-8 text-sm" style={{ color: colors.textSecondary }}>
          Enter delivery details — pay cash on delivery
        </p>

        <div className="grid lg:grid-cols-5 gap-8">
          <StoreCard className="lg:col-span-3 p-6">
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
                  placeholder={phonePlaceholderForCountry(shop?.country)}
                  fieldType={FormFieldType.INPUT}
                  inputProps={{ type: "tel", inputMode: "tel", autoComplete: "tel" }}
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

                <ErrorDisplay errors={[error]} />

                <StorePrimaryButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-xl"
                >
                  {isSubmitting ? "Placing order..." : "Place order (COD)"}
                </StorePrimaryButton>
              </form>
            </Form>
          </StoreCard>

          <div className="lg:col-span-2">
            <CheckoutOrderSummary
              lines={lines}
              subtotal={subtotal}
              lineCount={resolvedCount || lineCount}
              currency={currency}
            />
          </div>
        </div>
      </div>
    </StoreShell>
  );
}
