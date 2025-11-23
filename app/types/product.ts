export interface Producto {
  // --- Campos Obligatorios (Vienen del Backend) ---
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagenUrl: string; // Esta es la clave correcta ahora
  sku: string;

  // --- Campos Opcionales / Visuales (Frontend) ---
  colores?: number;
  imagenSecundaria?: string;
  reseñas?: number;
  calificacion?: number;
  tipo?: string;

  // --- Propiedades Legacy (Compatibilidad con código viejo) ---
  // Se dejan como opcionales (?) para que no den error si faltan
  imagen?: string; 
  price?: number;
  name?: string;
  especificaciones?: string[];
  esVideo?: boolean;
  videoUrl?: string;
}