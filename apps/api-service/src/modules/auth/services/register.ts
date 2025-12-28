import { hash } from "bcryptjs";
import { Role, User } from "../../../generated/prisma/client";
import { ConflictError } from "../../../http/errors/AppError";
import prisma from "../../../libs/prisma";
import {
  RegisterInput,
  RegisterResponse,
} from "../../../zod-schemas/auth-schemas";

export const register = async (
  input: RegisterInput
): Promise<RegisterResponse> => {
  const emailExists = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });
  if (emailExists) {
    throw new ConflictError("Email");
  }
  const phoneExists = await prisma.user.findUnique({
    where: {
      phone: input.phone,
    },
  });
  if (phoneExists) {
    throw new ConflictError("Phone");
  }
  const hashedPassword = await hash(input.password, 10);
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      hashPassword: hashedPassword,
      role: input.role,
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

  return user;
};
