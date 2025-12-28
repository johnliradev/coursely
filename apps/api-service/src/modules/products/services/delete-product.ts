import prisma from "../../../libs/prisma";
import { NotFoundError } from "../../../http/errors/AppError";

export const deleteProduct = async (id: number) => {
  const productExists = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!productExists) {
    throw new NotFoundError("Product");
  }

  await prisma.product.delete({
    where: {
      id,
    },
  });
};

