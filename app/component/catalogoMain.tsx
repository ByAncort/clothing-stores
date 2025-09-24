import React, { useState } from 'react';
import type { Producto } from '~/types/product';




const productosMasVendidos: Producto[] = [
  {
    id: 1,
    nombre: "Dead Bloom (Acid) - Oversized Hoodie",
    tipo: "Oversized Hoodie",
    precio: 119.90,
    colores: 1,
    calificacion: 5,
    reseñas: 2,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/DeadBloom_Acid_-OversizedHoodie_350GSM_10.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/DeadBloom_Acid_-OversizedHoodie_350GSM_4.jpg",
    categoria: "Hoodies",
    descripcion: "Hoodie oversized de alta calidad 350GSM con diseño acid wash",
    especificaciones: ["350GSM", "Algodón premium", "Corte oversized"]
  },
  {
    id: 2,
    nombre: "Storm (Camo) - Shades",
    tipo: "Shades",
    precio: 59.90,
    colores: 1,
    calificacion: 5,
    reseñas: 5,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM10.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM1.jpg",
    categoria: "Accesorios",
    descripcion: "Gafas de sol con diseño camo y protección UV",
    especificaciones: ["Protección UV400", "Estilo camo", "Marco durable"]
  },
  {
    id: 3,
    nombre: "Think Twice - Oversized T-Shirt",
    tipo: "Oversized T-Shirt",
    precio: 49.90,
    colores: 3,
    calificacion: 4.5,
    reseñas: 7,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/ReignOfBloodGreyEdition-HeavyOversizedHoodie_400GSM_2_fcf8ddaa-ac2c-466d-a99b-851f4cc90413.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/ReignOfBloodGreyEdition-HeavyOversizedHoodie_400GSM_5_b4fb4203-b74f-4fcb-beb0-73b9a6580af9.jpg",
    categoria: "Camisetas",
    descripcion: "Camiseta oversized con estampado minimalista",
    especificaciones: ["200GSM", "Corte oversized", "Estampado duradero"]
  },
  {
    id: 4,
    nombre: "Reign of Blood - Heavy Oversized Hoodie",
    tipo: "Oversized Hoodie",
    precio: 119.90,
    colores: 2,
    calificacion: 5,
    reseñas: 3,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_3copy-2.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_20-2.jpg",
    categoria: "Hoodies",
    descripcion: "Hoodie heavy weight 400GSM edición limitada",
    especificaciones: ["400GSM", "Edición limitada", "Material heavy weight"]
  },
  {
    id: 5,
    nombre: "Nocturnal Oath - All Over Print T-Shirt",
    tipo: "Oversized T-Shirt",
    precio: 54.90,
    colores: 2,
    calificacion: 4.8,
    reseñas: 12,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM10.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/NocturnalOath-OversizedT-Shirt_allover_200GSM1.jpg",
    categoria: "Camisetas",
    descripcion: "Camiseta all over print con diseño nocturno",
    especificaciones: ["All over print", "200GSM", "Estampado completo"]
  },
  {
    id: 6,
    nombre: "Grimfall Half Half - Cargo Short",
    tipo: "Cargo Short",
    precio: 79.90,
    colores: 1,
    calificacion: 4.7,
    reseñas: 8,
    imagen: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_3copy-2.jpg",
    imagenSecundaria: "https://www.staycoldapparel.com/cdn/shop/files/Grimfall_HalfHalf_-CargoShort_260GSM_20-2.jpg",
    categoria: "Pantalones",
    descripcion: "Shorts cargo con diseño half half y múltiples bolsillos",
    especificaciones: ["260GSM", "Bolsillos cargo", "Diseño half half"]
  },
  {
    id: 7,
    nombre: "Shadow Realm - Beanie",
    tipo: "Beanie",
    precio: 34.90,
    colores: 4,
    calificacion: 4.9,
    reseñas: 15,
    imagen: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400",
    imagenSecundaria: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400",
    categoria: "Accesorios",
    descripcion: "Gorro beanie de lana merino con logo bordado",
    especificaciones: ["Lana merino", "Logo bordado", "Ajuste perfecto"]
  },
  {
    id: 8,
    nombre: "Eternal Night - Jogger Pants",
    tipo: "Jogger Pants",
    precio: 89.90,
    colores: 3,
    calificacion: 4.6,
    reseñas: 6,
    imagen: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400",
    imagenSecundaria: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400",
    categoria: "Pantalones",
    descripcion: "Pantalones jogger con cintura elástica y ajuste tapered",
    especificaciones: ["Cintura elástica", "Ajuste tapered", "Tela stretch"]
  }
];

const RatingStars: React.FC<{ rating: number; reseñas: number }> = ({ rating, reseñas }) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-600">({reseñas})</span>
    </div>
  );
};

