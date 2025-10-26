import React, { useState } from "react";
import { useCart } from "~/hooks/useCart";
import type { Producto } from "~/types/product";

interface ProductModalProps {
  product: Producto | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem(product, {
      size: selectedSize,
      color: selectedColor
    });
    
    console.log('Producto agregado al carrito');
    onClose();
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Columna de imagen */}
          <div className="space-y-4">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="w-full h-64 object-cover rounded-xl"
            />
            {product.imagenSecundaria && (
              <img
                src={product.imagenSecundaria}
                alt={`${product.nombre} - vista secundaria`}
                className="w-full h-32 object-cover rounded-xl"
              />
            )}
          </div>

          {/* Columna de información */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-900">{product.nombre}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-600">{product.tipo}</p>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">({product.reseñas} reseñas)</span>
            </div>

            <p className="text-3xl font-bold text-gray-900">${product.precio}</p>

            {/* Selector de tallas */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Talla</span>
              <div className="flex space-x-2">
                {["XS", "S", "M", "L", "XL"].map((talla) => (
                  <button
                    key={talla}
                    onClick={() => setSelectedSize(talla)}
                    className={`px-3 py-2 border rounded-lg transition-colors ${
                      selectedSize === talla
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {talla}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de colores (si aplica) */}
            {product.colores > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">Color</span>
                <div className="flex space-x-2">
                  {["Negro", "Blanco", "Azul", "Rojo"].slice(0, product.colores).map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-2 border rounded-lg transition-colors ${
                        selectedColor === color
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex space-x-4 pt-4">
              <button 
                onClick={handleAddToCart} 
                className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Añadir al Carrito
              </button>
              <button className="flex-1 border border-gray-300 text-gray-900 py-3 rounded-lg font-medium hover:border-gray-500 transition-colors"
              onClick={handleAddToCart} 
              >
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
  );
};

export default ProductModal;