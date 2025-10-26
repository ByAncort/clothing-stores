
import type { Producto } from '~/types/product';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  
  [key: string]: any;
}

class CartService {
  private items: CartItem[] = [];
  private subscribers: Array<(items: CartItem[]) => void> = [];

  constructor() {
    this.loadFromStorage();
  }

  
  public loadFromStorage() {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          this.items = JSON.parse(savedCart);
        } catch (error) {
          console.error('Error loading cart from storage:', error);
          this.items = [];
        }
      }
    }
  }

  
  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  }

  
  public subscribe(callback: (items: CartItem[]) => void): () => void {
    this.subscribers.push(callback);
    
    callback(this.items);
    
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  
  private notify() {
    this.subscribers.forEach(callback => callback([...this.items]));
    this.saveToStorage();
  }

  
  public addItem(product: Producto, options: { size?: string; color?: string } = {}) {
    
    const uniqueId = this.createUniqueId(product.id, options.size, options.color);
    
    const existingItem = this.items.find(item => item.id === uniqueId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const cartItem: CartItem = {
        id: uniqueId,
        name: product.nombre,
        price: product.precio,
        image: product.imagen,
        quantity: 1,
        originalProductId: product.id, 
        ...options
      };
      
      this.items.push(cartItem);
    }
    
    this.notify();
  }

  
  private createUniqueId(productId: number, size?: string, color?: string): string {
    let uniqueId = productId.toString();
    if (size) uniqueId += `-${size}`;
    if (color) uniqueId += `-${color}`;
    return uniqueId;
  }

  
  public removeItem(itemId: string | number) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.notify();
  }

  
  public updateQuantity(itemId: string | number, quantity: number) {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(itemId);
      } else {
        item.quantity = quantity;
        this.notify();
      }
    }
  }

  
  public incrementQuantity(itemId: string | number) {
    this.updateQuantity(itemId, this.getQuantity(itemId) + 1);
  }

  
  public decrementQuantity(itemId: string | number) {
    this.updateQuantity(itemId, this.getQuantity(itemId) - 1);
  }

  
  public getQuantity(itemId: string | number): number {
    const item = this.items.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  }

  
  public getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  
  public getItems(): CartItem[] {
    return [...this.items];
  }

  
  public clear() {
    this.items = [];
    this.notify();
  }

  
  public getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  
  public isInCart(productId: number, size?: string, color?: string): boolean {
    const uniqueId = this.createUniqueId(productId, size, color);
    return this.items.some(item => item.id === uniqueId);
  }
}


export const cartService = new CartService();