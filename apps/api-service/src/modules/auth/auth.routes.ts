import { FastifyInstance } from "fastify";
import { authControllers } from "./auth.controllers";
import { z } from "zod";
import {
  registerInputSchema,
  registerResponseSchema,
  loginInputSchema,
  loginResponseSchema,
} from "../../zod-schemas/auth-schemas";
import authenticate from "../../http/middlewares/authenticate";

export const rAuth = (server: FastifyInstance) => {
  // Register (PUBLIC)
  server.post(
    "/register",
    {
      schema: {
        summary: "Register a new user",
        description: "Register a new user",
        tags: ["auth"],
        body: registerInputSchema,
        response: {
          201: registerResponseSchema,
        },
      },
    },
    authControllers.register
  );
  // Login (PUBLIC)
  server.post(
    "/login",
    {
      schema: {
        summary: "Login a user",
        description: "Login a user",
        tags: ["auth"],
        body: loginInputSchema,
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    authControllers.login
  );
  // Me (PRIVATE)
  server.get(
    "/me",
    {
      schema: {
        summary: "Get the current user",
        description: "Get the current user",
        tags: ["auth"],
        response: {
          200: loginResponseSchema,
        },
      },
      preHandler: [authenticate],
    },
    authControllers.me
  );
  // Logout (PRIVATE)
  server.post(
    "/logout",
    {
      schema: {
        summary: "Logout a user",
        description: "Logout a user",
        tags: ["auth"],
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
      preHandler: [authenticate],
    },
    authControllers.logout
  );
};
