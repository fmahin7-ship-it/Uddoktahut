import { z } from "zod";

const bdPhoneSchema = z
  .string()
  .trim()
  .regex(/^01[0-9]{9}$/, "Enter a valid 11-digit Bangladesh phone number");

export const checkoutCustomerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  phone: bdPhoneSchema,
  address: z.string().trim().min(5, "Address is required").max(2000),
  note: z.string().trim().max(1000).optional(),
});

export const checkoutFormSchema = checkoutCustomerSchema;
