import prisma from "../../../libs/prisma";

export const getCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return categories;
};

