import prisma from "../../../libs/prisma";

export const getOrders = async (
  userId: number,
  filters?: {
    status?: "PENDING" | "PAID" | "CANCELLED";
  }
) => {
  const where: {
    userId: number;
    status?: "PENDING" | "PAID" | "CANCELLED";
  } = {
    userId,
  };

  if (filters?.status) {
    where.status = filters.status;
  }

  const orders = await prisma.order.findMany({
    where,
    include: {
      product: true,
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

