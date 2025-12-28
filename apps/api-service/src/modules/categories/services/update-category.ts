import prisma from "../../../libs/prisma";
import { NotFoundError } from "../../../http/errors/AppError";
import { UpdateCategoryInput } from "../../../zod-schemas/categories-schemas";

export const updateCategory = async (
  id: number,
  input: UpdateCategoryInput
) => {
  const categoryExists = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!categoryExists) {
    throw new NotFoundError("Category");
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id,
    },
    data: {
      name: input.name,
    },
  });

  return updatedCategory;
};

