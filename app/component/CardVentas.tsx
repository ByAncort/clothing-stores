import React, { useState } from 'react';
import type { Producto } from '~/types/product';
import ProductModal from './ProductModal';
import { Link } from 'react-router-dom';

interface CardVentasProps {
  productos: Producto[];
}

const CardVentas: React.FC<CardVentasProps> = ({ productos }) => {
  const [imagenActiva, setImagenActiva] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  const productosMostrados = productos.slice(0, 4);

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-2">
            Latest Drops
          </h2>
          <p className="text-gray-400 font-sans uppercase tracking-widest text-sm">
            Limited Edition Streetwear
          </p>
        </div>
        <Link
          to="/catalog"
          className="text-sm font-bold font-oswald uppercase tracking-wider text-white hover:text-gray-300 transition-colors flex items-center gap-2 group"
        >
          View All
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {productosMostrados.map((producto) => {
          const tieneImagenSecundaria = !!producto.imagenSecundaria;

          return (
            <div
              key={producto.id}
              className="group relative cursor-pointer"
              onMouseEnter={() => tieneImagenSecundaria && setImagenActiva(producto.id)}
              onMouseLeave={() => tieneImagenSecundaria && setImagenActiva(null)}
              onClick={() => setSelectedProduct(producto)}
            >
              {/* Image Container */}
              <div className="aspect-[3/4] w-full overflow-hidden bg-gray-900 relative mb-4">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${imagenActiva === producto.id && tieneImagenSecundaria ? "opacity-0" : "opacity-100"
                    }`}
                />
                {tieneImagenSecundaria && (
                  <img
                    src={producto.imagenSecundaria}
                    alt={producto.nombre}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${imagenActiva === producto.id ? "opacity-100" : "opacity-0"
                      }`}
                  />
                )}

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                  <button className="w-full bg-white text-black font-oswald font-bold uppercase py-3 text-sm tracking-wider hover:bg-gray-200 transition-colors">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1">
                <h3 className="font-oswald text-lg font-medium text-white uppercase tracking-wide line-clamp-1 group-hover:text-gray-300 transition-colors">
                  {producto.nombre}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-sm font-sans uppercase tracking-wider">
                    {producto.categoria}
                  </p>
                  <span className="font-oswald text-lg font-bold text-white">
                    ${producto.precio.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default CardVentas;