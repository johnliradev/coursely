import { z } from "zod";

export const createOrderInputSchema = z.object({
  productId: z.number(),
});

export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;

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

const paymentSchema = z.object({
  id: z.number(),
  amount: z.coerce.number(),
  status: z.enum(["PENDING", "COMPLETED", "FAILED"]),
  createdAt: z.coerce.date(),
  paymentMethod: z.enum(["PIX", "CREDIT_CARD", "DEBIT_CARD", "PAYPAL"]),
  transactionId: z.string().nullable(),
  gateway: z.string().nullable(),
  gatewayTransactionId: z.string().nullable(),
}).nullable();

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

const orderResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  productId: z.number(),
  totalPrice: z.coerce.number(),
  status: z.enum(["PENDING", "PAID", "CANCELLED"]),
  createdAt: z.coerce.date(),
  product: productSchema,
  payment: paymentSchema,
});

const orderWithUserResponseSchema = orderResponseSchema.extend({
  user: userSchema,
});

export const createOrderResponseSchema = orderResponseSchema;

export type CreateOrderResponse = z.infer<typeof createOrderResponseSchema>;

export const getOrdersResponseSchema = z.array(orderResponseSchema);

export type GetOrdersResponse = z.infer<typeof getOrdersResponseSchema>;

export const getOrderByIdResponseSchema = orderResponseSchema;

export type GetOrderByIdResponse = z.infer<typeof getOrderByIdResponseSchema>;

export const updateOrderStatusInputSchema = z.object({
  status: z.enum(["PENDING", "PAID", "CANCELLED"]),
});

export type UpdateOrderStatusInput = z.infer<
  typeof updateOrderStatusInputSchema
>;

export const updateOrderStatusResponseSchema = orderWithUserResponseSchema;

export type UpdateOrderStatusResponse = z.infer<
  typeof updateOrderStatusResponseSchema
>;

export const getAllOrdersResponseSchema = z.array(orderWithUserResponseSchema);

export type GetAllOrdersResponse = z.infer<typeof getAllOrdersResponseSchema>;

