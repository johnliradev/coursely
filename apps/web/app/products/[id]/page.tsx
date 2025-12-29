"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productsService } from "@/services/api/products";
import { Product } from "@/types/products";
import { useCategories } from "@/contexts/categories-context";
import { Category } from "@/types/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { categories } = useCategories();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const id = Number(params.id);
        const productData = await productsService.getProductById(id);
        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const category = categories?.find(
    (c: Category) => c.id === product?.categoryId
  );

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-4">{error || "Product not found"}</p>
            <Button onClick={() => router.push("/")}>Go back home</Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="w-full">
              <Card className="overflow-hidden">
                <div className="aspect-square w-full bg-muted">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                {category && (
                  <Badge variant="secondary" className="mb-4">
                    {category.name}
                  </Badge>
                )}
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {product.title}
                </h1>
                <p className="text-2xl font-semibold text-foreground mb-6">
                  {product.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="pt-6">
                <Button size="lg" className="w-full">
                  Enroll now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

