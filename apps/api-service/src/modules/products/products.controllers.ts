import { FastifyReply, FastifyRequest } from "fastify";
import { productsServices } from "./products.services";
import {
  CreateProductInput,
  UpdateProductInput,
  ToggleProductActiveInput,
} from "../../zod-schemas/products-schemas";

export const productsControllers = {
  createProduct: async (req: FastifyRequest, res: FastifyReply) => {
    const body = req.body as CreateProductInput;
    const product = await productsServices.createProduct(body);
    res.status(201).send(product);
  },
  getProducts: async (req: FastifyRequest, res: FastifyReply) => {
    const query = req.query as {
      categoryId?: string;
      active?: string;
    };
    const filters: {
      categoryId?: number;
      active?: boolean;
    } = {};

    if (query.categoryId) {
      filters.categoryId = Number(query.categoryId);
    }

    if (query.active !== undefined) {
      filters.active = query.active === "true";
    }

    const products = await productsServices.getProducts(filters);
    res.status(200).send(products);
  },
  getProductById: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const productId = Number(id);
    const product = await productsServices.getProductById(productId);
    res.status(200).send(product);
  },
  updateProduct: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const productId = Number(id);
    const body = req.body as UpdateProductInput;
    const product = await productsServices.updateProduct(productId, body);
    res.status(200).send(product);
  },
  deleteProduct: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const productId = Number(id);
    await productsServices.deleteProduct(productId);
    res.status(200).send({ message: "Product deleted successfully" });
  },
  toggleProductActive: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const productId = Number(id);
    const body = req.body as ToggleProductActiveInput;
    const product = await productsServices.toggleProductActive(productId, body);
    res.status(200).send(product);
  },
};

