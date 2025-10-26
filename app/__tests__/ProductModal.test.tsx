import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductModal from '../component/ProductModal';

// ✅ Mock del hook con el nombre correcto: addItem
const mockAddItem = jest.fn();

jest.mock('../hooks/useCart', () => ({
  useCart: () => ({
    addItem: mockAddItem,
  }),
}));

const product = {
  id: 'P01',
  name: 'Polera Street',
  price: 19990,
  image: '/img/x.png',
  quantity: 1,
};

const renderModal = (props: Partial<React.ComponentProps<typeof ProductModal>> = {}) => {
  const defaultProps: any = {
    isOpen: true,
    onClose: jest.fn(),
    product,
  };
  return render(<ProductModal {...defaultProps} {...(props as any)} />);
};

// app/setupTests.js

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation((...args) => {
    const msg = String(args[0] ?? '');
    // Silencia SOLO este mensaje
    if (msg.includes('Producto agregado al carrito')) return;
  });

});

afterAll(() => {
  // Restaura todos los mocks/espías creados con jest.spyOn en este archivo
  jest.restoreAllMocks();
});


describe('ProductModal', () => {
  beforeEach(() => mockAddItem.mockClear());

  it('renderiza abierto (botones principales visibles)', () => {
    renderModal();
    // No afirmamos nombre/precio porque tu DOM actual no los muestra como texto
    expect(screen.getByRole('button', { name: /añadir al carrito/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /comprar ahora/i })).toBeInTheDocument();
  });

  it('agrega al carrito usando useCart.addItem', () => {
    renderModal();
    const addBtn = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(addBtn);
    expect(mockAddItem).toHaveBeenCalledTimes(1);
    // si quieres, validamos que el primer argumento tenga id
    expect(mockAddItem.mock.calls[0][0]).toEqual(expect.objectContaining({ id: 'P01' }));
  });

  it('cierra el modal al presionar el botón ×', () => {
    const onClose = jest.fn();
    renderModal({ onClose });

    // Busca específicamente el botón "×" (no "XS" / "XL")
    const closeBtn =
      screen.queryByText(/^×$/) ??
      screen.queryByRole('button', { name: /^×$/ });
    expect(closeBtn).toBeTruthy();

    fireEvent.click(closeBtn as Element);
    expect(onClose).toHaveBeenCalled();
  });


  
});
