import { AuthService } from "./AuthService";

// URL Base según el controlador de Java
const PROVIDER_API_URL = 'http://localhost:9014/api/ms-inventario/proveedor';

export interface Provider {
    id: number;
    nombre: string;
    rut: string;
    direccion: string;
    telefono: string;
    email: string;
    web: string;
    contacto: string;
    activo: boolean;
}

// DTO para crear/actualizar (sin ID)
export interface ProviderDto {
    nombre: string;
    rut: string;
    direccion: string;
    telefono: string;
    email: string;
    web: string;
    contacto: string;
}

export const ProviderService = {

    // 1. Listar todos los activos
    getAllActive: async (): Promise<Provider[]> => {
        const token = AuthService.getToken();
        const response = await fetch(`${PROVIDER_API_URL}/all-active`, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });

        if (!response.ok) throw new Error('Error al cargar proveedores');
        
        // La respuesta viene envuelta en HATEOAS ("_embedded.proveedorList"), 
        // hay que ver cómo la devuelve exactamente. Por seguridad, asumimos array directo o extraemos.
        const data = await response.json();
        
        // Si devuelve formato HATEOAS, la lista suele estar en _embedded
        if (data._embedded && data._embedded.proveedorList) {
            return data._embedded.proveedorList;
        }
        // Si devuelve array directo (depende de cómo lo serialice Spring)
        return Array.isArray(data) ? data : (data.content || []);
    },

    // 2. Crear nuevo proveedor
    create: async (provider: ProviderDto) => {
        const token = AuthService.getToken();
        const response = await fetch(`${PROVIDER_API_URL}/create-proveedor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(provider)
        });

        if (!response.ok) throw new Error('Error al crear proveedor');
        return response.json();
    },

    // 3. Actualizar proveedor
    update: async (id: number, provider: ProviderDto) => {
        const token = AuthService.getToken();
        const response = await fetch(`${PROVIDER_API_URL}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(provider)
        });

        if (!response.ok) throw new Error('Error al actualizar proveedor');
        return response.json();
    },

    // 4. Eliminar proveedor
    delete: async (id: number) => {
        const token = AuthService.getToken();
        const response = await fetch(`${PROVIDER_API_URL}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Error al eliminar proveedor');
        return true;
    },
    
    // 5. Cambiar estado (Activar/Desactivar)
    toggleActive: async (id: number, activo: boolean) => {
        const token = AuthService.getToken();
        const response = await fetch(`${PROVIDER_API_URL}/toggle-activo/${id}?activo=${activo}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) throw new Error('Error al cambiar estado');
        return response.json();
    }
};