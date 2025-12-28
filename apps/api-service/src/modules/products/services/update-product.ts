import prisma from "../../../libs/prisma";
import { NotFoundError } from "../../../http/errors/AppError";
import { UpdateProductInput } from "../../../zod-schemas/products-schemas";

export const updateProduct = async (
  id: number,
  input: UpdateProductInput
) => {
  const productExists = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!productExists) {
    throw new NotFoundError("Product");
  }

  if (input.categoryId) {
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: input.categoryId,
      },
    });

    if (!categoryExists) {
      throw new NotFoundError("Category");
    }
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      ...(input.title && { title: input.title }),
      ...(input.categoryId && { categoryId: input.categoryId }),
      ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl }),
      ...(input.active !== undefined && { active: input.active }),
      ...(input.description && { description: input.description }),
      ...(input.price && { price: input.price }),
    },
  });

  return updatedProduct;
};

