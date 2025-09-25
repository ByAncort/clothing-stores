import React, { useMemo, useState } from 'react';
import type { Producto } from '~/types/product';
import ProductModal from './ProductModal';

interface ProductListProps {
  productos: Producto[];
  titulo?: string;
  subtitulo?: string;
}

type Ordenamiento = 'nombre' | 'precio-asc' | 'precio-desc' | 'calificacion' | 'mas-recientes';
type FiltroCategoria = 'todas' | string;




export default function ProductList({ productos, titulo = "Colección Destacada", subtitulo = "Descubre nuestros productos más vendidos mezclados con contenido exclusivo en video" }: ProductListProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [ordenamiento, setOrdenamiento] = useState<Ordenamiento>('mas-recientes');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<FiltroCategoria>('todas');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const categorias = useMemo(() => {
    const cats = [...new Set(productos.map(producto => producto.categoria))];
    return ['todas', ...cats];
  }, [productos]);
  // Filtrar y ordenar productos
  const productosFiltradosYOrdenados = useMemo(() => {
    let productosFiltrados = productos;

    // Filtrar por categoría
    if (categoriaSeleccionada !== 'todas') {
      productosFiltrados = productosFiltrados.filter(
        producto => producto.categoria === categoriaSeleccionada
      );
    }
    // Ordenar productos
    return productosFiltrados.sort((a, b) => {
      switch (ordenamiento) {
        case 'nombre':
          return a.nombre.localeCompare(b.nombre);

        case 'precio-asc':
          return a.precio - b.precio;

        case 'precio-desc':
          return b.precio - a.precio;

        case 'calificacion':
          return b.calificacion - a.calificacion;

        case 'mas-recientes':
        default:
          return b.id - a.id; 
      }
    });
  }, [productos, categoriaSeleccionada, ordenamiento]);

  if (!productos || productos.length === 0) {
    return (
      <div className="py-12 mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-600">No hay productos disponibles</p>
        </div>
      </div>
    );
  }
  console.log('Productos renderizados:', productosFiltradosYOrdenados.length);
  return (
    <div className="py-12 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-500 sm:text-5xl">
            {titulo}
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            {subtitulo}
          </p>
        </div>

        {/* Barra de filtros */}
        <div className="mb-8 ">
          {/* Botón para mostrar/ocultar filtros en móvil */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <h3 className="text-lg font-semibold text-white">Filtros</h3>
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
            </button>
          </div>

          {/* Contenedor de filtros */}
          <div className={`${mostrarFiltros ? 'block' : 'hidden'} lg:flex lg:items-center lg:justify-between lg:space-x-6 space-y-4 lg:space-y-0`}>
            {/* Filtro por categoría */}
            <div className="flex-1">
              <label htmlFor="categoria" className="block text-sm font-medium text-white mb-2">
                Categoría
              </label>
              <select
                id="categoria"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="w-full lg:w-auto text-white text-sm"
              >
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria} className="text-gray-900">
                    {categoria === 'todas' ? 'Todas las categorías' : categoria}
                  </option>
                ))}
              </select>
            </div>

            {/* Información de resultados */}
            <div className="flex-1 text-center">
              {(categoriaSeleccionada !== 'todas' || ordenamiento !== 'mas-recientes') && (
                <button
                  onClick={() => {
                    setCategoriaSeleccionada('todas');
                    setOrdenamiento('mas-recientes');
                  }}
                  className="mt-2 text-sm text-gray-500 hover:text-gray-800 underline underline-offset-4 transition-colors duration-200"
                >
                  Limpiar filtros
                </button>
              )}
            </div>


            {/* Ordenamiento */}
            <div className="flex-1 text-right">
              <label htmlFor="ordenamiento" className="block text-sm font-medium text-white mb-2">
                Ordenar por
              </label>
              <select
                id="ordenamiento"
                value={ordenamiento}
                onChange={(e) => setOrdenamiento(e.target.value as Ordenamiento)}
                className="w-full lg:w-auto text-white text-sm"
              >
                <option value="mas-recientes" className="text-gray-900">Más recientes</option>
                <option value="nombre" className="text-gray-900">Nombre A-Z</option>
                <option value="precio-asc" className="text-gray-900">Precio: Menor a Mayor</option>
                <option value="precio-desc" className="text-gray-900">Precio: Mayor a Menor</option>
                <option value="calificacion" className="text-gray-900">Mejor calificados</option>
              </select>
            </div>

          </div>
        </div>

        {/* Contenedor con grid más flexible */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 sm:grid-rows-[auto] auto-rows-[300px]">
          {productosFiltradosYOrdenados.map((product, index) => {
            // Definir patrones más predecibles
            const getSizeClass = () => {
              if (index % 7 === 0) return 'sm:col-span-2 sm:row-span-2'; // Grande
              if (index % 5 === 0) return 'sm:col-span-2'; // Ancho
              if (index % 3 === 0) return 'sm:row-span-2'; // Alto
              return ''; // Normal
            };

            return (
              <div
                key={product.id}
                className={`group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg shadow-black transition-all duration-300 hover:shadow-xl cursor-pointer ${getSizeClass()}`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => setSelectedProduct(product)} // Abrir modal al hacer click
              >
                {/* Imagen principal */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                  style={{
                    backgroundImage: `url(${product.imagen})`,
                    opacity: hoveredProduct === product.id ? 0 : 1
                  }}
                />

                {/* Imagen secundaria (hover) */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                  style={{
                    backgroundImage: `url(${product.imagenSecundaria || product.imagen})`,
                    opacity: hoveredProduct === product.id ? 1 : 0
                  }}
                />

                {/* Overlay de información */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex flex-col items-start justify-between mb-2 p-3 rounded-xl overflow-hidden backdrop-blur-sm bg-white/30 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                      {product.nombre}
                    </h3>
                    <span className="ml-2 text-lg font-bold text-gray-900">
                      ${product.precio}
                    </span>
                  </div>
                </div>

                {/* Overlay adicional para hover */}
                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  }`} />
              </div>
            );
          })}
        </div>

        {/* Modal de selección de producto */}
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      </div>
    </div>
  );
}

// Componente StarRating (necesario para el modal)
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}