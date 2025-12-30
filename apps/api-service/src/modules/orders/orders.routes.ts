import { FastifyInstance } from "fastify";
import { ordersControllers } from "./orders.controllers";
import { z } from "zod";
import {
  createOrderInputSchema,
  createOrderResponseSchema,
  getOrdersResponseSchema,
  getOrderByIdResponseSchema,
  updateOrderStatusInputSchema,
  updateOrderStatusResponseSchema,
  getAllOrdersResponseSchema,
} from "../../zod-schemas/orders-schemas";
import checkAdmin from "../../http/middlewares/admin";
import authenticate from "../../http/middlewares/authenticate";

export const rOrders = (server: FastifyInstance) => {
  server.post(
    "/orders",
    {
      schema: {
        summary: "Create a new order",
        description: "Create a new order. Requires authentication.",
        tags: ["orders"],
        body: createOrderInputSchema,
        response: {
          201: createOrderResponseSchema,
        },
      },
      preHandler: [authenticate],
    },
    ordersControllers.createOrder
  );

  server.get(
    "/orders",
    {
      schema: {
        summary: "Get user orders",
        description: "Get all orders from the authenticated user",
        tags: ["orders"],
        querystring: z.object({
          status: z.enum(["PENDING", "PAID", "CANCELLED"]).optional(),
        }),
        response: {
          200: getOrdersResponseSchema,
        },
      },
      preHandler: [authenticate],
    },
    ordersControllers.getOrders
  );

  server.get(
    "/orders/:id",
    {
      schema: {
        summary: "Get order by id",
        description: "Get order details by id. User can only see their own orders, admin can see any.",
        tags: ["orders"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: getOrderByIdResponseSchema,
        },
      },
      preHandler: [authenticate],
    },
    ordersControllers.getOrderById
  );

  server.patch(
    "/orders/:id/cancel",
    {
      schema: {
        summary: "Cancel order",
        description: "Cancel an order. Only pending orders can be cancelled.",
        tags: ["orders"],
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: getOrderByIdResponseSchema,
        },
      },
      preHandler: [authenticate],
    },
    ordersControllers.cancelOrder
  );

  server.get(
    "/admin/orders",
    {
      schema: {
        summary: "Get all orders (admin)",
        description: "Get all orders. Requires authentication and ADMIN role.",
        tags: ["orders", "admin"],
        querystring: z.object({
          status: z.enum(["PENDING", "PAID", "CANCELLED"]).optional(),
          userId: z.coerce.number().optional(),
        }),
        response: {
          200: getAllOrdersResponseSchema,
        },
      },
      preHandler: [authenticate, checkAdmin],
    },
    ordersControllers.getAllOrders
  );

  server.patch(
    "/admin/orders/:id/status",
    {
      schema: {
        summary: "Update order status (admin)",
        description: "Update order status. Requires authentication and ADMIN role.",
        tags: ["orders", "admin"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: updateOrderStatusInputSchema,
        response: {
          200: updateOrderStatusResponseSchema,
        },
      },
      preHandler: [authenticate, checkAdmin],
    },
    ordersControllers.updateOrderStatus
  );
};

