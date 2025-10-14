import { render, screen } from "@testing-library/react";
import { Welcome } from "../pages/welcome/welcome";


jest.mock("~/component/HeroSelection", () => ({
  __esModule: true,
  default: () => <div data-testid="hero-section">Hero Section</div>,
}));

jest.mock("~/component/AreasMain", () => ({
  __esModule: true,
  default: () => <div data-testid="areas-main">Areas Main</div>,
}));

jest.mock("~/component/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="header">Header</div>,
}));

jest.mock("~/component/ClientCarousel", () => ({
  __esModule: true,
  default: () => <div data-testid="client-carousel">Client Carousel</div>,
}));

jest.mock("~/component/CardVentas", () => ({
  __esModule: true,
  default: ({ productos }) => (
    <div data-testid="card-ventas">
      Card Ventas - {productos?.length} productos
    </div>
  ),
}));

jest.mock("~/component/Mosaico", () => ({
  __esModule: true,
  default: () => <div data-testid="mosaico">Mosaico</div>,
}));

jest.mock("~/component/Footer", () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer</div>,
}));


jest.mock("~/hooks/useLocalStorage", () => ({
  useLocalStorage: jest.fn(),
}));

import { useLocalStorage } from "~/hooks/useLocalStorage";

describe("Welcome component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("muestra 'Cargando...' cuando isLoaded es false", () => {
    useLocalStorage.mockReturnValue([[], jest.fn(), false]);

    render(<Welcome />);

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("renderiza todos los componentes cuando isLoaded es true", () => {
    useLocalStorage.mockReturnValue([
      [{ id: 1, nombre: "Producto Test" }],
      jest.fn(),
      true,
    ]);

    render(<Welcome />);

    
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("areas-main")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("card-ventas")).toBeInTheDocument();
    expect(screen.getByTestId("mosaico")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("pasa correctamente los productos a CardVentas", () => {
    const mockProductos = [
      { id: 1, nombre: "Producto A" },
      { id: 2, nombre: "Producto B" },
    ];

    useLocalStorage.mockReturnValue([mockProductos, jest.fn(), true]);

    render(<Welcome />);

    expect(
      screen.getByText(/2 productos/i)
    ).toBeInTheDocument();
  });
});
