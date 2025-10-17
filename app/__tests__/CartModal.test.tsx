import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartModal from '~/component/CartModal';

describe('CartModal', () => {
  it('no renderiza cuando está cerrado', () => {
    render(
      <CartModal {...({ open: false, onClose: () => {} } as any)} />
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('muestra el modal y permite cerrar', () => {
    const onClose = jest.fn();

    render(
      <CartModal {...({ open: true, onClose } as any)} />
    );

    const dialog = screen.queryByRole('dialog') ?? screen.queryByTestId('cart-modal');
    expect(dialog).not.toBeNull();

    const closeBtn =
      screen.queryByRole('button', { name: /cerrar|close|×|x/i }) ??
      screen.getAllByRole('button')[0];

    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