// Componente de tarjeta de producto mejorada
const ProductCard: React.FC<{ producto: Producto }> = ({ producto }) => {
  const [imageHover, setImageHover] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
      <div 
        className="relative overflow-hidden rounded-t-lg"
        onMouseEnter={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}
      >
        <img 
          src={imageHover ? producto.imagenSecundaria : producto.imagen} 
          alt={producto.nombre}
          className="w-full h-80 object-cover transition-opacity duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-gray-900 text-white px-3 py-1 text-xs rounded-full font-medium">
            {producto.categoria}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white text-gray-900 px-2 py-1 text-xs rounded-full font-medium border border-gray-200">
            {producto.colores} color{producto.colores > 1 ? 'es' : ''}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <button className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-200 shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{producto.nombre}</h3>
        <p className="text-gray-500 text-sm mb-2">{producto.tipo}</p>
        
        <RatingStars rating={producto.calificacion} reseñas={producto.reseñas} />
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{producto.descripcion}</p>
        
        {/* Especificaciones */}
        <div className="flex flex-wrap gap-1 mb-4">
          {producto.especificaciones.map((spec, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded">
              {spec}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">${producto.precio.toFixed(2)}</span>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de filtros mejorado
const FilterSection: React.FC<{
  categorias: string[];
  categoriaSeleccionada: string;
  onCategoriaChange: (categoria: string) => void;
  ordenarPor: string;
  onOrdenarChange: (orden: string) => void;
  precioRango: [number, number];
  onPrecioRangoChange: (rango: [number, number]) => void;
}> = ({ categorias, categoriaSeleccionada, onCategoriaChange, ordenarPor, onOrdenarChange, precioRango, onPrecioRangoChange }) => {
  return (
<div className="bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg p-6 mb-8">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Filtro por categoría */}
    <div>
      <h3 className="text-sm font-medium text-gray-300 mb-4 tracking-wide">Categorías</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoriaChange('')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            categoriaSeleccionada === '' 
              ? 'bg-white text-gray-900 shadow-md' 
              : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
          }`}
        >
          Todas
        </button>
        {categorias.map(categoria => (
          <button
            key={categoria}
            onClick={() => onCategoriaChange(categoria)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              categoriaSeleccionada === categoria 
                ? 'bg-white text-gray-900 shadow-md' 
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>
    </div>

    {/* Filtro por precio */}
    <div>
      <h3 className="text-sm font-medium text-gray-300 mb-4 tracking-wide">Rango de Precio</h3>
      <div className="space-y-3">
        <input
          type="range"
          min="0"
          max="200"
          value={precioRango[1]}
          onChange={(e) => onPrecioRangoChange([precioRango[0], parseInt(e.target.value)])}
          className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-sm text-gray-400">
          <span>$0</span>
          <span className="font-medium text-white">Hasta ${precioRango[1]}</span>
        </div>
      </div>
    </div>

    {/* Ordenar por */}
    <div>
      <h3 className="text-sm font-medium text-gray-300 mb-4 tracking-wide">Ordenar por</h3>
      <select 
        value={ordenarPor}
        onChange={(e) => onOrdenarChange(e.target.value)}
        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-colors"
      >
        <option value="nombre">Nombre A-Z</option>
        <option value="precio-menor">Precio: Menor a Mayor</option>
        <option value="precio-mayor">Precio: Mayor a Menor</option>
        <option value="calificacion">Mejor Calificados</option>
        <option value="reseñas">Más Reseñas</option>
      </select>
    </div>
  </div>
</div>
  );
};

// Componente principal del catálogo mejorado
const CatalogMain: React.FC = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');
  const [ordenarPor, setOrdenarPor] = useState<string>('nombre');
  const [precioRango, setPrecioRango] = useState<[number, number]>([0, 150]);

  // Obtener categorías únicas
  const categorias = Array.from(new Set(productosMasVendidos.map(producto => producto.categoria)));

  // Filtrar y ordenar productos
  const productosFiltrados = productosMasVendidos
    .filter(producto => {
      const cumpleCategoria = categoriaSeleccionada === '' || producto.categoria === categoriaSeleccionada;
      const cumplePrecio = producto.precio <= precioRango[1];
      return cumpleCategoria && cumplePrecio;
    })
    .sort((a, b) => {
      switch (ordenarPor) {
        case 'precio-menor':
          return a.precio - b.precio;
        case 'precio-mayor':
          return b.precio - a.precio;
        case 'calificacion':
          return b.calificacion - a.calificacion;
        case 'reseñas':
          return b.reseñas - a.reseñas;
        case 'nombre':
        default:
          return a.nombre.localeCompare(b.nombre);
      }
    });

  return (
    <div className="min-h-screen bg-gray-900 py-8 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header mejorado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-200 mb-4">Catálogo de Productos</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Descubre nuestra colección exclusiva de ropa y accesorios con diseño urbano y calidad premium
          </p>
        </div>


        {/* Filtros */}
        <FilterSection
          categorias={categorias}
          categoriaSeleccionada={categoriaSeleccionada}
          onCategoriaChange={setCategoriaSeleccionada}
          ordenarPor={ordenarPor}
          onOrdenarChange={setOrdenarPor}
          precioRango={precioRango}
          onPrecioRangoChange={setPrecioRango}
        />

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productosFiltrados.map(producto => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {productosFiltrados.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600">Intenta ajustar los filtros para ver más resultados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogMain;