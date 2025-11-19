// services/categoryService.ts
import type { CategoriaDto } from '~/types/categoria';
const API_BASE_URL = 'http://localhost:9002';

const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

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

export const categoryService = {
  // Obtener todas las categorías
  async getCategories(): Promise<CategoriaDto[]> {
    const response = await authFetch('/api/v1/categorias');
    return response.json();
  },

  // Crear nueva categoría
  async createCategory(categoria: CategoriaDto): Promise<CategoriaDto> {
    const response = await authFetch('/api/v1/categorias', {
      method: 'POST',
      body: JSON.stringify(categoria)
    });
    return response.json();
  },

  // Actualizar categoría
  async updateCategory(id: number, categoria: CategoriaDto): Promise<CategoriaDto> {
    const response = await authFetch(`/api/v1/categorias/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoria)
    });
    return response.json();
  },

  // Eliminar categoría
  async deleteCategory(id: number): Promise<void> {
    await authFetch(`/api/v1/categorias/${id}`, {
      method: 'DELETE'
    });
  }
};