"use client";
import { productsService } from "@/services/api/products";
import { Product } from "@/types/products";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useCategories } from "./categories-context";
import { useSearch } from "./search-context";

type ProductsContextType = {
  products: Product[] | undefined;
  filteredProducts: Product[] | undefined;
  isLoading: boolean;
  error: string | null;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { selectedCategoryId } = useCategories();
  const { searchQuery } = useSearch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const products = await productsService.getProducts();
        setProducts(products);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!products) return undefined;

    let filtered = [...products];

    // Filtrar por categoria
    if (selectedCategoryId !== null) {
      filtered = filtered.filter((product) => product.categoryId === selectedCategoryId);
    }

    // Filtrar por busca
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, selectedCategoryId, searchQuery]);

  return (
    <ProductsContext.Provider value={{ products, filteredProducts, isLoading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};