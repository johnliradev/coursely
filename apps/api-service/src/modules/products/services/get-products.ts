import prisma from "../../../libs/prisma";

export const getProducts = async (filters?: {
  categoryId?: number;
  active?: boolean;
}) => {
  const where: {
    categoryId?: number;
    active?: boolean;
  } = {};

  if (filters?.categoryId) {
    where.categoryId = filters.categoryId;
  }

  if (filters?.active !== undefined) {
    where.active = filters.active;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};

