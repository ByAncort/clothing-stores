import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartModal from '~/component/CartModal';


// Mock del hook useCart
jest.mock('../hooks/useCart', () => ({
  useCart: () => ({
    items: [{ id: '1', name: 'Polera', price: 10000, quantity: 1, image: '/x.png' }],
    totalItems: 1,
    totalPrice: 10000,
    clearCart: jest.fn(),
    removeItem: jest.fn(),
    incrementQuantity: jest.fn(),
    decrementQuantity: jest.fn(),
  }),
}));

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

    // título
    expect(screen.getByRole('heading', { name: /tu carrito/i })).toBeInTheDocument();
    // producto mockeado
    expect(screen.getByText(/polera/i)).toBeInTheDocument();

    // cerrar
    fireEvent.click(screen.getByRole('button', { name: /cerrar carrito/i }));
    expect(onClose).toHaveBeenCalled();

    // comprar
    fireEvent.click(screen.getByRole('button', { name: /comprar/i }));
    expect(onCheckout).toHaveBeenCalled();
  });
});
