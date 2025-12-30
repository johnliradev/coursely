import { FastifyReply, FastifyRequest } from "fastify";
import { ordersServices } from "./orders.services";
import {
  CreateOrderInput,
  UpdateOrderStatusInput,
} from "../../zod-schemas/orders-schemas";

export const ordersControllers = {
  createOrder: async (req: FastifyRequest, res: FastifyReply) => {
    const body = req.body as CreateOrderInput;
    const userId = (req.user as { sub: number }).sub;
    const order = await ordersServices.createOrder(body, userId);
    res.status(201).send(order);
  },

  getOrders: async (req: FastifyRequest, res: FastifyReply) => {
    const userId = (req.user as { sub: number }).sub;
    const query = req.query as {
      status?: "PENDING" | "PAID" | "CANCELLED";
    };
    const filters: {
      status?: "PENDING" | "PAID" | "CANCELLED";
    } = {};

    if (query.status) {
      filters.status = query.status;
    }

    const orders = await ordersServices.getOrders(userId, filters);
    res.status(200).send(orders);
  },

  getOrderById: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const orderId = Number(id);
    const userId = (req.user as { sub: number }).sub;
    const role = (req.user as { role: "ADMIN" | "USER" }).role;
    const isAdmin = role === "ADMIN";
    const order = await ordersServices.getOrderById(orderId, userId, isAdmin);
    res.status(200).send(order);
  },

  cancelOrder: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const orderId = Number(id);
    const userId = (req.user as { sub: number }).sub;
    const order = await ordersServices.cancelOrder(orderId, userId);
    res.status(200).send(order);
  },

  getAllOrders: async (req: FastifyRequest, res: FastifyReply) => {
    const query = req.query as {
      status?: "PENDING" | "PAID" | "CANCELLED";
      userId?: string;
    };
    const filters: {
      status?: "PENDING" | "PAID" | "CANCELLED";
      userId?: number;
    } = {};

    if (query.status) {
      filters.status = query.status;
    }

    if (query.userId) {
      filters.userId = Number(query.userId);
    }

    const orders = await ordersServices.getAllOrders(filters);
    res.status(200).send(orders);
  },

  updateOrderStatus: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const orderId = Number(id);
    const body = req.body as UpdateOrderStatusInput;
    const order = await ordersServices.updateOrderStatus(orderId, body);
    res.status(200).send(order);
  },
};

