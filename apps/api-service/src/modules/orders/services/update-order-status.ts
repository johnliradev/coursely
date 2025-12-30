import prisma from "../../../libs/prisma";
import { NotFoundError } from "../../../http/errors/AppError";
import { UpdateOrderStatusInput } from "../../../zod-schemas/orders-schemas";

export const updateOrderStatus = async (
  orderId: number,
  input: UpdateOrderStatusInput
) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new NotFoundError("Order");
  }

  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: input.status,
    },
    include: {
      product: true,
      payment: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return updatedOrder;
};

