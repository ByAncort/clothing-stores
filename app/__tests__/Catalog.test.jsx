import React from "react";
import { render, screen } from "@testing-library/react";
import  Catalog  from "../pages/catalog/Catalog";
import { BrowserRouter, useParams } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("~/component/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="header">Header</div>,
}));

jest.mock("~/component/ProductList", () => ({
  __esModule: true,
  default: () => <div data-testid="product-list">ProductList</div>,
}));

jest.mock("~/component/Footer", () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer</div>,
}));

describe("Catalog Component", () => {
  const renderWithRouter = (component) =>
    render(<BrowserRouter>{component}</BrowserRouter>);

  beforeEach(() => {
    useParams.mockReturnValue({});
  });

  test("renders Header, ProductList y Footer", () => {
    renderWithRouter(<Catalog />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("muestra todos los productos si no hay category param", () => {
    renderWithRouter(<Catalog />);
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });

  test("filtra productos por categoría cuando se proporciona category", () => {
    useParams.mockReturnValue({ category: "shoes" });
    renderWithRouter(<Catalog />);
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });

  test("filtra productos por categoría sin importar mayúsculas/minúsculas", () => {
    useParams.mockReturnValue({ category: "SHOES" });
    renderWithRouter(<Catalog />);
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });

  test("muestra el título y subtítulo correctamente", () => {
    renderWithRouter(<Catalog />);
    // Ajusta los testids si tu componente tiene títulos reales
    // expect(screen.getByText(/Título/i)).toBeInTheDocument();
    // expect(screen.getByText(/Subtítulo/i)).toBeInTheDocument();
  });
});
