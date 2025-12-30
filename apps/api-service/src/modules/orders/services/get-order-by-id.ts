import prisma from "../../../libs/prisma";
import { NotFoundError, ForbiddenError } from "../../../http/errors/AppError";

export const getOrderById = async (orderId: number, userId: number, isAdmin: boolean = false) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      product: true,
      payment: true,
    },
  });

  if (!order) {
    throw new NotFoundError("Order");
  }

  if (!isAdmin && order.userId !== userId) {
    throw new ForbiddenError("You are not authorized to access this order");
  }

  return order;
};

