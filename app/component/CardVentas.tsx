import React, { useState } from 'react';

// Interfaz para el tipo de dato Producto
interface Producto {
  id: number;
  nombre: string;
  tipo: string;
  precio: number;
  precioOriginal?: number;
  descuento?: number;
  colores: number;
  calificacion: number;
  reseñas: number;
  imagen: string;
  video?: string; // Nueva propiedad para videos
  esNuevo?: boolean; // Nueva propiedad para productos nuevos
  esTrending?: boolean; // Nueva propiedad para productos trending
}

// Props del componente
interface CardVentasProps {
  productos: Producto[];
}

const CardVentas: React.FC<CardVentasProps> = ({ productos }) => {
  // Estado para controlar qué producto tiene el video activo
  const [videoActivo, setVideoActivo] = useState<number | null>(null);

  // Función para renderizar las estrellas de calificación
  const renderEstrellas = (calificacion: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 ${i < calificacion ? 'text-yellow-400' : 'text-gray-400'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">Los más vendidos</h2>
        <span className="text-xs text-gray-500 font-mono bg-gray-200 px-2 py-1 rounded">STREET COLLECTION</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productos.map((producto) => (
          <div 
            key={producto.id} 
            className="bg-white rounded-none shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 relative overflow-hidden group"
            onMouseEnter={() => producto.video && setVideoActivo(producto.id)}
            onMouseLeave={() => setVideoActivo(null)}
          >
            {/* Badges para productos nuevos y trending */}
            <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
              {producto.esNuevo && (
                <span className="bg-black text-white text-xs px-2 py-1 font-bold uppercase">Nuevo</span>
              )}
              {producto.esTrending && (
                <span className="bg-red-600 text-white text-xs px-2 py-1 font-bold uppercase">Trending</span>
              )}
            </div>
            
            {/* Contenedor de imagen/video */}
            <div className="h-72 overflow-hidden relative bg-gray-100">
              {producto.video && videoActivo === producto.id ? (
                <video 
                  autoPlay 
                  loop 
                  muted 
                  className="w-full h-full object-cover"
                >
                  <source src={producto.video} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              
              {/* Overlay con botones de acción */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white text-black px-4 py-2 font-bold text-sm mx-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  Ver Detalles
                </button>
                <button className="bg-black text-white px-4 py-2 font-bold text-sm mx-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  Agregar al Carrito
                </button>
              </div>
            </div>
            
            {/* Contenido de la tarjeta */}
            <div className="p-4 border-t border-gray-200">
              {/* Tipo y colores */}
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1 font-mono">{producto.tipo}</p>
              
              {/* Nombre del producto */}
              <h3 className="font-bold text-gray-900 text-base mb-1 uppercase tracking-wide">{producto.nombre}</h3>
              
              {/* Calificación y reseñas */}
              <div className="flex items-center mb-2">
                {renderEstrellas(producto.calificacion)}
                <span className="ml-2 text-xs text-gray-500">
                  ({producto.reseñas})
                </span>
              </div>
              
              <p className="text-gray-500 text-xs mb-3">{producto.colores} Colores disponibles</p>
              
              {/* Precio */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {producto.precioOriginal && producto.precioOriginal > producto.precio ? (
                    <>
                      <span className="text-lg font-bold text-gray-900">${producto.precio.toLocaleString('es-CL')}</span>
                      <span className="ml-2 text-sm text-gray-500 line-through">${producto.precioOriginal.toLocaleString('es-CL')}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">${producto.precio.toLocaleString('es-CL')}</span>
                  )}
                </div>
                
                {producto.descuento && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1">
                    -{producto.descuento}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Ver más productos */}
      <div className="text-center mt-10">
        <button className="border-2 border-black text-black font-bold py-3 px-8 uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors duration-300">
          Ver Todos los Productos
        </button>
      </div>
    </div>
  );
};

export default CardVentas;