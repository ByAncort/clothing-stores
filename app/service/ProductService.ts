import { AuthService } from "./AuthService";
import type { Producto } from "~/types/product";

const API_URL = "http://localhost:9002/api/productos";

export const ProductService = {
  
  getAll: async (): Promise<Producto[]> => {
    const response = await fetch(API_URL + "/list");
    if (!response.ok) throw new Error("Error al cargar productos");
    return response.json();
  },

  create: async (product: Omit<Producto, "id">) => {
    const token = AuthService.getToken();
    const backendPayload = {
        codigoSku: product.sku,
        nombre: product.nombre,
        imagePrimary: product.imagenUrl,
        imageSecondary: product.imagenUrl, // Usamos la misma si no hay otra
        descripcion: product.descripcion || "Sin descripción",
        precio: product.precio,
        costo: product.precio * 0.5, // Calculamos un costo estimado (obligatorio)
        stock: product.stock,
        categoriaId: 1, // Enviamos ID 1 por defecto (ya que tu form envía texto)
        catalogo: "Temporada 2025",
        serial: product.sku + "-SER",
        proveedorId: 1, // ID de proveedor por defecto (debe existir en BD)
        tipo: "Ropa",
        tallas: ["S", "M", "L", "XL"], // Valores por defecto
        colores: ["Negro", "Blanco"],   // Valores por defecto
        material: "Algodón",
        marca: product.marca,
        temporada: "Invierno",
        especificaciones: {
            "cuidado": "Lavado en frio",
            "origen": "Importado"
        }
    };
    console.log(JSON.stringify(backendPayload));
    const response = await fetch(API_URL + "/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(backendPayload),
    });

    if (!response.ok) throw new Error("Error al crear producto");
    return response.json();
  },

  delete: async (id: number) => {
    const token = AuthService.getToken();
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Error al eliminar producto.");
    return true;
  }
};