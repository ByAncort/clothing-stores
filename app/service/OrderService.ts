import { AuthService } from "./AuthService";

// URL de tu Backend (Ajusta el puerto si tu compañero usa otro, por ahora 8082)
// Si usas proxy en vite.config.ts, cámbialo a '/api/orders'
const ORDER_API_URL = 'http://localhost:8082/api/orders';

// Definición de una Orden para TypeScript
export interface Order {
    id: number;
    fecha: string;
    total: number;
    estado: string;
    detalleProductos: string; 
}

export const OrderService = {

    // 1. CREAR ORDEN (Ya la tenías)
    createOrder: async (orderData: any) => {
        console.log("📦 [Frontend] Enviando orden:", orderData);

        // --- MODO SIMULACIÓN (Descomenta esto si no tienes backend aún) ---
        /*
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("✅ Orden simulada con éxito");
                resolve({ status: "success", id: Math.floor(Math.random() * 1000) });
            }, 1500);
        });
        */

        // --- MODO REAL (Backend de tu compañero) ---
        const token = AuthService.getToken();
        const response = await fetch(ORDER_API_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) throw new Error('Error al crear orden');
        return response.json();
    },

    // 2. OBTENER MIS ÓRDENES (ESTA ES LA QUE FALTABA)
    getMyOrders: async (username: string): Promise<Order[]> => {
        const token = AuthService.getToken();
        
        try {
            // Llamamos al endpoint: GET /api/orders/{username}
            const response = await fetch(`${ORDER_API_URL}/${username}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                // Si falla (404 o 500), retornamos lista vacía para que no explote la pantalla
                console.warn("No se pudo obtener el historial.");
                return []; 
            }

            return await response.json();
        } catch (error) {
            console.error("Error al cargar órdenes:", error);
            // Retornamos datos falsos si falla, para que veas cómo se ve la tabla
            // (Borra esto cuando tengas el backend real)
            return [
                { id: 101, fecha: new Date().toISOString(), total: 150.00, estado: "CONFIRMADO", detalleProductos: "Simulado" },
                { id: 102, fecha: new Date().toISOString(), total: 29.99, estado: "ENVIADO", detalleProductos: "Simulado" }
            ];
        }
    }
};