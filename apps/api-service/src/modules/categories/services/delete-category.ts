import prisma from "../../../libs/prisma";
import { NotFoundError } from "../../../http/errors/AppError";

export const deleteCategory = async (id: number) => {
  const categoryExists = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!categoryExists) {
    throw new NotFoundError("Category");
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });
};

