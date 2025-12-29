export const productsService = {
  getProducts: async (filters?: { categoryId?: number; active?: boolean }) => {
    const params = new URLSearchParams();
    if (filters?.categoryId !== undefined) {
      params.append("categoryId", filters.categoryId.toString());
    }
    if (filters?.active !== undefined) {
      params.append("active", filters.active.toString());
    }

    // Garantir que a URL inclua /api se necessário
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const apiPath = baseUrl.includes("/api") ? "" : "/api";
    const url = `${baseUrl}${apiPath}/products${params.toString() ? `?${params.toString()}` : ""}`;

    console.log("Fetching products from:", url);
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch products:", response.status, errorText);
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    const data = await response.json();
    console.log("Products received:", data);
    return data;
  },

  getProductById: async (id: number) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const apiPath = baseUrl.includes("/api") ? "" : "/api";
    const url = `${baseUrl}${apiPath}/products/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return response.json();
  },
};
