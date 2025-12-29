import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { CategoriesNav } from "@/components/categories-nav";
import { ProductsGrid } from "@/components/products-grid";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategoriesNav />
      <ProductsGrid />
    </>
  );
}
