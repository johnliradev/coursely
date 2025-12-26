import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
// import { errorHandler } from "../http/err/error-handler";
import { env } from "../../config/env";
import { registerPlugins } from "./plugins";

export const server = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

export const buildServer = async () => {
  try {
    server.log.info(`Server is starting on ${env.HOST}:${env.PORT}`);
    // await server.setErrorHandler(errorHandler);
    await registerPlugins(server);
    await server.ready();
    return server;
  } catch (error) {
    server.log.error(error, "Error building Fastify app");
    throw error;
  }
};
