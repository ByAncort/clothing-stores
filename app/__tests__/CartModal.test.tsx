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

  // 👇 Solo tipé el target del div para evitar warnings/errores de TS
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
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
      {/* ...tu contenido del modal (header, lista, footer) tal cual... */}
    </div>
  );
}

/* === CartItem (reemplaza este bloque por el que te pasé) === */
