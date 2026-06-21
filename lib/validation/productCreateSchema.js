import { z } from "zod";
import { PRODUCT_STATUS } from "@/constants/product";

export const productCreateSchema = z.object({
  name: z.string().min(1),
  image: z.string().url().optional(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  status: z
    .string()
    .transform((value) => value.toLowerCase())
    .pipe(z.enum([PRODUCT_STATUS.ACTIVE, PRODUCT_STATUS.INACTIVE])),
  category: z.string().min(1),
  sku: z.string().min(1),
  storeName: z.string().min(1),
});
