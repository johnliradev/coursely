import { z } from "zod";

export const createProductInputSchema = z.object({
  title: z.string().min(1).max(255),
  categoryId: z.number(),
  imageUrl: z.url().min(1).optional(),
  active: z.boolean(),
  description: z.string().min(1).max(255),
  price: z.number(),
});

export type CreateProductInput = z.infer<typeof createProductInputSchema>;

export const createProductResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  categoryId: z.number(),
  imageUrl: z.string(),
  active: z.boolean(),
  description: z.string(),
  price: z.number(),
});

export type CreateProductResponse = z.infer<typeof createProductResponseSchema>;
