import prisma from "../../../libs/prisma";
import { NotFoundError } from "../../../http/errors/AppError";
import { ToggleProductActiveInput } from "../../../zod-schemas/products-schemas";

export const toggleProductActive = async (
  id: number,
  input: ToggleProductActiveInput
) => {
  const productExists = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!productExists) {
    throw new NotFoundError("Product");
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      active: input.active,
    },
  });

  return updatedProduct;
};

