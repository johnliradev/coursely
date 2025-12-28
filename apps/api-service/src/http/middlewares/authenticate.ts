import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "../../libs/fastify";
import { UnauthorizedError } from "../errors/AppError";

export const authenticate = async (req: FastifyRequest, res: FastifyReply) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnauthorizedError("Unauthorized");
  }
  const decoded = await server.jwt.verify(token);
  if (!decoded || typeof decoded === "string") {
    throw new UnauthorizedError("Unauthorized");
  }
  req.user = decoded as { sub: number; role: "ADMIN" | "USER" };
};

export default authenticate;
