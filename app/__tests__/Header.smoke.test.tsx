import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../component/Header';

// Mocks livianos para aislar el Header
jest.mock('../component/CartModal', () => () => <div data-testid="cart-modal-stub" />);
jest.mock('../component/CartIcon',  () => () => <div data-testid="cart-icon-stub" />);

// Si Header (o CartIcon) usa el hook useCart, mock mínimo:
jest.mock('../hooks/useCart', () => ({
  useCart: () => ({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    openCart: jest.fn(),
    closeCart: jest.fn(),
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    incrementQuantity: jest.fn(),
    decrementQuantity: jest.fn(),
    clearCart: jest.fn(),
  }),
}));

test('Header renderiza sin explotar', () => {
  const { container } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(container.firstChild).toBeTruthy();
});
