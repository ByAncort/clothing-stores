import React, { useState, useEffect } from 'react';
import { useCart } from '~/hooks/useCart';

const IMAGENES_POR_DEFECTO: Record<string, string> = {
    'Default': 'https://placehold.co/200x200/png?text=Sin+Foto'
};

export interface CartItemProps {
  item: any; // Usamos any para máxima compatibilidad con datos viejos/nuevos
}

export default function CartItem({ item }: CartItemProps) {
  // AQUÍ ESTÁ LA CLAVE: Usamos el hook directamente, no pedimos props al padre
  const { removeItem, updateItemQuantity } = useCart();

  // Normalización de datos (Tu lógica segura)
  const itemSeguro = {
      id: item.id || item._id,
      nombre: item.nombre || item.name || "Producto",
      precio: Number(item.precio || item.price || 0),
      imagen: item.imagenUrl || item.image || IMAGENES_POR_DEFECTO['Default'],
      cantidad: Number(item.quantity || item.cantidad || 1),
      categoria: item.categoria || item.category || 'Default',
      size: item.size,
      color: item.color
  };

  const [currentImage, setCurrentImage] = useState(itemSeguro.imagen);

  useEffect(() => {
    setCurrentImage(itemSeguro.imagen);
  }, [itemSeguro.imagen]);

  const handleImageError = () => {
      if (currentImage !== IMAGENES_POR_DEFECTO['Default']) {
          setCurrentImage(IMAGENES_POR_DEFECTO['Default']);
      }
  };

  return (
    <li className="flex py-6 border-b border-gray-100 last:border-0">
      {/* IMAGEN */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
        <img
          src={currentImage}
          alt={itemSeguro.nombre}
          className="h-full w-full object-cover object-center"
          onError={handleImageError}
        />
      </div>

      {/* DETALLES */}
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="uppercase line-clamp-1 pr-4">
              {itemSeguro.nombre}
            </h3>
            <p className="whitespace-nowrap">
              ${(itemSeguro.precio * itemSeguro.cantidad).toFixed(2)}
            </p>
          </div>
          
          <div className="mt-1 text-sm text-gray-500 space-y-1">
             {itemSeguro.size && <p>Talla: <span className="font-medium text-gray-700">{itemSeguro.size}</span></p>}
             {itemSeguro.color && <p>Color: <span className="font-medium text-gray-700">{itemSeguro.color}</span></p>}
          </div>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm mt-2">
          {/* Controles */}
          <div className="flex items-center border border-gray-300 rounded-md bg-white">
            <button
              type="button"
              className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition-colors"
              // USAMOS EL HOOK DIRECTO
              onClick={() => updateItemQuantity(itemSeguro.id, Math.max(1, itemSeguro.cantidad - 1))}
            >
              -
            </button>
            <span className="px-2 text-gray-900 font-medium w-8 text-center">{itemSeguro.cantidad}</span>
            <button
              type="button"
              className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition-colors"
              // USAMOS EL HOOK DIRECTO
              onClick={() => updateItemQuantity(itemSeguro.id, itemSeguro.cantidad + 1)}
            >
              +
            </button>
          </div>

          {/* Eliminar */}
          <button
            type="button"
            // USAMOS EL HOOK DIRECTO
            onClick={() => removeItem(itemSeguro.id)}
            className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}