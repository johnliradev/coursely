import prisma from "../../../libs/prisma";
import { NotFoundError, ValidationError } from "../../../http/errors/AppError";
import { CreateOrderInput } from "../../../zod-schemas/orders-schemas";

export const createOrder = async (input: CreateOrderInput, userId: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id: input.productId,
    },
  });

  if (!product) {
    throw new NotFoundError("Product");
  }

  if (!product.active) {
    throw new ValidationError("Product is not active");
  }

  const order = await prisma.order.create({
    data: {
      userId,
      productId: input.productId,
      totalPrice: product.price,
      status: "PENDING",
    },
    include: {
      product: true,
      payment: true,
    },
  });

  return order;
};

