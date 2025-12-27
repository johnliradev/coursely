import prisma from "../../../libs/prisma";
import { NotFoundError } from "../../../http/errors/AppError";
import { LoginResponse } from "../../../zod-schemas/auth-schemas";

export const me = async (id: number): Promise<LoginResponse> => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};
