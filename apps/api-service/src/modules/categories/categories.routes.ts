import { FastifyInstance } from "fastify";
import { categoriesControllers } from "./categories.controllers";
import { z } from "zod";
import {
  getCategoriesResponseSchema,
  getCategoryByIdResponseSchema,
  updateCategoryInputSchema,
  updateCategoryResponseSchema,
  getCategoryProductsResponseSchema,
} from "../../zod-schemas/categories-schemas";
import checkAdmin from "../../http/middlewares/admin";
import authenticate from "../../http/middlewares/authenticate";

export const rCategories = (server: FastifyInstance) => {
  server.post(
    "/categories",
    {
      schema: {
        summary: "Create a new category",
        description:
          "Create a new category. Requires authentication and ADMIN role.",
        tags: ["categories"],
        body: z.object({
          name: z.string().min(1).max(255),
        }),
        response: {
          201: z.object({
            id: z.number(),
            name: z.string(),
            createdAt: z.coerce.date(),
          }),
        },
      },
      preHandler: [authenticate, checkAdmin],
    },
    categoriesControllers.createCategory
  );

  server.get(
    "/categories",
    {
      schema: {
        summary: "Get all categories",
        description: "Get all categories",
        tags: ["categories"],
        response: {
          200: getCategoriesResponseSchema,
        },
      },
    },
    categoriesControllers.getCategories
  );

  server.get(
    "/categories/:id",
    {
      schema: {
        summary: "Get category by id",
        description: "Get category by id",
        tags: ["categories"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: getCategoryByIdResponseSchema,
        },
      },
    },
    categoriesControllers.getCategoryById
  );

  server.put(
    "/categories/:id",
    {
      schema: {
        summary: "Update category",
        description: "Update category. Requires authentication and ADMIN role.",
        tags: ["categories"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: updateCategoryInputSchema,
        response: {
          200: updateCategoryResponseSchema,
        },
      },
      preHandler: [authenticate, checkAdmin],
    },
    categoriesControllers.updateCategory
  );

  server.delete(
    "/categories/:id",
    {
      schema: {
        summary: "Delete category",
        description: "Delete category. Requires authentication and ADMIN role.",
        tags: ["categories"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
      preHandler: [authenticate, checkAdmin],
    },
    categoriesControllers.deleteCategory
  );

  server.get(
    "/categories/:id/products",
    {
      schema: {
        summary: "Get products by category id",
        description: "Get products by category id",
        tags: ["categories"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: getCategoryProductsResponseSchema,
        },
      },
    },
    categoriesControllers.getCategoryProducts
  );
};
