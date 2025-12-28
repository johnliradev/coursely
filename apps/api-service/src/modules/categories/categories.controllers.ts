import { FastifyReply, FastifyRequest } from "fastify";
import { categoriesServices } from "./categories.services";
import { UpdateCategoryInput } from "../../zod-schemas/categories-schemas";

export const categoriesControllers = {
  createCategory: async (req: FastifyRequest, res: FastifyReply) => {
    const body = req.body as { name: string };
    const name = body.name;
    const category = await categoriesServices.createCategory(name);
    res.status(201).send(category);
  },
  getCategories: async (req: FastifyRequest, res: FastifyReply) => {
    const categories = await categoriesServices.getCategories();
    res.status(200).send(categories);
  },
  getCategoryById: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const categoryId = Number(id);
    const category = await categoriesServices.getCategoryById(categoryId);
    res.status(200).send(category);
  },
  updateCategory: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const categoryId = Number(id);
    const body = req.body as UpdateCategoryInput;
    const category = await categoriesServices.updateCategory(categoryId, body);
    res.status(200).send(category);
  },
  deleteCategory: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const categoryId = Number(id);
    await categoriesServices.deleteCategory(categoryId);
    res.status(200).send({ message: "Category deleted successfully" });
  },
  getCategoryProducts: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const categoryId = Number(id);
    const products = await categoriesServices.getCategoryProducts(categoryId);
    res.status(200).send(products);
  },
};
