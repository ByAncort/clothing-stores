import { useEffect, useState } from "react";
import type { Producto } from "~/types/product";

// Hook personalizado para localStorage - CORREGIDO
export function useProductosLocalStorage(): Producto[] {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    // Verificar que estamos en el cliente
    if (typeof window !== "undefined") {
      const productosGuardados = localStorage.getItem("productosMasVendidos");
      
      if (productosGuardados) {
        try {
          setProductos(JSON.parse(productosGuardados));
        } catch (error) {
          console.error("Error parsing productos from localStorage:", error);
        }
      }
    }
  }, []);

  return productos;
}