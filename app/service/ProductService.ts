import { AuthService } from "./AuthService";
import type { Producto } from "~/types/product";

// URL de tu Backend de Productos
const API_URL = "http://localhost:8080/api/productos";

export const ProductService = {
  
  // 1. OBTENER TODOS (Público - No requiere token, pero lo mandamos por si acaso)
  getAll: async (): Promise<Producto[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al cargar productos");
    return response.json();
  },

  // 2. CREAR PRODUCTO (Privado - REQUIERE TOKEN)
  create: async (product: Omit<Producto, "id">) => {
    const token = AuthService.getToken(); // Sacamos el token del bolsillo
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // <--- ¡AQUÍ ESTÁ LA LLAVE!
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error("Error al crear: No tienes permisos o el servidor falló.");
    return response.json();
  },

  // 3. ELIMINAR PRODUCTO (Privado - REQUIERE TOKEN)
  delete: async (id: number) => {
    const token = AuthService.getToken();

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}` // <--- ¡AQUÍ TAMBIÉN!
      },
    });

    if (!response.ok) throw new Error("Error al eliminar producto.");
    return true;
  }
};