import { z } from "zod";
import { MARKETS } from "@/lib/market/config";

const OnboardProceedFormValidation = z.object({
  userId: z
    .number({ message: "user ID is required" })
    .min(1, { message: "User ID must be a positive integer." }),
  roles: z
    .number({ message: "user ID is required" })
    .min(1, { message: "User ID must be a positive integer." }),

  storeName: z.string({ message: "Business name is required" }),
  storeType: z.string({ message: "Business type is required" }),
  storeAddress: z.string().optional(),
  country: z.enum(MARKETS, { message: "Country is required" }),
});

export { OnboardProceedFormValidation };
