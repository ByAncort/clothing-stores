import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// Import RELATIVO desde __tests__ → component
import CartModal from '../component/CartModal';

// Mockeamos el hook para controlar items/total
jest.mock('../hooks/useCart', () => {
  const clearCart = jest.fn();
  const removeItem = jest.fn();
  const incrementQuantity = jest.fn();
  const decrementQuantity = jest.fn();

  return {
    useCart: () => ({
      items: [{ id: '1', name: 'Polera', price: 10000, quantity: 1, image: '/x.png' }],
      totalItems: 1,
      totalPrice: 10000,
      clearCart,
      removeItem,
      incrementQuantity,
      decrementQuantity,
    }),
  };
});

const renderCart = (props: Partial<React.ComponentProps<typeof CartModal>> = {}) => {
  const defaultProps = {
    isOpen: false,
    onClose: jest.fn(),
    onCheckout: jest.fn(),
  };
  return render(<CartModal {...defaultProps} {...props} />);
};

describe('CartModal', () => {
  it('no renderiza cuando isOpen=false', () => {
    renderCart({ isOpen: false });
    expect(screen.queryByText(/tu carrito/i)).toBeNull();
  });

  it('muestra contenido cuando isOpen=true y permite cerrar/checkout', () => {
    const onClose = jest.fn();
    const onCheckout = jest.fn();
    renderCart({ isOpen: true, onClose, onCheckout });

    // Título del modal
    expect(screen.getByRole('heading', { name: /tu carrito/i })).toBeInTheDocument();
    // Producto mockeado
    expect(screen.getByText(/polera/i)).toBeInTheDocument();

    // Cerrar
    const closeBtn = screen.getByRole('button', { name: /cerrar carrito/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();

    // Comprar (tu handleCheckout llama onClose y onCheckout)
    const buyBtn = screen.getByRole('button', { name: /comprar/i });
    fireEvent.click(buyBtn);
    expect(onCheckout).toHaveBeenCalled();
  });
});
