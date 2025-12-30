import prisma from "../../../libs/prisma";
import {
  NotFoundError,
  ForbiddenError,
  ValidationError,
} from "../../../http/errors/AppError";

export const cancelOrder = async (orderId: number, userId: number) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new NotFoundError("Order");
  }

  if (order.userId !== userId) {
    throw new ForbiddenError("You are not authorized to cancel this order");
  }

  if (order.status !== "PENDING") {
    throw new ValidationError("Only pending orders can be cancelled");
  }

  const cancelledOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "CANCELLED",
    },
    include: {
      product: true,
      payment: true,
    },
  });

  return cancelledOrder;
};

