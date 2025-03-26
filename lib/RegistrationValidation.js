import { z } from "zod";

export const RegistrationFormValidation = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, "Name should be at least 2 character"),
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),
  password: z.string({ message: "Password is required" }).min(6, {
    message: "Password Invalid!",
  }),
});

// need to do future
///     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/
