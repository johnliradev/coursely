import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { rAuth } from "../modules/auth/auth.routes";
import { rCategories } from "../modules/categories/categories.routes";
import { rProducts } from "../modules/products/products.routes";
import { rOrders } from "../modules/orders/orders.routes";

export const r = (server: FastifyInstance) => {
  rAuth(server);
  rCategories(server);
  rProducts(server);
  rOrders(server);
  server.get(
    "/health",
    {
      schema: {
        summary: "Health check",
        description: "Check if the server is running",
        response: {
          200: z.object({
            status: z.string(),
          }),
        },
      },
    },
    async (req: FastifyRequest, res: FastifyReply) => {
      res.send({ status: "ok" });
    }
  );
};

export default r;
