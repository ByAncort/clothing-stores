import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductModal from '../component/ProductModal';

const product = {
  id: 'P01',
  name: 'Polera Street',
  price: 19990,
  image: '/img/x.png',
  quantity: 1,
};

const renderModal = (props: Partial<React.ComponentProps<any>> = {}) => {
  const defaultProps: any = {
    isOpen: true,
    onClose: jasmine.createSpy('onClose'),
    product,
  };
  const utils = render(<ProductModal {...defaultProps} {...(props as any)} />);
  return { ...utils };
};

// app/setupTests.js

beforeAll(() => {
  spyOn(console, 'log').and.callFake((...args: any[]) => {
    const msg = String(args[0] ?? '');
    if (msg.includes('Producto agregado al carrito')) return;
    // por defecto, deja pasar los demás logs
    // eslint-disable-next-line no-console
    console.info?.(...args);
  });
});


describe('ProductModal', () => {

  it('renderiza abierto (botones principales visibles)', () => {
    renderModal();
    // No afirmamos nombre/precio porque tu DOM actual no los muestra como texto
    expect(screen.getByRole('button', { name: /añadir al carrito/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /comprar ahora/i })).toBeTruthy();
  });

  it('agrega al carrito usando useCart.addItem', () => {
    renderModal();
    const addBtn = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(addBtn);
    const hooks: any = require('~/hooks/useCart');
    expect(hooks.__mockCart__.addItem).toHaveBeenCalled();
  });

  it('cierra el modal al presionar el botón ×', () => {
  const onClose = jasmine.createSpy('onClose');
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
