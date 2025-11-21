import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductModal from './ProductModal';

// --- 1. DICCIONARIO DE RESPALDO (Sólo se usa si tus fotos fallan) ---
const IMAGENES_POR_DEFECTO: Record<string, string> = {
    'Poleras': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    'Hoodies': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    'Chaquetas': 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=800&q=80',
    'Accesorios': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    'Joyas': 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800&q=80',
    'Shorts': 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80'
};

// --- 2. TUS DATOS CON TUS LINKS ORIGINALES ---
const PRODUCTOS_SIMULADOS: ProductoBackend[] = [
    {
        id: 1, 
        nombre: 'Urban Tee White', 
        marca: 'StayCold', 
        descripcion: 'Corte oversize, algodón pesado.',
        precio: 29.99, 
        stock: 50, 
        categoria: 'Poleras', 
        // TU LINK ORIGINAL
        imagenUrl: 'https://www.staycoldapparel.com/cdn/shop/files/Think_Twice_Oversized_Tee_White_7.jpg?v=1749041218&width=800', 
        sku: 'MOCK-001', 
        calificacion: 5
    },
    {
        id: 2, 
        nombre: 'Denim Jacket Pro', 
        marca: 'UrbanStyle', 
        descripcion: 'Estilo callejero clásico.',
        precio: 65.00, 
        stock: 20, 
        categoria: 'Chaquetas', 
        // TU LINK ORIGINAL
        imagenUrl: 'https://www.staycoldapparel.com/cdn/shop/files/ReignOfBlood_grey_-BomberJacket_AcidWashed_63.jpg?v=1760096328&width=800', 
        sku: 'MOCK-002', 
        calificacion: 4
    },
    {
        id: 3, 
        nombre: 'Eternal Conquest 3.0 - Tote Bag', 
        marca: 'TravelGear', 
        descripcion: 'Resistente para todo viaje.',
        precio: 45.50, 
        stock: 30, 
        categoria: 'Accesorios', 
        // TU LINK ORIGINAL
        imagenUrl: 'https://www.staycoldapparel.com/cdn/shop/files/EternalConquestBag3.jpg?v=1731339655&width=800', 
        sku: 'MOCK-003', 
        calificacion: 5
    },
    {
        id: 4, 
        nombre: 'Black Hoodie', 
        marca: 'StayCold', 
        descripcion: 'El básico infaltable.',
        precio: 50.00, 
        stock: 10, 
        categoria: 'Hoodies', 
        // TU LINK ORIGINAL
        imagenUrl: 'https://www.staycoldapparel.com/cdn/shop/files/Daggerwave_greydye_-OversizedHoodie_350GSM_4.jpg?v=1759480842&width=800', 
        sku: 'MOCK-004', 
        calificacion: 5
    },
    {
        id: 5, 
        nombre: 'Nightbreed (purple tie dye) - Prime Shorts', 
        marca: 'StayCold', 
        descripcion: 'Nightbreed Essential Prime Shorts.',
        precio: 50.00, 
        stock: 10, 
        categoria: 'Shorts', 
        // TU LINK ORIGINAL
        imagenUrl: 'https://www.staycoldapparel.com/cdn/shop/files/NigthbreedEssential-PrimeShorts-purple-allover19.jpg?v=1753897872&width=800', 
        sku: 'MOCK-004', 
        calificacion: 5
    }
  ];

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

type Ordenamiento = 'nombre' | 'precio-asc' | 'precio-desc' | 'calificacion' | 'mas-recientes';
type FiltroCategoria = string;

const categoryMapping: Record<string, string> = {
    't-shirts': 'Poleras',
    'hoodies': 'Hoodies',
    'jackets': 'Chaquetas',
    'shorts': 'Shorts',
    'accessories': 'Accesorios',
};

export default function ProductList() {
  const { categoryName } = useParams();
  const location = useLocation();

  const [productos, setProductos] = useState<ProductoBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductoBackend | null>(null);
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

  // Cargar datos
  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(res => {
        if (!res.ok) throw new Error("Error conectando al Backend");
        return res.json();
      })
      .then(data => {
        const dataMejorada = data.map((p: any) => ({
            ...p,
            calificacion: 5,
            imagenSecundaria: p.imagenUrl
        }));
        setProductos(dataMejorada);
        setLoading(false);
      })
      .catch(err => {
        console.warn("⚠️ Backend no disponible. Usando datos simulados.", err);
        setProductos(PRODUCTOS_SIMULADOS);
        setError(null); 
        setLoading(false);
      });
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

  if (loading) return <div className="text-center py-20 text-white">Cargando catálogo...</div>;
  
  if (error && productos.length === 0) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="py-12 mt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl capitalize">
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
          {productosFiltradosYOrdenados.map((product, index) => {
            
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
                // IMPORTANTE: Pasamos la imagen corregida al modal para que no se rompa ahí tampoco
                onClick={() => setSelectedProduct({ ...product, imagenUrl: imagenFinal })} 
              >
                <div className="aspect-[3/4] w-full bg-gray-200 relative flex items-center justify-center overflow-hidden">
                    <img
                        src={imagenFinal}
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
                product={selectedProduct as any}
                onClose={() => setSelectedProduct(null)}
            />
        )}
      </div>
    </div>
  );
}