// types/producto.ts
export interface ProductoDto {
  id?: number;
  codigoSku: string;
  nombre: string;
  imagePrimary?: string;
  imageSecondary?: string;
  descripcion?: string;
  precio: number;
  costo?: number;
  stock: number;
  categoriaId: number;
  catalogo?: string;
  serial?: string;
  proveedorId?: number;
  tipo?: string;
  tallas?: string[];
  colores?: string[];
  material?: string;
  marca?: string;
  temporada?: string;
  especificaciones?: Record<string, string>;
}