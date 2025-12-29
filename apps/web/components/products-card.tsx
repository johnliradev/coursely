import { Product } from "@/types/products";
import { Card } from "./ui/card";
import { Category } from "@/types/categories";
import { useCategories } from "@/contexts/categories-context";

export const ProductsCard = ({ product }: { product: Product }) => {
  const { categories } = useCategories();
  return (
    <Card className="bg-black rounded-xl overflow-hidden p-0">
      <div className="w-full h-44 bg-gray-800 flex items-center justify-center overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
          style={{ minHeight: "176px", maxHeight: "176px" }}
        />
      </div>
      <div className="p-5">
        <div className="text-lg font-semibold text-white leading-tight mb-1">
          {product.title}
        </div>
        <div className="text-gray-400 text-sm mb-4">{product.description}</div>
        <div className="text-gray-400 text-sm mb-1">
          {product.categoryId &&
            `${categories?.find((category: Category) => category.id === product.categoryId)?.name}`}
        </div>
        <div className="text-2xl font-bold text-white mt-2">
          {product.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>
    </Card>
  );
};
