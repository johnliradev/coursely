import { z } from "zod";

export const registerInputSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(255, { message: "Name must be less than 255 characters" }),
  email: z.email({ message: "Invalid email" }),
  phone: z
    .string({ message: "Phone must be a string" })
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(15, { message: "Phone must be less than 15 characters" })
    .refine(
      (phone) => {
        return phone.startsWith("+55") && phone.length === 14;
      },
      { message: "Phone must be a valid Brazilian phone number" }
    ),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
export const registerResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  createdAt: z.coerce.date(),
});
export const loginInputSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
export const loginResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  createdAt: z.coerce.date(),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
