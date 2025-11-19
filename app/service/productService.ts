// services/productService.ts
import type { ProductoDto } from "~/types/producto";

const API_BASE_URL = 'http://localhost:9002';

// Helper para obtener el token de autenticación
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper para hacer peticiones normales (sin auth)
const fetchApi = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
  }

  return response;
};

// Helper para hacer peticiones autenticadas
const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
  }

  return response;
};

export const productService = {
  // Obtener todos los productos (sin autenticación)
  async getProducts(): Promise<ProductoDto[]> {
    const response = await fetchApi('/api/productos/list');
    return response.json();
  },

  // Obtener producto por ID (requiere autenticación)
  async getProductById(id: number): Promise<ProductoDto> {
    const response = await authFetch(`/api/productos/get/${id}`);
    return response.json();
  },

  // Crear nuevo producto (requiere autenticación)
  async createProduct(producto: Omit<ProductoDto, 'id'>): Promise<ProductoDto> {
    const response = await authFetch('/api/productos/create', {
      method: 'POST',
      body: JSON.stringify(producto)
    });
    return response.json();
  },

  // Actualizar producto (requiere autenticación)
  async updateProduct(id: number, producto: Partial<ProductoDto>): Promise<ProductoDto> {
    const response = await authFetch(`/api/productos/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(producto)
    });
    return response.json();
  },

  // Eliminar producto (requiere autenticación)
  async deleteProduct(id: number): Promise<void> {
    await authFetch(`/api/productos/delete/${id}`, {
      method: 'DELETE'
    });
  }
};