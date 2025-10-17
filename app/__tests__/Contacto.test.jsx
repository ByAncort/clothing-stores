import React from "react";
import { render, screen } from "@testing-library/react";
import Contacto from "../pages/contacto/contacto"; 
import Header from '~/component/Header';


jest.mock("~/component/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="header">Header Component</div>,
}));

jest.mock("~/component/Contact", () => ({
  __esModule: true,
  default: () => <div data-testid="contact">Contact Component</div>,
}));

jest.mock("~/component/Footer", () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer Component</div>,
}));

describe("Contacto Page", () => {
  test("renders Header, Contact and Footer correctly", () => {
    render(<Contacto />);

    
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("contact")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
