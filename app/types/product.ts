export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  precioOriginal?: number; 
  imagen: string;
  categoria: string;
  vendido: number; 
  fechaVenta: Date;
  rating?: number;
}