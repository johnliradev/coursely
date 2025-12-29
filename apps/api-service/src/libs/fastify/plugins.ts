import { FastifyInstance } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import scalarApiReference from "@scalar/fastify-api-reference";
import { r } from "../../http/routes";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { env } from "../../config/env";

export async function registerPlugins(server: FastifyInstance) {
  await server.register(fastifyCors, {
    origin: (origin, cb) => {
      // Permitir requisições sem origin (ex: Postman, mobile apps)
      if (!origin) return cb(null, true);

      // Lista de origins permitidos
      const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

      if (allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
  await server.register(fastifyCookie, {
    secret: env.JWT_SECRET,
  });
  await server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Store Service",
        description: "API for store service",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });
  await server.register(r, { prefix: "/api" });
  await server.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
      expiresIn: "1h",
    },
  });
  await server.register(scalarApiReference, { routePrefix: "/api/docs" });
}
