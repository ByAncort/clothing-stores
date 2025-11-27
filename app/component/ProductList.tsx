import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductModal from './ProductModal';
import { ProductService } from '~/service/ProductService';

// --- INTERFACES ---
interface ProductoBackend {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagenUrl: string;
  sku: string;
  calificacion?: number;
  imagenSecundaria?: string;
}

// Añade esta interfaz Producto que falta
export interface Producto {
  // --- Campos Obligatorios (Vienen del Backend) ---
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagenUrl: string;
  sku: string;

  // --- Campos Opcionales / Visuales (Frontend) ---
  colores?: number;
  imagenSecundaria?: string;
  reseñas?: number;
  calificacion?: number;
  tipo?: string;

  // --- Propiedades Legacy (Compatibilidad con código viejo) ---
  imagen?: string; 
  price?: number;
  name?: string;
  especificaciones?: string[];
  esVideo?: boolean;
  videoUrl?: string;
}

type Ordenamiento = 'nombre' | 'precio-asc' | 'precio-desc' | 'calificacion' | 'mas-recientes';
type FiltroCategoria = string;

const categoryMapping: Record<string, string> = {
    't-shirts': 'Poleras',
    'hoodies': 'Hoodies',
    'jackets': 'Chaquetas',
    'shorts': 'Shorts',
    'accessories': 'Accesorios',
};

// Añade estas constantes que faltan (ajusta según tus necesidades)
const PRODUCTOS_SIMULADOS: ProductoBackend[] = [
  // Tus productos simulados aquí
];

const IMAGENES_POR_DEFECTO: Record<string, string> = {
  'Poleras': 'https://via.placeholder.com/300x400',
  'Hoodies': 'https://via.placeholder.com/300x400',
  'Chaquetas': 'https://via.placeholder.com/300x400',
  'Shorts': 'https://via.placeholder.com/300x400',
  'Accesorios': 'https://via.placeholder.com/300x400',
};

// DTO function - SOLO UNA VEZ
export const productoBackendToProducto = (
  productoBackend: ProductoBackend, 
  opciones: {
    colores?: number;
    reseñas?: number;
    tipo?: string;
    especificaciones?: string[];
  } = {}
): Producto => {
  return {
    // Campos del backend
    id: productoBackend.id,
    nombre: productoBackend.nombre,
    marca: productoBackend.marca,
    descripcion: productoBackend.descripcion,
    precio: productoBackend.precio,
    stock: productoBackend.stock,
    categoria: productoBackend.categoria,
    imagenUrl: productoBackend.imagenUrl,
    sku: productoBackend.sku,
    calificacion: productoBackend.calificacion,
    imagenSecundaria: productoBackend.imagenSecundaria,
    
    // Campos legacy
    imagen: productoBackend.imagenUrl,
    price: productoBackend.precio,
    name: productoBackend.nombre,
    
    // Campos opcionales con valores por defecto
    colores: opciones.colores,
    reseñas: opciones.reseñas,
    tipo: opciones.tipo,
    especificaciones: opciones.especificaciones,
    
    // Campos que normalmente serían false/undefined
    esVideo: false,
    videoUrl: undefined
  };
};

