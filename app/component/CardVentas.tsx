import React, { useState } from 'react';

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
  imagenSecundaria?: string;
  esNuevo?: boolean;
  esTrending?: boolean;
}

interface CardVentasProps {
  productos: Producto[];
}

const CardVentas: React.FC<CardVentasProps> = ({ productos }) => {
  const [imagenActiva, setImagenActiva] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
          The Shit Right Now
        </h2>
        <a
          href="#"
          className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors bg-gray-100 px-3 py-1.5 rounded-full"
        >
          STREET COLLECTION
        </a>
      </div>

      {/* Grid productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productos.map((producto) => {
          const tieneImagenSecundaria = !!producto.imagenSecundaria;

          return (
            <a
              key={producto.id}
              href={`/producto/${producto.id}`} // <-- aquí puedes poner tu ruta dinámica
              className="group relative bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden block"
              onMouseEnter={() => tieneImagenSecundaria && setImagenActiva(producto.id)}
              onMouseLeave={() => tieneImagenSecundaria && setImagenActiva(null)}
            >
              {/* Imagen */}
              <div className="h-80 relative">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                    imagenActiva === producto.id && tieneImagenSecundaria ? "opacity-0" : "opacity-100"
                  }`}
                />
                {tieneImagenSecundaria && (
                  <img
                    src={producto.imagenSecundaria}
                    alt={producto.nombre}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                      imagenActiva === producto.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}
              </div>

              {/* Contenido */}
              <div className="p-5">
                {/* Nombre */}
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-black transition-colors">
                  {producto.nombre}
                </h3>

                {/* Precio */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    {producto.precioOriginal && producto.precioOriginal > producto.precio ? (
                      <>
                        <span className="text-lg font-semibold text-gray-900">
                          ${producto.precio.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ${producto.precioOriginal.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-semibold text-gray-900">
                        ${producto.precio.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {producto.descuento && (
                    <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      -{producto.descuento}%
                    </span>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default CardVentas;
