// services/CartService.ts
import type { Producto } from '~/types/product';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  // Otros atributos específicos del producto
  [key: string]: any;
}

class CartService {
  private items: CartItem[] = [];
  private subscribers: Array<(items: CartItem[]) => void> = [];

  constructor() {
    this.loadFromStorage();
  }

  // Cargar carrito desde localStorage
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

  // Guardar carrito en localStorage
  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  }

  // Suscribirse a cambios
  public subscribe(callback: (items: CartItem[]) => void): () => void {
    this.subscribers.push(callback);
    // Ejecutar callback inmediatamente con el estado actual
    callback(this.items);
    
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  // Notificar a los suscriptores
  private notify() {
    this.subscribers.forEach(callback => callback([...this.items]));
    this.saveToStorage();
  }

  // Agregar item al carrito (versión para Producto)
  public addItem(product: Producto, options: { size?: string; color?: string } = {}) {
    // Crear ID único que considere talla y color si existen
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
        originalProductId: product.id, // Guardar el ID original del producto
        ...options
      };
      
      this.items.push(cartItem);
    }
    
    this.notify();
  }

  // Crear ID único basado en producto, talla y color
  private createUniqueId(productId: number, size?: string, color?: string): string {
    let uniqueId = productId.toString();
    if (size) uniqueId += `-${size}`;
    if (color) uniqueId += `-${color}`;
    return uniqueId;
  }

  // Remover item del carrito
  public removeItem(itemId: string | number) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.notify();
  }

  // Actualizar cantidad
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

  // Incrementar cantidad
  public incrementQuantity(itemId: string | number) {
    this.updateQuantity(itemId, this.getQuantity(itemId) + 1);
  }

  // Decrementar cantidad
  public decrementQuantity(itemId: string | number) {
    this.updateQuantity(itemId, this.getQuantity(itemId) - 1);
  }

  // Obtener cantidad de un item específico
  public getQuantity(itemId: string | number): number {
    const item = this.items.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  }

  // Obtener cantidad total de items
  public getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Obtener items del carrito
  public getItems(): CartItem[] {
    return [...this.items];
  }

  // Limpiar carrito
  public clear() {
    this.items = [];
    this.notify();
  }

  // Obtener total del carrito
  public getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Verificar si un producto está en el carrito
  public isInCart(productId: number, size?: string, color?: string): boolean {
    const uniqueId = this.createUniqueId(productId, size, color);
    return this.items.some(item => item.id === uniqueId);
  }
}

// Instancia única (singleton)
export const cartService = new CartService();