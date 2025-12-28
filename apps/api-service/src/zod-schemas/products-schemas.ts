import { z } from "zod";

export const createProductInputSchema = z.object({
  title: z.string().min(1).max(255),
  categoryId: z.number(),
  imageUrl: z.url().min(1).optional(),
  active: z.boolean(),
  description: z.string().min(1).max(255),
  price: z.coerce.number(),
});

export type CreateProductInput = z.infer<typeof createProductInputSchema>;

export const createProductResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  categoryId: z.number(),
  imageUrl: z.string(),
  active: z.boolean(),
  description: z.string(),
  price: z.coerce.number(),
  createdAt: z.coerce.date(),
});

export type CreateProductResponse = z.infer<typeof createProductResponseSchema>;

export const updateProductInputSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  categoryId: z.number().optional(),
  imageUrl: z.url().min(1).optional(),
  active: z.boolean().optional(),
  description: z.string().min(1).max(255).optional(),
  price: z.coerce.number().optional(),
});

export type UpdateProductInput = z.infer<typeof updateProductInputSchema>;

export const getProductsResponseSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    categoryId: z.number(),
    imageUrl: z.string(),
    active: z.boolean(),
    description: z.string(),
    price: z.coerce.number(),
    createdAt: z.coerce.date(),
  })
);

export type GetProductsResponse = z.infer<typeof getProductsResponseSchema>;

export const getProductByIdResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  categoryId: z.number(),
  imageUrl: z.string(),
  active: z.boolean(),
  description: z.string(),
  price: z.coerce.number(),
  createdAt: z.coerce.date(),
});

export type GetProductByIdResponse = z.infer<
  typeof getProductByIdResponseSchema
>;

export const updateProductResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  categoryId: z.number(),
  imageUrl: z.string(),
  active: z.boolean(),
  description: z.string(),
  price: z.coerce.number(),
  createdAt: z.coerce.date(),
});

export type UpdateProductResponse = z.infer<typeof updateProductResponseSchema>;

export const toggleProductActiveInputSchema = z.object({
  active: z.boolean(),
});

export type ToggleProductActiveInput = z.infer<
  typeof toggleProductActiveInputSchema
>;
