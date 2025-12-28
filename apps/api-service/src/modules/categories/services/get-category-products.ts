import prisma from "../../../libs/prisma";
import { NotFoundError } from "../../../http/errors/AppError";

export const getCategoryProducts = async (id: number) => {
  const categoryExists = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!categoryExists) {
    throw new NotFoundError("Category");
  }

  const products = await prisma.product.findMany({
    where: {
      categoryId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};

