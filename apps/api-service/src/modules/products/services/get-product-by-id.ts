import prisma from "../../../libs/prisma";
import { NotFoundError } from "../../../http/errors/AppError";

export const getProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    throw new NotFoundError("Product");
  }

  return product;
};

