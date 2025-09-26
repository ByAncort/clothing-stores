// hooks/useCart.ts
import { useState, useEffect } from 'react';
import type { Producto } from '../types/product';
import { cartService } from '~/service/CartService';

interface CartOptions {
  size?: string;
  color?: string;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState(cartService.getItems());
  const [totalItems, setTotalItems] = useState(cartService.getTotalItems());

  useEffect(() => {
    const unsubscribe = cartService.subscribe((items) => {
      setCartItems([...items]);
      setTotalItems(cartService.getTotalItems());
    });

    return unsubscribe;
  }, []);

  return {
    items: cartItems,
    totalItems,
    addItem: (product: Producto, options?: CartOptions) => cartService.addItem(product, options),
    removeItem: (itemId: string | number) => cartService.removeItem(itemId),
    updateQuantity: (itemId: string | number, quantity: number) => 
      cartService.updateQuantity(itemId, quantity),
    incrementQuantity: (itemId: string | number) => cartService.incrementQuantity(itemId),
    decrementQuantity: (itemId: string | number) => cartService.decrementQuantity(itemId),
    clearCart: () => cartService.clear(),
    getTotalPrice: () => cartService.getTotalPrice(),
    isInCart: (productId: number, size?: string, color?: string) => 
      cartService.isInCart(productId, size, color)
  };
};