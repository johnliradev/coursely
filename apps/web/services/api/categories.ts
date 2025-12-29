
export const categoriesService = {
  getCategories: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  },
};  