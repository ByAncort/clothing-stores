import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductModal from './ProductModal';

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

  useEffect(() => {
    if (categoryName && categoryMapping[categoryName.toLowerCase()]) {
      setCategoriaSeleccionada(categoryMapping[categoryName.toLowerCase()]);
    } else {
      setCategoriaSeleccionada('todas');
    }
  }, [location, categoryName]);

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

  if (loading) return <div className="text-center py-32 text-white font-oswald text-xl animate-pulse">LOADING CATALOG...</div>;
  if (error) return <div className="text-center py-32 text-red-500 font-oswald text-xl">{error}</div>;

  return (
    <div className="py-20 min-h-screen bg-black">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold font-oswald text-white uppercase tracking-tighter mb-4">
            {categoriaSeleccionada === 'todas' ? 'All Products' : categoriaSeleccionada}
          </h2>
          {productosFiltradosYOrdenados.length === 0 && (
            <p className="mt-4 text-lg text-gray-400 font-sans uppercase tracking-widest">No products found.</p>
          )}
        </div>

        {/* Filters */}
        <div className="mb-12 glass p-6 rounded-none border border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Category Select */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Category</label>
              <select
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="w-full lg:w-auto bg-black text-white border border-white/20 rounded-none px-4 py-2 focus:ring-1 focus:ring-white focus:border-white uppercase font-oswald tracking-wide"
              >
                {categoriasDB.map(cat => (
                  <option key={cat} value={cat}>{cat === 'todas' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex-1 text-center">
              {(categoriaSeleccionada !== 'todas' || ordenamiento !== 'mas-recientes') && (
                <button
                  onClick={() => { setCategoriaSeleccionada('todas'); setOrdenamiento('mas-recientes'); }}
                  className="text-sm text-gray-400 hover:text-white underline uppercase tracking-widest font-bold transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex-1 text-right">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Sort By</label>
              <select
                value={ordenamiento}
                onChange={(e) => setOrdenamiento(e.target.value as Ordenamiento)}
                className="w-full lg:w-auto bg-black text-white border border-white/20 rounded-none px-4 py-2 focus:ring-1 focus:ring-white focus:border-white uppercase font-oswald tracking-wide"
              >
                <option value="mas-recientes">Newest</option>
                <option value="nombre">Name A-Z</option>
                <option value="precio-asc">Price: Low to High</option>
                <option value="precio-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {productosFiltradosYOrdenados.map((product, index) => {
            const isImageBroken = failedImages.has(product.id);

            return (
              <div
                key={product.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => setSelectedProduct(product)}
              >
                {/* Image Container */}
                <div className="aspect-[3/4] w-full bg-gray-900 relative overflow-hidden mb-4 border border-white/5">
                  {isImageBroken ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                      <span className="text-xs font-bold uppercase tracking-widest">No Image</span>
                    </div>
                  ) : (
                    <img
                      src={product.imagenUrl}
                      alt={product.nombre}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      onError={() => handleImageError(product.id)}
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3 className="font-oswald text-lg font-medium text-white uppercase tracking-wide line-clamp-1 group-hover:text-gray-300 transition-colors">
                    {product.nombre}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                      {product.marca}
                    </p>
                    <span className="font-oswald text-lg font-bold text-white">
                      ${product.precio}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
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