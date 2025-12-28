import prisma from "../../../libs/prisma";

export const createCategory = async (name: string) => {
  const newCategory = await prisma.category.create({
    data: {
      name,
    },
  });
  return newCategory;
};
