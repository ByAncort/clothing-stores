import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "~/pages/login/login";


jest.mock("~/component/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="header">Header Component</div>,
}));

jest.mock("~/component/Footer", () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer Component</div>,
}));

jest.mock("~/component/login", () => ({
  __esModule: true,
  default: () => <div data-testid="login-component">Login Component</div>,
}));

describe("Login Page", () => {
  test("renders Header, LoginComponent and Footer correctly", () => {
    render(<Login />);


    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("login-component")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
