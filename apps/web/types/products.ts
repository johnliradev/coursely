import z from "zod";

const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  categoryId: z.number(),
  imageUrl: z.string(),
  active: z.boolean(),
  description: z.string(),
  price: z.coerce.number(),
  createdAt: z.coerce.date(),
});

export type Product = z.infer<typeof productSchema>;