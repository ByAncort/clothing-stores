import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import type { Producto } from '~/types/product';

export interface CartOptions {
  size?: string;
  color?: string;
  category?: string;
}

export interface CartItem extends Producto {
  quantity: number;
  size?: string;
  color?: string;
  category?: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Producto, options?: CartOptions) => void;
  removeItem: (itemId: number | string) => void;
  updateItemQuantity: (itemId: number | string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number, size?: string, color?: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar al inicio
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const parsedItems = JSON.parse(savedCart);
        // Aseguramos que todos los items tengan un ID válido
        const validItems = parsedItems.filter((i: any) => i.id !== undefined && i.id !== null);
        setItems(validItems);
      } catch (e) {
        console.error('Error parsing cart', e);
      }
    }
  }, []);

  // Guardar al cambiar
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(items));
  }, [items]);

  // --- FUNCIONES ---

  const addItem = (product: Producto, options?: CartOptions) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) => 
          String(item.id) === String(product.id) && 
          item.size === options?.size && 
          item.color === options?.color
      );

      if (existingItemIndex > -1) {
        const newItems = [...currentItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      }

      return [...currentItems, { 
          ...product, 
          quantity: 1, 
          size: options?.size, 
          color: options?.color,
          category: options?.category
      }];
    });
  };

  const removeItem = (itemId: number | string) => {
    setItems((currentItems) => currentItems.filter((item) => String(item.id) !== String(itemId)));
  };

  // --- AQUÍ ESTÁ LA MAGIA DE LA CORRECCIÓN ---
  const updateItemQuantity = (itemId: number | string, quantity: number) => {
    console.log(`Intentando actualizar ID: ${itemId} a cantidad: ${quantity}`);
    
    setItems((currentItems) => {
      return currentItems.map((item) => {
        // Comparamos convirtiendo ambos a String para evitar errores de tipo
        if (String(item.id) === String(itemId)) {
            console.log("¡Item encontrado! Actualizando...");
            return { ...item, quantity: Math.max(1, quantity) };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (productId: number, size?: string, color?: string) => {
    return items.some(
      (item) => 
        String(item.id) === String(productId) && 
        (!size || item.size === size) && 
        (!color || item.color === color)
    );
  };

  const totalItems = items.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
  
  const totalPrice = items.reduce((total, item) => {
      const precio = Number(item.precio) || Number((item as any).price) || 0;
      return total + (precio * (Number(item.quantity) || 1));
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}