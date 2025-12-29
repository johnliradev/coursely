export const adminService = {
  // Products
  createProduct: async (data: {
    title: string;
    categoryId: number;
    imageUrl?: string;
    active: boolean;
    description: string;
    price: number;
  }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to create product" }));
      throw new Error(error.message || "Failed to create product");
    }

    return response.json();
  },

  updateProduct: async (
    id: number,
    data: {
      title?: string;
      categoryId?: number;
      imageUrl?: string;
      active?: boolean;
      description?: string;
      price?: number;
    }
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to update product" }));
      throw new Error(error.message || "Failed to update product");
    }

    return response.json();
  },

  deleteProduct: async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to delete product" }));
      throw new Error(error.message || "Failed to delete product");
    }

    return response.json();
  },

  // Categories
  createCategory: async (name: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to create category" }));
      throw new Error(error.message || "Failed to create category");
    }

    return response.json();
  },

  updateCategory: async (id: number, name: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to update category" }));
      throw new Error(error.message || "Failed to update category");
    }

    return response.json();
  },

  deleteCategory: async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to delete category" }));
      throw new Error(error.message || "Failed to delete category");
    }

    return response.json();
  },
};
