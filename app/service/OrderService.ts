import { AuthService } from "./AuthService";

// URL FUTURA (Cuando tu compañero termine, descomentas esto y borras la simulación)
// const ORDER_API_URL = 'http://localhost:8082/api/orders';

export const OrderService = {

    createOrder: async (orderData: any) => {
        console.log("📦 [Frontend] Preparando envío de orden:", orderData);

        // --- SIMULACIÓN DE BACKEND (PARA TU DESARROLLO) ---
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("✅ [Frontend] Orden procesada exitosamente (Simulado)");
                resolve({ status: "success", id: Math.floor(Math.random() * 1000) });
            }, 1500); // Simulamos 1.5 segundos de espera
        });

        // --- CÓDIGO REAL (MANTENER COMENTADO HASTA LA INTEGRACIÓN) ---
        /*
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
        */
    }
};