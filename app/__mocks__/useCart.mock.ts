import type { Producto } from '~/types/product';

// Shared mock cart instance so tests can assert spy calls
const __state = {
    items: [
      {
        id: '1',
        name: 'Polera',
        price: 10000,
        quantity: 1,
        image: '/x.png',
      },
    ],
    totalItems: 1,
    totalPrice: 10000,
} as {
    items: Array<{ id: string | number; name: string; price: number; quantity: number; image: string; size?: string; color?: string }>;
    totalItems: number;
    totalPrice: number;
  };

export const __mockCart__ = (() => {
  return {
    get items() { return __state.items; },
    get totalItems() { return __state.totalItems; },
    get totalPrice() { return __state.totalPrice; },

    // Action spies
    addItem: jasmine.createSpy('addItem') as unknown as (p: Producto, o?: { size?: string; color?: string }) => void,
    removeItem: jasmine.createSpy('removeItem') as unknown as (id: string | number) => void,
    updateQuantity: jasmine.createSpy('updateQuantity') as unknown as (id: string | number, q: number) => void,
    incrementQuantity: jasmine.createSpy('incrementQuantity') as unknown as (id: string | number) => void,
    decrementQuantity: jasmine.createSpy('decrementQuantity') as unknown as (id: string | number) => void,
    clearCart: jasmine.createSpy('clearCart') as unknown as () => void,
    isInCart: jasmine.createSpy('isInCart') as unknown as (productId: number, size?: string, color?: string) => boolean,
  };
})();

export function useCart() {
  return __mockCart__ as any;
}

// Helper para preparar el estado del carrito en pruebas
export function __seedCart__(
  items: Array<{ id: string | number; name: string; price: number; quantity: number; image: string; size?: string; color?: string }>
) {
  __state.items = items;
  __state.totalItems = items.reduce((sum, it) => sum + (it.quantity ?? 0), 0);
  __state.totalPrice = items.reduce((sum, it) => sum + (it.price ?? 0) * (it.quantity ?? 0), 0);
}