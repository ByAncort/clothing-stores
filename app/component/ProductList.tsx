import React, { useState } from 'react';
import type { Producto } from '~/types/product';

interface ProductListProps {
  productos: Producto[];
  titulo?: string;
  subtitulo?: string;
}

export default function ProductList({ productos, titulo = "Colección Destacada", subtitulo = "Descubre nuestros productos más vendidos mezclados con contenido exclusivo en video" }: ProductListProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null); // Estado añadido

  if (!productos || productos.length === 0) {
    return (
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-600">No hay productos disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-500 sm:text-5xl">
            {titulo}
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            {subtitulo}
          </p>
        </div>

        {/* Contenedor con grid más flexible */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 sm:grid-rows-[auto] auto-rows-[300px]">
          {productos.map((product, index) => {
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
                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>
            );
          })}
        </div>

        {/* Modal de selección de producto */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 p-6">
                {/* Columna de imagen */}
                <div className="space-y-4">
                  <img
                    src={selectedProduct.imagen}
                    alt={selectedProduct.nombre}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  {selectedProduct.imagenSecundaria && (
                    <img
                      src={selectedProduct.imagenSecundaria}
                      alt={`${selectedProduct.nombre} - vista secundaria`}
                      className="w-full h-32 object-cover rounded-xl"
                    />
                  )}
                </div>

                {/* Columna de información */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedProduct.nombre}
                    </h2>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <p className="text-gray-600">{selectedProduct.tipo}</p>

                  <div className="flex items-center space-x-2">
                    <StarRating rating={selectedProduct.calificacion} />
                    <span className="text-sm text-gray-500">
                      ({selectedProduct.reseñas} reseñas)
                    </span>
                  </div>

                  <p className="text-3xl font-bold text-gray-900">
                    ${selectedProduct.precio}
                  </p>

                  {/* Selector de colores */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-700">
                      Colores disponibles ({selectedProduct.colores})
                    </span>
                    <div className="flex space-x-2">
                      {[...Array(Math.min(selectedProduct.colores, 5))].map((_, i) => (
                        <button
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
                          style={{
                            backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'][i]
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Selector de tallas (si aplica) */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-700">Talla</span>
                    <div className="flex space-x-2">
                      {['XS', 'S', 'M', 'L', 'XL'].map((talla) => (
                        <button
                          key={talla}
                          className="px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-500 transition-colors"
                        >
                          {talla}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex space-x-4 pt-4">
                    <button className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                      Añadir al Carrito
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-900 py-3 rounded-lg font-medium hover:border-gray-500 transition-colors">
                      Comprar Ahora
                    </button>
                  </div>

                  {/* Información adicional */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Envío gratuito en pedidos superiores a $50</p>
                    <p>• Devolución gratuita en 30 días</p>
                    <p>• Garantía de 2 años</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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