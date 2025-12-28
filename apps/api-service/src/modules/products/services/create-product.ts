import { Product } from "../../../generated/prisma/client";
import prisma from "../../../libs/prisma";

export const createProduct = async (product: Product) => {
  const newProduct = await prisma.product.create({
    data: product,
  });
  return newProduct;
};
