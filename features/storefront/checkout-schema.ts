import { z } from "zod";
import { marketFromCountry } from "@/shared/market/config";
import type { MarketCode } from "@/shared/api/types";

const stripPhone = (value: string) => value.replace(/[\s\-()]/g, "");

const bdPhoneSchema = z
  .string()
  .trim()
  .regex(/^01[0-9]{9}$/, "Enter a valid 11-digit Bangladesh phone number");

/** AU mobile: 04XXXXXXXX, +614XXXXXXXX, or 614XXXXXXXX */
const auPhoneSchema = z
  .string()
  .trim()
  .refine((value) => /^(?:\+?61|0)4\d{8}$/.test(stripPhone(value)), {
    message: "Enter a valid Australian mobile number (04XXXXXXXX)",
  });

const checkoutCustomerBase = {
  name: z.string().trim().min(1, "Name is required").max(255),
  address: z.string().trim().min(5, "Address is too short").max(2000),
  note: z.string().trim().max(1000).optional(),
};

export function checkoutFormSchemaForCountry(
  country: string | null | undefined
) {
  const market: MarketCode = marketFromCountry(country);
  return z.object({
    ...checkoutCustomerBase,
    phone: market === "BD" ? bdPhoneSchema : auPhoneSchema,
  });
}

/** Default BD schema for older imports / BD-only tests. */
export const checkoutFormSchema = checkoutFormSchemaForCountry("BD");

export type CheckoutFormValues = z.infer<
  ReturnType<typeof checkoutFormSchemaForCountry>
>;

export function phonePlaceholderForCountry(
  country: string | null | undefined
): string {
  return marketFromCountry(country) === "BD" ? "01XXXXXXXXX" : "04XXXXXXXX";
}

export { stripPhone };
