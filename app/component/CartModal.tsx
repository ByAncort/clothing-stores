import React from 'react';
import { useCart } from '~/hooks/useCart';
import CartItem from './CartItem';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop oscuro */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Panel lateral del carrito */}
      <div className="relative w-full max-w-md bg-white shadow-xl h-full flex flex-col transform transition-transform">
        
        {/* Header del Carrito */}
        <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 uppercase tracking-wider">
            Tu Carrito ({items.length})
          </h2>
          <button type="button" className="text-gray-400 hover:text-gray-500" onClick={onClose}>
            <span className="sr-only">Cerrar panel</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Tu carrito está vacío.</p>
              <button onClick={onClose} className="mt-4 text-indigo-600 font-medium hover:text-indigo-500">
                Continúa comprando &rarr;
              </button>
            </div>
          ) : (
            <ul className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                // AQUÍ ESTÁ EL CAMBIO: Solo pasamos "item". Nada más.
                <CartItem key={`${item.id}-${item.size}-${item.color}`} item={item} />
              ))}
            </ul>
          )}
        </div>

        {/* Footer del Carrito (Total y Botones) */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-50">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 mb-6">
              El envío y los impuestos se calculan en el pago.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={clearCart}
                  className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Limpiar
                </button>
                <button
                  onClick={onCheckout}
                  className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                >
                  Comprar
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;