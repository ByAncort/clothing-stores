// components/CartIcon.tsx
import { useState } from "react";
import { useCart } from "~/hooks/useCart";
import CartModal from "./CartModal";
import CheckoutModal from "./CheckoutModal";

const CartIcon = () => {
  const { totalItems } = useCart();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  console.log('CartIcon render - isCheckoutModalOpen:', isCheckoutModalOpen); // Debug

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Cart icon clicked'); // Debug
    setIsCartModalOpen(true);
  };

  const handleCheckout = () => {
    console.log('Checkout button clicked'); // Debug
    setIsCheckoutModalOpen(true);
    setIsCartModalOpen(false);
  };

  const handleBackToCart = () => {
    console.log('Back to cart clicked'); // Debug
    setIsCheckoutModalOpen(false);
    setIsCartModalOpen(true);
  };

  return (
    <>
      <li className="hidden xl:block sm:hidden relative">
        <a 
          href="#" 
          className="relative"
          onClick={handleCartClick}
        >
          <svg 
            className="w-6 h-6 text-white dark:text-white" 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
            />
          </svg>
          
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </a>
      </li>

      {/* Modal del carrito */}
      <CartModal 
        isOpen={isCartModalOpen} 
        onClose={() => setIsCartModalOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Modal de checkout */}
      <CheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onBackToCart={handleBackToCart}
      />
    </>
  );
};

export default CartIcon;