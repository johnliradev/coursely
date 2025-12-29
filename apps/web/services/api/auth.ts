export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Importante para cookies
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Login failed" }));
      throw new Error(error.message || "Invalid email or password");
    }

    return response.json();
  },

  me: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      method: "GET",
      credentials: "include", // Importante para cookies
    });

    if (!response.ok) {
      throw new Error("Failed to get user");
    }

    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      method: "POST",
      credentials: "include", // Importante para cookies
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    return response.json();
  },

  register: async (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "USER" | "ADMIN";
  }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Registration failed" }));
      throw new Error(error.message || "Registration failed");
    }

    return response.json();
  },
};
