"use client";
import { useProducts } from "@/contexts/products-context";
import { ProductsCard } from "./products-card";

export const ProductsGrid = () => {
  const { filteredProducts, isLoading, error } = useProducts();
  
  console.log("ProductsGrid - filteredProducts:", filteredProducts);
  console.log("ProductsGrid - isLoading:", isLoading);
  console.log("ProductsGrid - error:", error);
  
  // Produtos já vêm filtrados do backend (apenas ativos)
  const products = filteredProducts || [];
  console.log("ProductsGrid - products to display:", products);

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

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground text-center">No products found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

