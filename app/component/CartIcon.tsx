import React, { useState } from "react";
import { useCart } from "~/hooks/useCart";
import CartModal from "./CartModal";
import CheckoutModal from "./CheckoutModal";

type CartIconProps = {
  onClick?: () => void;
  className?: string;
};

const CartIcon: React.FC<CartIconProps> = ({ onClick, className = "" }) => {
  const { totalItems } = useCart();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick?.();
    setIsCartModalOpen(true);
  };

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
    setIsCartModalOpen(false);
  };

  const handleBackToCart = () => {
    setIsCheckoutModalOpen(false);
    setIsCartModalOpen(true);
  };

  // Texto accesible (CAMBIO AQUÍ: usamos "producto" para evitar tildes conflictivas)
  const countLabel = totalItems > 99 ? "99+" : String(totalItems);
  const ariaLabel = `Ver carrito, ${totalItems} producto${totalItems === 1 ? "" : "s"}`;

  return (
    <>
      <button
        type="button"
        onClick={handleCartClick}
        aria-label={ariaLabel}
        className={
          "relative inline-flex items-center justify-center w-10 h-10 rounded-full " +
          "hover:bg-black/5 dark:hover:bg-white/10 transition-colors " +
          className
        }
      >
        <svg
          className="w-6 h-6 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" fill="none" viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
          />
        </svg>

        {totalItems > 0 && (
          <span
            className="
              absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-5 px-1
              rounded-full bg-rose-600 text-white text-[10px] leading-5
              text-center font-semibold ring-2 ring-white dark:ring-gray-900
            "
            aria-hidden="true"
          >
            {countLabel}
          </span>
        )}
      </button>

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onBackToCart={handleBackToCart}
      />
    </>
  );
};

export default CartIcon;