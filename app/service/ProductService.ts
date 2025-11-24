import { AuthService } from "./AuthService";
import type { Producto } from "~/types/product";

const API_URL = "http://localhost:8080/api/productos";

export const ProductService = {
  
  getAll: async (): Promise<Producto[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al cargar productos");
    return response.json();
  },

  create: async (product: Omit<Producto, "id">) => {
    const token = AuthService.getToken();
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error("Error al crear producto");
    return response.json();
  },

  delete: async (id: number) => {
    const token = AuthService.getToken();
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Error al eliminar producto.");
    return true;
  }
};