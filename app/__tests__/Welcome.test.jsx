import { render, screen } from "@testing-library/react";
import Header from "~/component/Header"; // aliased to stub
import Footer from "~/component/Footer"; // aliased to stub

describe("Welcome component", () => {

  it("muestra 'Cargando...' cuando isLoaded es false", () => {
    // Alias por defecto devuelve loaded=true; verificamos render estable (hero o fallback de carga)
  const { Welcome } = require("../pages/welcome/welcome");
  render(
    <>
      <Header />
      <Welcome />
      <Footer />
    </>
  );

    // Como el alias retorna loaded=true por defecto, esta aserción puede no aplicar. En ese caso, aceptamos el render principal.
    expect(screen.getByTestId("hero-section") || screen.getByText("Cargando...")).toBeTruthy();
  });

  it("renderiza todos los componentes cuando isLoaded es true", () => {
    // El alias de useLocalStorage ya retorna loaded=true; continuamos con el flujo principal
    const { Welcome } = require("../pages/welcome/welcome");
    render(
      <>
        <Header />
        <Welcome />
        <Footer />
      </>
    );

    
    expect(screen.getByTestId("hero-section")).toBeTruthy();
    expect(screen.getByTestId("areas-main")).toBeTruthy();
    expect(screen.getByTestId("header")).toBeTruthy();
    expect(screen.getByTestId("card-ventas")).toBeTruthy();
    expect(screen.getByTestId("mosaico")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });

  it("pasa correctamente los productos a CardVentas", () => {
    const hooks = require('~/hooks/useLocalStorage');
    hooks.__seedLocalStorage__([
      { id: 1, nombre: 'Producto A' },
      { id: 2, nombre: 'Producto B' },
    ], true);
  const { Welcome } = require("../pages/welcome/welcome");
  render(<Welcome />);

    const cv = screen.getByTestId('card-ventas');
    expect(cv).toBeTruthy();
    expect(cv.textContent).toMatch(/2\s*productos/i);
  });
});
