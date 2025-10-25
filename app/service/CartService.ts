// app/service/CartService.ts - VERSIÓN CORREGIDA (MISMA LÓGICA)
import type { Producto } from '~/types/product';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface CartOptions {
  size?: string;
  color?: string;
}

class CartService {
  private items: CartItem[] = [];
  private subscribers: ((items: CartItem[]) => void)[] = [];

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback([...this.items]));
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  subscribe(callback: (items: CartItem[]) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  addItem(product: Producto, options?: CartOptions): void {
    const existingItem = this.items.find(item => 
      item.id === product.id && 
      item.size === options?.size && 
      item.color === options?.color
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.nombre,    // ✅ CORRECCIÓN: product.nombre en lugar de product.name
        price: product.precio,   // ✅ CORRECCIÓN: product.precio en lugar de product.price
        quantity: 1,
        image: product.imagen,   // ✅ CORRECCIÓN: product.imagen en lugar de product.image
        size: options?.size,
        color: options?.color
      });
    }
    this.notifySubscribers();
  }

  removeItem(itemId: string | number): void {
    this.items = this.items.filter(item => item.id !== itemId);
    this.notifySubscribers();
  }

  updateQuantity(itemId: string | number, quantity: number): void {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(itemId);
      } else {
        this.notifySubscribers();
      }
    }
  }

  incrementQuantity(itemId: string | number): void {
    this.updateQuantity(itemId, 
      (this.items.find(item => item.id === itemId)?.quantity || 0) + 1
    );
  }

  decrementQuantity(itemId: string | number): void {
    this.updateQuantity(itemId, 
      (this.items.find(item => item.id === itemId)?.quantity || 0) - 1
    );
  }

  clear(): void {
    this.items = [];
    this.notifySubscribers();
  }

  isInCart(productId: number, size?: string, color?: string): boolean {
    return this.items.some(item => 
      item.id === productId && 
      item.size === size && 
      item.color === color
    );
  }
}

export const cartService = new CartService();