export default function ProductList() {
  const { categoryName } = useParams();
  const location = useLocation();

  const [productos, setProductos] = useState<ProductoBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  // CORREGIDO: Ahora usa la interfaz Producto
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  const [ordenamiento, setOrdenamiento] = useState<Ordenamiento>('mas-recientes');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<FiltroCategoria>('todas');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Sincronizar URL con Categoría
  useEffect(() => {
      if (categoryName && categoryMapping[categoryName.toLowerCase()]) {
          setCategoriaSeleccionada(categoryMapping[categoryName.toLowerCase()]);
      } else {
          setCategoriaSeleccionada('todas');
      }
  }, [location, categoryName]);

  // Cargar datos usando el ProductService
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await ProductService.getAll();
        setProductos(data as ProductoBackend[]);
        setLoading(false);
      } catch (err) {
        console.warn("⚠️ Backend no disponible. Usando datos simulados.", err);
        setProductos(PRODUCTOS_SIMULADOS);
        setError(null); 
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categoriasDB = useMemo(() => {
    const cats = [...new Set(productos.map(producto => producto.categoria))];
    return ['todas', ...cats];
  }, [productos]);

  const productosFiltradosYOrdenados = useMemo(() => {
    let filtrados = [...productos];
    if (categoriaSeleccionada !== 'todas') {
      filtrados = filtrados.filter(p => p.categoria === categoriaSeleccionada);
    }
    return filtrados.sort((a, b) => {
      switch (ordenamiento) {
        case 'nombre': return a.nombre.localeCompare(b.nombre);
        case 'precio-asc': return a.precio - b.precio;
        case 'precio-desc': return b.precio - a.precio;
        case 'calificacion': return (b.calificacion || 0) - (a.calificacion || 0);
        case 'mas-recientes': default: return b.id - a.id;
      }
    });
  }, [productos, categoriaSeleccionada, ordenamiento]);

  const handleImageError = (id: number) => {
      setFailedImages(prev => new Set(prev).add(id));
  };

  // Función para manejar el clic en producto - CONVERTIR A Producto
  const handleProductClick = (productBackend: ProductoBackend) => {
    const isImageBroken = failedImages.has(productBackend.id) || !productBackend.imagenUrl;
    const imagenFinal = isImageBroken 
        ? (IMAGENES_POR_DEFECTO[productBackend.categoria] || IMAGENES_POR_DEFECTO['Accesorios'])
        : productBackend.imagenUrl;

    // Crear producto con imagen corregida
    const productWithFixedImage: ProductoBackend = {
      ...productBackend,
      imagenUrl: imagenFinal
    };

    // Convertir a Producto usando el DTO
    const productoConvertido = productoBackendToProducto(productWithFixedImage);
    setSelectedProduct(productoConvertido);
  };

  if (loading) return <div className="text-center py-20 text-white">Cargando catálogo...</div>;
  
  if (error && productos.length === 0) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="py-12 mt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-red-500 sm:text-5xl capitalize">
            {categoriaSeleccionada === 'todas' ? 'Colección Destacada' : categoriaSeleccionada}
          </h2>
        </div>

        {/* Filtros */}
        <div className="mb-8 bg-gray-900 p-4 rounded-xl shadow-lg">
          <div className="flex justify-between items-center lg:hidden mb-4">
            <h3 className="text-lg font-semibold text-white">Filtros</h3>
            <button onClick={() => setMostrarFiltros(!mostrarFiltros)} className="p-2 rounded-lg bg-white/20 text-white">
              Filtrar
            </button>
          </div>

          <div className={`${mostrarFiltros ? 'block' : 'hidden'} lg:flex lg:items-center lg:justify-between lg:space-x-6 space-y-4 lg:space-y-0`}>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Categoría</label>
              <select
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="w-full lg:w-auto bg-gray-800 text-white border-gray-700 rounded-md"
              >
                {categoriasDB.map(cat => (
                  <option key={cat} value={cat}>{cat === 'todas' ? 'Todas' : cat}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 text-center">
                {(categoriaSeleccionada !== 'todas' || ordenamiento !== 'mas-recientes') && (
                    <button 
                        onClick={() => { setCategoriaSeleccionada('todas'); setOrdenamiento('mas-recientes'); }}
                        className="text-sm text-gray-400 hover:text-white underline"
                    >
                        Limpiar filtros
                    </button>
                )}
            </div>

            <div className="flex-1 text-right">
              <label className="block text-sm font-medium text-gray-300 mb-1">Ordenar por</label>
              <select
                value={ordenamiento}
                onChange={(e) => setOrdenamiento(e.target.value as Ordenamiento)}
                className="w-full lg:w-auto bg-gray-800 text-white border-gray-700 rounded-md"
              >
                <option value="mas-recientes">Más recientes</option>
                <option value="nombre">Nombre A-Z</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* GRID DE PRODUCTOS */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productosFiltradosYOrdenados.map((product) => {
            
            // LÓGICA: Intentamos usar la URL del producto (tus links).
            // Si falla, usa el diccionario de Unsplash.
            const isImageBroken = failedImages.has(product.id) || !product.imagenUrl;
            const imagenFinal = isImageBroken 
                ? (IMAGENES_POR_DEFECTO[product.categoria] || IMAGENES_POR_DEFECTO['Accesorios'])
                : product.imagenUrl;

            return (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                // CORREGIDO: Usar la función de conversión
                onClick={() => handleProductClick(product)} 
              >
                <div className="aspect-[3/4] w-full bg-gray-200 relative flex items-center justify-center overflow-hidden">
                    <img
                        src={product.imagenUrl}
                        alt={product.nombre}
                        className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            // Si tu link de StayCold falla, dispara esto y lo cambia por Unsplash
                            handleImageError(product.id);
                        }}
                    />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                   <div className="text-white">
                     <h3 className="font-bold text-lg truncate">{product.nombre}</h3>
                     <p className="text-sm opacity-90">{product.marca}</p>
                     <div className="mt-2 font-bold text-xl">${product.precio}</div>
                   </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedProduct && (
            <ProductModal
                product={selectedProduct} // Ahora es tipo Producto, no any
                onClose={() => setSelectedProduct(null)}
            />
        )}
      </div>
    </div>
  );
}