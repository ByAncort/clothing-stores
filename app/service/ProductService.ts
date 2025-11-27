import { AuthService } from "./AuthService";
import type { Producto } from "~/types/product";

const API_URL = "http://localhost:9002/api/productos";

// Interfaz para la respuesta del backend
interface ProductoAPI {
  id: number;
  codigoSku: string;
  nombre: string;
  imagePrimary: string | null;
  imageSecondary: string | null;
  descripcion: string;
  precio: number;
  costo: number;
  stock: number;
  categoriaId: number;
  catalogo: string | null;
  serial: string | null;
  proveedorId: number | null;
  tipo: string | null;
  tallas: string[] | null;
  colores: string[] | null;
  material: string | null;
  marca: string | null;
  temporada: string | null;
  especificaciones: any;
}

// Mapeo de categorías ID a nombres
const categoriaIdMapping: Record<number, string> = {
  1: 'Hoodies',
  2: 'Poleras',
  3: 'Chaquetas',
  4: 'Shorts',
  5: 'Accesorios'
};

// Función para mapear producto del backend al frontend
const mapProductFromAPI = (producto: ProductoAPI): Producto => {
  return {
    id: producto.id,
    nombre: producto.nombre,
    marca: producto.marca || 'StayCold',
    descripcion: producto.descripcion,
    precio: producto.precio,
    stock: producto.stock,
    categoria: categoriaIdMapping[producto.categoriaId] || 'Accesorios',
    imagenUrl: producto.imagePrimary || producto.imageSecondary || '',
    sku: producto.codigoSku,
    calificacion: 5, // Valor por defecto
    imagenSecundaria: producto.imageSecondary || producto.imagePrimary || ''
  };
};

export const ProductService = {
  
  getAll: async (): Promise<Producto[]> => {
    const response = await fetch(API_URL + "/list");
    if (!response.ok) throw new Error("Error al cargar productos");
    
    const data: ProductoAPI[] = await response.json();
    
    // Mapear los productos del backend a la estructura del frontend
    return data.map(mapProductFromAPI);
  },

  create: async (product: Omit<Producto, "id">) => {
    const token = AuthService.getToken();
    
    // Mapeo inverso: convertir nombre de categoría a ID
    const getCategoriaId = (categoria: string): number => {
      const entry = Object.entries(categoriaIdMapping).find(
        ([_, nombre]) => nombre === categoria
      );
      return entry ? parseInt(entry[0]) : 1; // Default to Hoodies (ID 1)
    };

    const backendPayload = {
        codigoSku: product.sku,
        nombre: product.nombre,
        imagePrimary: product.imagenUrl,
        imageSecondary: product.imagenSecundaria || product.imagenUrl,
        descripcion: product.descripcion || "Sin descripción",
        precio: product.precio,
        costo: product.precio * 0.5, // Calculamos un costo estimado
        stock: product.stock,
        categoriaId: 1Colección Destacada,
        catalogo: "Temporada 2025",
        serial: product.sku + "-SER",
        proveedorId: 1, // ID de proveedor por defecto
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