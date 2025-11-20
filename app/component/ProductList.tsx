import React, { useMemo, useState, useEffect } from 'react';
// IMPORTANTE: Importamos hooks del router para leer la URL
import { useParams, useLocation } from 'react-router-dom';
import ProductModal from './ProductModal';

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
  // Campos opcionales simulados
  calificacion?: number;
  imagenSecundaria?: string;
}

type Ordenamiento = 'nombre' | 'precio-asc' | 'precio-desc' | 'calificacion' | 'mas-recientes';
// El filtro ahora puede venir de la URL, así que aceptamos cualquier string
type FiltroCategoria = string;

// --- MAPEO DE URL A CATEGORÍAS DE LA BD ---
// Esto es necesario porque en el header dice "T-Shirts" (inglés/slug)
// pero en tu base de datos dice "Poleras" (español/capitalizado).
const categoryMapping: Record<string, string> = {
    't-shirts': 'Poleras',
    'hoodies': 'Hoodies',
    'jackets': 'Chaquetas',
    'shorts': 'Shorts',
    'accessories': 'Accesorios',
    // Añade aquí más mapeos si los necesitas
};


export default function ProductList() {
  // --- HOOKS DEL ROUTER ---
  // Asumimos que tu ruta es algo como "/catalog/:categoryName"
  const { categoryName } = useParams();
  const location = useLocation();

  // --- ESTADOS ---
  const [productos, setProductos] = useState<ProductoBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Nuevo estado: Guarda los IDs de las imágenes que fallaron al cargar
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductoBackend | null>(null);
  const [ordenamiento, setOrdenamiento] = useState<Ordenamiento>('mas-recientes');
  // Inicializamos la categoría basada en la URL si existe, sino 'todas'
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<FiltroCategoria>('todas');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);


  // 1. EFECTO PARA SINCRONIZAR URL CON EL FILTRO (SOLUCIÓN PUNTO 1)
  useEffect(() => {
      // Si hay un parámetro en la URL (ej: "t-shirts")
      if (categoryName && categoryMapping[categoryName.toLowerCase()]) {
          // Usamos el mapeo para seleccionar la categoría correcta de la BD ("Poleras")
          setCategoriaSeleccionada(categoryMapping[categoryName.toLowerCase()]);
      } else {
          // Si no hay parámetro o no coincide, mostramos 'todas'
          setCategoriaSeleccionada('todas');
      }
      // Este efecto se ejecuta cada vez que la URL (location) cambia
  }, [location, categoryName]);


  // 2. EFECTO PARA CARGAR DATOS DEL BACKEND
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
        console.error(err);
        setError("No se pudo conectar con el microservicio de productos.");
        setLoading(false);
      });
  }, []);

  // --- LÓGICA DE FILTROS ---
  const categoriasDB = useMemo(() => {
    const cats = [...new Set(productos.map(producto => producto.categoria))];
    return ['todas', ...cats];
  }, [productos]);

  const productosFiltradosYOrdenados = useMemo(() => {
    let filtrados = [...productos];

    if (categoriaSeleccionada !== 'todas') {
      // Filtramos exacto por el nombre de la categoría en la BD
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

  // Función para manejar el error de imagen (SOLUCIÓN PUNTO 2)
  const handleImageError = (id: number) => {
      setFailedImages(prev => new Set(prev).add(id));
  };


  if (loading) return <div className="text-center py-20 text-white">Cargando catálogo...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="py-12 mt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado dinámico */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl capitalize">
            {categoriaSeleccionada === 'todas' ? 'Colección Destacada' : categoriaSeleccionada}
          </h2>
          {productosFiltradosYOrdenados.length === 0 && (
             <p className="mt-4 text-lg text-gray-500">No se encontraron productos en esta categoría.</p>
          )}
        </div>

        {/* Barra de filtros (Select) */}
        <div className="mb-8 bg-gray-900 p-4 rounded-xl shadow-lg">
           {/* ... (Código de botones móvil omitido para brevedad, funciona igual) ... */}
          <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0`}>
            {/* Select Categoría (Sincronizado con el estado) */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Categoría</label>
              <select
                value={categoriaSeleccionada}
                // Si cambian el select manualmente, también actualizamos
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="w-full lg:w-auto bg-gray-800 text-white border-gray-700 rounded-md"
              >
                {categoriasDB.map(cat => (
                  <option key={cat} value={cat}>{cat === 'todas' ? 'Todas' : cat}</option>
                ))}
              </select>
            </div>

             {/* Botón Limpiar */}
            <div className="flex-1 text-center">
                {(categoriaSeleccionada !== 'todas' || ordenamiento !== 'mas-recientes') && (
                    // Si limpian filtros, quizás quieras redirigir a /catalog también
                    <button
                        onClick={() => { setCategoriaSeleccionada('todas'); setOrdenamiento('mas-recientes'); }}
                        className="text-sm text-gray-400 hover:text-white underline"
                    >
                        Limpiar filtros
                    </button>
                )}
            </div>

            {/* Select Ordenar */}
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
            const getSizeClass = () => {
                // Simplifiqué un poco el masonry para probar, puedes volver al tuyo si prefieres
                if (index === 0) return 'sm:col-span-2 sm:row-span-2';
                return '';
            };
            // Verificamos si esta imagen ha fallado
            const isImageBroken = failedImages.has(product.id);

            return (
              <div
                key={product.id}
                className={`group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${getSizeClass()}`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => setSelectedProduct(product)}
              >
                {/* CONTENEDOR DE IMAGEN (SOLUCIÓN PUNTOS 2 y 3) */}
                {/* Usamos aspect-[3/4] o aspect-square para forzar una proporción */}
                <div className="aspect-[3/4] w-full bg-gray-200 relative flex items-center justify-center overflow-hidden">
                    
                    {/* Si la imagen está rota, mostramos el texto */}
                    {isImageBroken ? (
                         <div className="flex flex-col items-center justify-center text-gray-400">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-2">
                               <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                             </svg>
                             <span className="text-sm font-bold">Sin Imagen</span>
                         </div>
                    ) : (
                        // Si no está rota, intentamos renderizarla
                        <img
                            src={product.imagenUrl}
                            alt={product.nombre}
                            // object-cover + h-full w-full asegura que llene el contenedor aspect-[3/4]
                            className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500 relative z-10"
                            onError={() => handleImageError(product.id)}
                        />
                    )}
                </div>

                {/* Overlay Información */}
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

        {/* MODAL */}
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