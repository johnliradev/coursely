import { FastifyRequest, FastifyReply } from "fastify";
import { ForbiddenError } from "../errors/AppError";

export const checkAdmin = async (req: FastifyRequest, res: FastifyReply) => {
  const { role } = req.user as { role: "ADMIN" | "USER" };
  if (role !== "ADMIN") {
    throw new ForbiddenError("You are not authorized to access this resource");
  }
};

export default checkAdmin;
