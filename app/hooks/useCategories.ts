// hooks/useCategories.ts
import { useState, useEffect } from 'react';
import type { CategoriaDto } from '~/types/categoria';
import { categoryService } from '../service/categoryService';

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoriaDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const createCategory = async (category: CategoriaDto) => {
    try {
      const newCategory = await categoryService.createCategory(category);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateCategory = async (id: number, category: CategoriaDto) => {
    try {
      const updatedCategory = await categoryService.updateCategory(id, category);
      setCategories(prev => 
        prev.map(c => c.id === id ? updatedCategory : c)
      );
      return updatedCategory;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await categoryService.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch: loadCategories
  };
};