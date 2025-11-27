import React, { useState } from "react";
import { useCart } from "~/hooks/useCart";

// Usa la misma interfaz Producto que tienes en ProductList
export interface Producto {
  // --- Campos Obligatorios (Vienen del Backend) ---
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagenUrl: string;
  sku: string;

  // --- Campos Opcionales / Visuales (Frontend) ---
  colores?: number;
  imagenSecundaria?: string;
  reseñas?: number;
  calificacion?: number;
  tipo?: string;

  // --- Propiedades Legacy (Compatibilidad con código viejo) ---
  imagen?: string; 
  price?: number;
  name?: string;
  especificaciones?: string[];
  esVideo?: boolean;
  videoUrl?: string;
}

interface ProductModalProps {
  product: Producto | null;
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
    
    // Usa el producto directamente sin 'as any'
    addItem(product, {
      size: selectedSize,
      color: selectedColor,
      category: product.categoria
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
              {/* Mostrar calificación si existe */}
              {product.calificacion && (
                <span className="ml-4 text-sm text-yellow-600">
                  ⭐ {product.calificacion}/5
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
               {product.descripcion || "Sin descripción disponible."}
            </p>

            {/* Mostrar stock si es bajo */}
            {product.stock < 10 && product.stock > 0 && (
              <div className="mb-4 text-sm text-orange-600">
                ⚠️ Quedan solo {product.stock} unidades
              </div>
            )}

            {product.stock === 0 && (
              <div className="mb-4 text-sm text-red-600">
                ❌ Producto agotado
              </div>
            )}

            {/* TALLAS */}
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

            {/* COLORES - Usa product.colores en lugar de product.colors */}
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

            <div className=" grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <button 
                onClick={handleAddToCart} 
                className={`py-3 rounded-lg font-bold uppercase text-sm tracking-wide ${
                  product.stock === 0 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {product.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
              </button>
              <button 
                onClick={() => product.stock > 0 ? alert("Funcionalidad en construcción") : null}
                className={`border-2 py-3 rounded-lg font-bold uppercase text-sm tracking-wide ${
                  product.stock === 0
                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'border-gray-200 text-gray-900 hover:border-gray-400'
                }`}
              >
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