import { createProduct } from "./services/create-product";
import { getProducts } from "./services/get-products";
import { getProductById } from "./services/get-product-by-id";
import { updateProduct } from "./services/update-product";
import { deleteProduct } from "./services/delete-product";
import { toggleProductActive } from "./services/toggle-product-active";

export const productsServices = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  toggleProductActive,
};

