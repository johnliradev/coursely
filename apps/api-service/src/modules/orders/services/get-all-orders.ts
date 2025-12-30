import prisma from "../../../libs/prisma";

export const getAllOrders = async (filters?: {
  status?: "PENDING" | "PAID" | "CANCELLED";
  userId?: number;
}) => {
  const where: {
    status?: "PENDING" | "PAID" | "CANCELLED";
    userId?: number;
  } = {};

  if (filters?.status) {
    where.status = filters.status;
  }

  if (filters?.userId) {
    where.userId = filters.userId;
  }

  const orders = await prisma.order.findMany({
    where,
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

