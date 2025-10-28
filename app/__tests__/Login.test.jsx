import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Login Page", () => {
  it("renders Header, LoginComponent and Footer correctly", () => {
    const Login = require("~/pages/login/login").default;

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );


    expect(screen.getByTestId("header")).toBeTruthy();
    expect(screen.getByTestId("login-component")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });
});
