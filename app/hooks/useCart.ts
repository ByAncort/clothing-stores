// app/hooks/useCart.ts
import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateItemQuantity: (id: string, quantity: number) => void;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  
  addItem: (item) => {
    const { items } = get();
    const existingItem = items.find(i => i.id === item.id);
    
    if (existingItem) {
      const updatedItems = items.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
      );
      set({
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: updatedItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
      });
    } else {
      const newItems = [...items, { ...item, quantity: item.quantity || 1 }];
      set({
        items: newItems,
        totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
      });
    }
  },
  
  removeItem: (id) => {
    const { items } = get();
    const updatedItems = items.filter(i => i.id !== id);
    set({
      items: updatedItems,
      totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: updatedItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
    });
  },
  
  clearCart: () => {
    set({
      items: [],
      totalItems: 0,
      totalPrice: 0
    });
  },

  updateItemQuantity: (id: string, quantity: number) => {
    const { items } = get();
    if (quantity <= 0) {
      const updatedItems = items.filter(i => i.id !== id);
      set({
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: updatedItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
      });
    } else {
      const updatedItems = items.map(i =>
        i.id === id ? { ...i, quantity } : i
      );
      set({
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: updatedItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
      });
    }
  }
}));