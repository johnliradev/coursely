import { createCategory } from "./services/create-category";
import { getCategories } from "./services/get-categories";
import { getCategoryById } from "./services/get-category-by-id";
import { updateCategory } from "./services/update-category";
import { deleteCategory } from "./services/delete-category";
import { getCategoryProducts } from "./services/get-category-products";

export const categoriesServices = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
};
