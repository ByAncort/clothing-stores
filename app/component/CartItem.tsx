// app/component/CartItem.tsx
import React from 'react';

export interface CartItemProps {
  item: {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size?: string;
    color?: string;
    // Opcional: Si tu carrito guarda la categoría, úsala aquí. Si no, usaremos 'Default'.
    category?: string; 
  };
  onRemove: (id: string | number) => void;
  onIncrement: (id: string | number) => void;
  onDecrement: (id: string | number) => void;
}

// Diccionario de respaldo (Igual que en los otros componentes)
const IMAGENES_POR_DEFECTO: Record<string, string> = {
    'Poleras': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    'Hoodies': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    'Chaquetas': 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=800&q=80',
    'Accesorios': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    'Joyas': 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800&q=80',
    'Shorts': 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
    'Default': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' // Mochila por defecto
};

export default function CartItem({
  item,
  onRemove,
  onIncrement,
  onDecrement,
}: CartItemProps) {
  
  // Función auxiliar para obtener imagen de respaldo
  const getBackupImage = () => {
      if (item.category && IMAGENES_POR_DEFECTO[item.category]) {
          return IMAGENES_POR_DEFECTO[item.category];
      }
      return IMAGENES_POR_DEFECTO['Default'];
  };

  return (
    <div className="flex gap-3 p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-100 mb-2">
      {/* Imagen Mejorada */}
      <div className="w-16 h-16 flex-shrink-0 bg-white rounded-md overflow-hidden border border-gray-200">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center"
          // AQUÍ ESTÁ LA SOLUCIÓN:
          onError={(e) => {
            const backup = getBackupImage();
            if (e.currentTarget.src !== backup) {
                e.currentTarget.src = backup;
            }
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate text-sm sm:text-base uppercase">{item.name}</h3>

        {(item.size || item.color) && (
          <div className="flex gap-2 mt-1 text-xs text-gray-500">
            {item.size && <span className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-700 font-medium">{item.size}</span>}
            {item.color && <span>{item.color}</span>}
          </div>
        )}

        {/* Precio + Controles */}
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-gray-900 text-sm">
            ${(item.price * item.quantity).toFixed(2)}
          </span>

          <div className="flex items-center gap-1">
            {/* - */}
            <button
              onClick={() => onDecrement(item.id)}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              aria-label="Disminuir cantidad"
              disabled={item.quantity <= 1}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>

            <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>

            {/* + */}
            <button
              onClick={() => onIncrement(item.id)}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
              aria-label="Aumentar cantidad"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            {/* Eliminar */}
            <button
              onClick={() => onRemove(item.id)}
              className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Eliminar producto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}