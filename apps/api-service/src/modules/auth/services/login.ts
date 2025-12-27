import { LoginInput, LoginResponse } from "../../../zod-schemas/auth-schemas";
import { UnauthorizedError } from "../../../http/errors/AppError";
import prisma from "../../../libs/prisma";
import { compare } from "bcryptjs";

export const login = async (input: LoginInput): Promise<LoginResponse> => {
  const user = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      hashPassword: true,
    },
  });
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }
  const isPasswordValid = await compare(input.password, user.hashPassword);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid email or password");
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  };
};
