import prisma from "../../../libs/prisma";
import { NotFoundError } from "../../../http/errors/AppError";

export const getCategoryById = async (id: number) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new NotFoundError("Category");
  }

  return category;
};

