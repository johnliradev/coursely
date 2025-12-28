import { FastifyInstance } from "fastify";
import { productsControllers } from "./products.controllers";
import { z } from "zod";
import {
  createProductInputSchema,
  createProductResponseSchema,
  getProductsResponseSchema,
  getProductByIdResponseSchema,
  updateProductInputSchema,
  updateProductResponseSchema,
  toggleProductActiveInputSchema,
} from "../../zod-schemas/products-schemas";
import checkAdmin from "../../http/middlewares/admin";
import authenticate from "../../http/middlewares/authenticate";

export const rProducts = (server: FastifyInstance) => {
  server.post(
    "/products",
    {
      schema: {
        summary: "Create a new product",
        description:
          "Create a new product. Requires authentication and ADMIN role.",
        tags: ["products"],
        body: createProductInputSchema,
        response: {
          201: createProductResponseSchema,
        },
      },
      preHandler: [authenticate, checkAdmin],
    },
    productsControllers.createProduct
  );

  server.get(
    "/products",
    {
      schema: {
        summary: "Get all products",
        description: "Get all products with optional filters",
        tags: ["products"],
        querystring: z.object({
          categoryId: z.coerce.number().optional(),
          active: z.coerce.boolean().optional(),
        }),
        response: {
          200: getProductsResponseSchema,
        },
      },
    },
    productsControllers.getProducts
  );

  server.get(
    "/products/:id",
    {
      schema: {
        summary: "Get product by id",
        description: "Get product by id",
        tags: ["products"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: getProductByIdResponseSchema,
        },
      },
    },
    productsControllers.getProductById
  );

  server.put(
    "/products/:id",
    {
      schema: {
        summary: "Update product",
        description: "Update product. Requires authentication and ADMIN role.",
        tags: ["products"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: updateProductInputSchema,
        response: {
          200: updateProductResponseSchema,
        },
      },
      preHandler: [authenticate, checkAdmin],
    },
    productsControllers.updateProduct
  );

  server.delete(
    "/products/:id",
    {
      schema: {
        summary: "Delete product",
        description: "Delete product. Requires authentication and ADMIN role.",
        tags: ["products"],
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
    productsControllers.deleteProduct
  );

  server.patch(
    "/products/:id/active",
    {
      schema: {
        summary: "Toggle product active status",
        description:
          "Toggle product active status. Requires authentication and ADMIN role.",
        tags: ["products"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: toggleProductActiveInputSchema,
        response: {
          200: updateProductResponseSchema,
        },
      },
      preHandler: [authenticate, checkAdmin],
    },
    productsControllers.toggleProductActive
  );
};
