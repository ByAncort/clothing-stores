import React, { useState } from 'react';
import type { Producto } from '~/types/product';
import ProductModal from './ProductModal'; // Asegúrate de importar el modal

interface CardVentasProps {
  productos: Producto[];
}

const CardVentas: React.FC<CardVentasProps> = ({ productos }) => {
  const [imagenActiva, setImagenActiva] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null); // Estado para el modal

  const productosMostrados = productos.slice(0, 4);

  return (
    <section className="mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-100">
          The Shit Right Now
        </h2>
        <a
          href="/catalog"
          className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors bg-gray-100 px-3 py-1.5 rounded-full border border-2"
        >
          STREET COLLECTION
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {productosMostrados.map((producto) => {
          const tieneImagenSecundaria = !!producto.imagenSecundaria;

          return (
            <div
              key={producto.id}
              className="group relative bg-black/50 backdrop-blur-md rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
              onMouseEnter={() => tieneImagenSecundaria && setImagenActiva(producto.id)}
              onMouseLeave={() => tieneImagenSecundaria && setImagenActiva(null)}
              onClick={() => setSelectedProduct(producto)} // Abrir modal al hacer click
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
                <h3 className="text-sm font-medium text-gray-500 text-shadow line-clamp-2 group-hover:text-white transition-colors">
                  {producto.nombre}
                </h3>

                {/* Precio */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-500 group-hover:text-white transition-colors">
                      ${producto.precio.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de producto */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
};

export default CardVentas;