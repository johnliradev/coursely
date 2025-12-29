import z from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.coerce.date(),
});

export type Category = z.infer<typeof categorySchema>;