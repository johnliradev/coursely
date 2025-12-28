import prisma from "../../../libs/prisma";
import { NotFoundError } from "../../../http/errors/AppError";
import { CreateProductInput } from "../../../zod-schemas/products-schemas";

export const createProduct = async (input: CreateProductInput) => {
  const categoryExists = await prisma.category.findUnique({
    where: {
      id: input.categoryId,
    },
  });

  if (!categoryExists) {
    throw new NotFoundError("Category");
  }

  const newProduct = await prisma.product.create({
    data: {
      title: input.title,
      categoryId: input.categoryId,
      imageUrl: input.imageUrl || "",
      active: input.active,
      description: input.description,
      price: input.price,
    },
  });

  return newProduct;
};
