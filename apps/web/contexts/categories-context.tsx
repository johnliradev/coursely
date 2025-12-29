"use client";
import { categoriesService } from "@/services/api/categories";
import { Category } from "@/types/categories";
import { createContext, useContext, useEffect, useState } from "react";

type CategoriesContextType = {
  categories: Category[] | undefined;
  isLoading: boolean;
  error: string | null;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  refreshCategories: () => Promise<void>;
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const categories = await categoriesService.getCategories();
      setCategories(categories);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, isLoading, error, selectedCategoryId, setSelectedCategoryId, refreshCategories: fetchCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};