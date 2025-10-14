import type { FC } from 'react';
import ProductListDefault from './ProductList';

// app/component/ProductList.spec.ts
import { render, screen, cleanup } from '@testing-library/react';


// 🔹 Decimos a TS que es un componente React genérico (sin validar props)
const ProductList = ProductListDefault as FC<any>;

// 🔹 Tipo local de datos
type Producto = {
  id: number;
  name: string;
  price: number;
};

afterEach(() => cleanup());

describe('Componente ProductList', () => {
  it('renderiza sin errores', () => {
    const productos: Producto[] = [
      { id: 1, name: 'Test 1', price: 1000 },
      { id: 2, name: 'Test 2', price: 2000 },
    ];

    render(<ProductList productos={productos} />);
    expect(screen.getByText('Test 1')).toBeTruthy();
  });
});

