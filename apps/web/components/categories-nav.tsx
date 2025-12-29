"use client";
import { useCategories } from "@/contexts/categories-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const CategoriesNav = () => {
  const { categories, isLoading, error, selectedCategoryId, setSelectedCategoryId } = useCategories();

  if (isLoading) {
    return (
      <nav className="w-full">
        <div className="container mx-auto px-4 py-4">
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
      </nav>
    );
  }

  if (error) {
    return (
      <nav className="w-full">
        <div className="container mx-auto px-4 py-4">
          <p className="text-destructive">Error: {error}</p>
        </div>
      </nav>
    );
  }

  return (
    <nav className="mx-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Button
            variant="ghost"
            onClick={() => setSelectedCategoryId(null)}
            className={cn(
              "cursor-pointer rounded-full px-4 py-2 transition-all",
              selectedCategoryId === null
                ? "bg-[#f5f5f5] dark:bg-[#2a2a2a] text-foreground shadow-sm"
                : "bg-transparent text-muted-foreground hover:bg-muted/80"
            )}
          >
            All
          </Button>
          {categories?.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              onClick={() => setSelectedCategoryId(category.id)}
              className={cn(
                "cursor-pointer rounded-full px-4 py-2 transition-all whitespace-nowrap",
                selectedCategoryId === category.id
                  ? "bg-[#f5f5f5] dark:bg-[#2a2a2a] text-foreground shadow-sm"
                  : "bg-transparent text-muted-foreground hover:bg-muted/80"
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};