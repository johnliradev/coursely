import { env } from "../config/env";
import { buildServer } from "../libs/fastify";

const main = async () => {
  let server;
  try {
    server = await buildServer();
    await server.listen({ host: env.HOST, port: env.API_PORT });
    server.log.info(`🔥 Server is running on ${env.HOST}:${env.API_PORT}`);
    server.log.info(
      `🔍 API documentation is available at http://${env.HOST}:${env.API_PORT}/api/docs`
    );
  } catch (error) {
    if (server) {
      server.log.error(error, "Error starting server");
    } else {
      console.error("Error building server:", error);
    }
    process.exit(1);
  }
};

main();
