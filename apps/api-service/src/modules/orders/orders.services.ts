import { createOrder } from "./services/create-order";
import { getOrders } from "./services/get-orders";
import { getOrderById } from "./services/get-order-by-id";
import { cancelOrder } from "./services/cancel-order";
import { getAllOrders } from "./services/get-all-orders";
import { updateOrderStatus } from "./services/update-order-status";

export const ordersServices = {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};

