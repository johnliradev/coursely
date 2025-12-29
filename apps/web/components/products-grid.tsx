"use client";
import { useProducts } from "@/contexts/products-context";
import { ProductsCard } from "./products-card";

export const ProductsGrid = () => {
  const { filteredProducts, isLoading, error } = useProducts();
  
  // Filtrar apenas produtos ativos na página inicial
  const activeProducts = filteredProducts?.filter((product) => product.active) || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground text-center">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-destructive text-center">Error: {error}</p>
      </div>
    );
  }

  if (!activeProducts || activeProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground text-center">No products found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {activeProducts.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

