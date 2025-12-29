import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  createdAt: z.coerce.date(),
});

export type User = z.infer<typeof userSchema>;
