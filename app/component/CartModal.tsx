
import { useEffect } from 'react';
import { useCart } from '~/hooks/useCart';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void; 
}

export default function CartModal({ isOpen, onClose, onCheckout }: CartModalProps) {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    removeItem, 
    incrementQuantity, 
    decrementQuantity, 
    clearCart 
  } = useCart();

  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCheckout = () => {
    onClose(); 
    onCheckout(); 
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-20"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Tu Carrito ({totalItems})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Cerrar carrito"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Lista de productos */}
        <div className="overflow-y-auto max-h-96">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-gray-500">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
              </svg>
              <p className="text-lg font-medium mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-center">Agrega algunos productos para comenzar</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onRemove={removeItem}
                  onIncrement={incrementQuantity}
                  onDecrement={decrementQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer con total y botones */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  clearCart();
                  onClose();
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Limpiar
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Comprar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


interface CartItemProps {
  item: any;
  onRemove: (id: string | number) => void;
  onIncrement: (id: string | number) => void;
  onDecrement: (id: string | number) => void;
}

function CartItem({ item, onRemove, onIncrement, onDecrement }: CartItemProps) {
  return (
    <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
      {/* Imagen */}
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
      />
      
      {/* Información del producto */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
        
        {/* Variantes (talla, color) */}
        {(item.size || item.color) && (
          <div className="flex gap-2 mt-1 text-sm text-gray-600">
            {item.size && <span>Talla: {item.size}</span>}
            {item.color && <span>Color: {item.color}</span>}
          </div>
        )}
        
        {/* Precio */}
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          
          {/* Contador de cantidad */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDecrement(item.id)}
              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              aria-label="Disminuir cantidad"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            
            <button
              onClick={() => onIncrement(item.id)}
              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              aria-label="Aumentar cantidad"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Botón eliminar */}
      <button
        onClick={() => onRemove(item.id)}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Eliminar producto"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}