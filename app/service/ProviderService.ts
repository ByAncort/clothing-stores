import { AuthService } from "./AuthService";

const PROVIDER_API_URL = 'http://localhost:9014/api/ms-inventario/proveedor';

export interface Provider {
    id: number;
    rut: string;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    activo: boolean;
    // CORRECCIÓN APLICADA AQUÍ:
    contacto?: string; 
    web?: string;      
}

export interface ProviderDto {
    rut: string;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    web?: string;
    contacto?: string;
}

export const ProviderService = {
    getAllActive: async (): Promise<Provider[]> => {
        const token = AuthService.getToken();
        const response = await fetch(`${PROVIDER_API_URL}/all-active`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Error al cargar proveedores');
        const data = await response.json();
        
        if (data._embedded && data._embedded.proveedorList) {
            return data._embedded.proveedorList;
        }
        return Array.isArray(data) ? data : [];
    },
    
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
        if (!response.ok) throw new Error('Error creando proveedor');
        return response.json();
    },

    delete: async (id: number) => {
        const token = AuthService.getToken();
        const response = await fetch(`${PROVIDER_API_URL}/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Error al eliminar');
        return true;
    }
};