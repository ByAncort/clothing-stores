// hooks/useProducts.ts
import { useState, useEffect } from 'react';
import type { ProductoDto } from '~/types/producto';
import { productService } from '../service/productService';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductoDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const createProduct = async (product: Omit<ProductoDto, 'id'>) => {
    try {
      const newProduct = await productService.createProduct(product);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateProduct = async (id: number, product: Partial<ProductoDto>) => {
    try {
      const updatedProduct = await productService.updateProduct(id, product);
      setProducts(prev => 
        prev.map(p => p.id === id ? updatedProduct : p)
      );
      return updatedProduct;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: loadProducts
  };
};