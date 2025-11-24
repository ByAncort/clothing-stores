import { AuthService } from "./AuthService";

// Conexión a MS-CARD (Puerto 9003)
const CART_API_URL = 'http://localhost:9003/api/carrito';

// Interfaces DTO (Coinciden con el Java de tu compañero)
export interface CarritoRequest {
    productoId: number;
    cantidad: number;
    talla: string;
    color: string;
}

// Ajusta esta interfaz según lo que devuelve exactamente tu backend
export interface CarritoResponse {
    id: number;
    usuarioId: number;
    items: any[]; 
    subtotal: number;
    total: number;
}

export const CartService = {
    
    // Helper para headers (MS-CARD exige X-User-Id)
    getHeaders: () => {
        const token = AuthService.getToken();
        // Intentamos sacar el ID del usuario del token. 
        // Si el token no tiene ID numérico, esto podría fallar en el backend.
        // Asegúrate de que el token JWT incluya el claim "id" o "userId".
        const userId = AuthService.getUserId(); 
        
        if (!userId) {
            // Si no hay usuario, devolvemos headers básicos, pero el backend probablemente falle.
            console.warn("No se encontró ID de usuario para el carrito");
        }

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'X-User-Id': String(userId || 0) // Enviamos 0 si no hay ID, para evitar crash del front
        };
    },

    // 1. Obtener Carrito
    getCart: async () => {
        try {
            const response = await fetch(CART_API_URL, {
                method: 'GET',
                headers: CartService.getHeaders()
            });
            if (!response.ok) throw new Error('Error cargando carrito remoto');
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // 2. Agregar Producto
    addItem: async (item: CarritoRequest) => {
        const response = await fetch(`${CART_API_URL}/agregar`, {
            method: 'POST',
            headers: CartService.getHeaders(),
            body: JSON.stringify(item)
        });
        if (!response.ok) throw new Error('Error agregando producto al carrito');
        return response.json();
    },

    // 3. Actualizar Cantidad
    updateQuantity: async (itemId: number, cantidad: number) => {
        // El backend usa @RequestParam para cantidad
        const response = await fetch(`${CART_API_URL}/actualizar/${itemId}?cantidad=${cantidad}`, {
            method: 'PUT',
            headers: CartService.getHeaders()
        });
        if (!response.ok) throw new Error('Error actualizando cantidad');
        return response.json();
    },

    // 4. Remover Producto
    removeItem: async (itemId: number) => {
        const response = await fetch(`${CART_API_URL}/remover/${itemId}`, {
            method: 'DELETE',
            headers: CartService.getHeaders()
        });
        if (!response.ok) throw new Error('Error eliminando producto');
        return response.json();
    },

    // 5. Limpiar Carrito
    clearCart: async () => {
        const response = await fetch(`${CART_API_URL}/limpiar`, {
            method: 'DELETE',
            headers: CartService.getHeaders()
        });
        if (!response.ok) throw new Error('Error limpiando carrito');
        return true;
    }
};