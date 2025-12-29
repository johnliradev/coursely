"use client";
import { Product } from "@/types/products";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Category } from "@/types/categories";
import { useCategories } from "@/contexts/categories-context";
import { useRouter } from "next/navigation";

export const ProductsCard = ({ product }: { product: Product }) => {
  const { categories } = useCategories();
  const router = useRouter();
  const category = categories?.find(
    (category: Category) => category.id === product.categoryId
  );

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Card
      className="overflow-hidden p-0 flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      {/* Image Section - 3/4 of card height */}
      <div
        className="w-full bg-muted flex items-center justify-center overflow-hidden relative"
        style={{ height: "75%" }}
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {category && (
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-background/90 text-foreground"
            >
              {category.name}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section - 1/4 of card height */}
      <CardContent className="flex-1 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground leading-tight mb-1 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price and Enroll Button */}
        <div className="flex items-center justify-between gap-3 mt-3">
          <div className="text-xl font-bold text-foreground">
            {product.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <Button
            className="cursor-pointer shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/products/${product.id}`);
            }}
          >
            Enroll now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
