import { z } from "zod";

export const getCategoriesResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.coerce.date(),
  })
);

export const getCategoryByIdResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.coerce.date(),
});

export const updateCategoryInputSchema = z.object({
  name: z.string().min(1).max(255),
});

export const updateCategoryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.coerce.date(),
});

export const getCategoryProductsResponseSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    categoryId: z.number(),
    imageUrl: z.string(),
    active: z.boolean(),
    description: z.string(),
    price: z.number(),
    createdAt: z.coerce.date(),
  })
);

export type GetCategoriesResponse = z.infer<typeof getCategoriesResponseSchema>;
export type GetCategoryByIdResponse = z.infer<
  typeof getCategoryByIdResponseSchema
>;
export type UpdateCategoryInput = z.infer<typeof updateCategoryInputSchema>;
export type UpdateCategoryResponse = z.infer<
  typeof updateCategoryResponseSchema
>;
export type GetCategoryProductsResponse = z.infer<
  typeof getCategoryProductsResponseSchema
>;

