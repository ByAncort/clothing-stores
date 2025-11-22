import React, { useState } from "react";
import { useCart } from "~/hooks/useCart";

interface Product {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagenUrl: string;
  sku: string;
  colores?: number;
  reseñas?: number;
  tipo?: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const IMAGENES_POR_DEFECTO: Record<string, string> = {
    'Poleras': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    'Hoodies': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    'Chaquetas': 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=800&q=80',
    'Accesorios': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    'Joyas': 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800&q=80',
    'Shorts': 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80'
};

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    
    addItem(product as any, {
      size: selectedSize,
      color: selectedColor,
      category: product.categoria // IMPORTANTE: Pasar categoría al carrito
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl z-10">
        <div className="grid md:grid-cols-2 h-full">
          
          {/* IMAGEN CON RESPALDO */}
          <div className="bg-gray-100 relative flex items-center justify-center h-64 md:h-auto overflow-hidden">
            <img
              src={product.imagenUrl}
              alt={product.nombre}
              className="h-full w-full object-cover object-center"
              onError={(e) => {
                const respaldo = IMAGENES_POR_DEFECTO[product.categoria] || IMAGENES_POR_DEFECTO['Accesorios'];
                if (e.currentTarget.src !== respaldo) {
                    e.currentTarget.src = respaldo;
                }
              }}
            />
          </div>

          {/* INFO */}
          <div className="p-6 md:p-8 flex flex-col overflow-y-auto max-h-[calc(90vh-16rem)] md:max-h-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 uppercase">{product.nombre}</h2>
                <p className="text-sm text-gray-500 mt-1">{product.marca}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none p-2">×</button>
            </div>

            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold text-gray-900">${product.precio}</span>
            </div>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
               {product.descripcion || "Sin descripción disponible."}
            </p>

            {/* TALLAS (Corregido color de texto) */}
            <div className="space-y-3 mb-6">
              <span className="text-sm font-bold text-gray-900 uppercase">Talla</span>
              <div className="flex flex-wrap gap-3">
                {["XS", "S", "M", "L", "XL"].map((talla) => (
                  <button
                    key={talla}
                    onClick={() => setSelectedSize(talla)}
                    className={`px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
                      selectedSize === talla
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-900 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {talla}
                  </button>
                ))}
              </div>
            </div>

            {/* COLORES (Corregido color de texto) */}
            {(product.colores && product.colores > 0) && (
              <div className="space-y-3 mb-8">
                <span className="text-sm font-bold text-gray-900 uppercase">Color</span>
                <div className="flex flex-wrap gap-3">
                  {["Negro", "Blanco", "Azul", "Rojo"].slice(0, product.colores).map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-gray-200 text-gray-900 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <button onClick={handleAddToCart} className="bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 uppercase text-sm tracking-wide">
                Añadir al Carrito
              </button>
              <button onClick={() => alert("Funcionalidad en construcción")} className="border-2 border-gray-200 text-gray-900 py-3 rounded-lg font-bold hover:border-gray-400 uppercase text-sm tracking-wide">
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;