// ...existing code...
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartModal from "../component/CartModal";

const renderCart = (props = {}) => {
  const defaultProps = {
    isOpen: false,
    onClose: jasmine.createSpy("onClose"),
    onCheckout: jasmine.createSpy("onCheckout"),
  };
  return render(<CartModal {...defaultProps} {...props} />);
};

describe("CartModal", () => {

  it("no renderiza cuando isOpen=false", () => {
    renderCart({ isOpen: false });
    expect(screen.queryByText(/tu carrito/i)).toBeNull();
  });

  it("muestra contenido cuando isOpen=true y permite cerrar/checkout", () => {
    const onClose = jasmine.createSpy("onClose");
    const onCheckout = jasmine.createSpy("onCheckout");

    // Asegura que el carrito no esté vacío
    const hooks: any = require('~/hooks/useCart');
    hooks.__seedCart__([
      { id: '1', name: 'Polera', price: 9990, quantity: 2, image: '/x.png', size: 'M' },
    ]);

    renderCart({ isOpen: true, onClose, onCheckout });

    // título (heading h2 exacto)
    const heading = screen.getByRole("heading", { level: 2, name: /tu carrito/i });
    expect(heading).toBeTruthy();

  // Debe renderizar controles de ítem (usa role button + aria-label)
  const decBtn = screen.getByRole('button', { name: /disminuir cantidad/i });
  const incBtn = screen.getByRole('button', { name: /aumentar cantidad/i });
  expect(decBtn).toBeTruthy();
  expect(incBtn).toBeTruthy();

    // cerrar
    const closeBtn = screen.queryByRole("button", { name: /cerrar carrito/i }) || screen.queryByText(/cerrar carrito/i);
    expect(closeBtn).toBeTruthy();
    if (closeBtn) {
      fireEvent.click(closeBtn);
      expect(onClose).toHaveBeenCalled();
    }

    // comprar
    const buyBtn = screen.queryByRole("button", { name: /^comprar$/i }) || screen.queryByText(/^comprar$/i);
    expect(buyBtn).toBeTruthy();
    if (buyBtn) {
      fireEvent.click(buyBtn);
      expect(onCheckout).toHaveBeenCalled();
    }
  });
});
// ...existing code...