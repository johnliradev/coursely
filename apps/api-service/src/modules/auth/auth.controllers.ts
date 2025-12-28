import { UnauthorizedError } from "../../http/errors/AppError";
import { server } from "../../libs/fastify";
import {
  LoginInput,
  LoginResponse,
  RegisterInput,
} from "../../zod-schemas/auth-schemas";
import { authServices } from "./auth.services";
import { FastifyRequest, FastifyReply } from "fastify";

export const authControllers = {
  register: async (req: FastifyRequest, res: FastifyReply) => {
    const body = req.body as RegisterInput;
    const user = await authServices.register(body);
    res.status(201).send(user);
  },
  login: async (req: FastifyRequest, res: FastifyReply) => {
    const body = req.body as LoginInput;
    const user = await authServices.login(body);
    const token = await server.jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      {
        expiresIn: "1h",
      }
    );
    res.setCookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1 * 60 * 60 * 1000, // 1 hour
    });
    res.status(200).send({
      message: "Login successful",
    });
  },
  me: async (req: FastifyRequest, res: FastifyReply) => {
    const { sub } = req.user as { sub: number };
    const user = await authServices.me(sub);
    res.status(200).send(user);
  },
  logout: async (req: FastifyRequest, res: FastifyReply) => {
    res.setCookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(0), // Expire the cookie immediately
    });
    res.status(200).send({
      message: "Logout successful",
    });
  },
};
