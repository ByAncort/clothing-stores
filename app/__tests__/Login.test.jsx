import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "~/component/Header"; // aliased to stub
import Footer from "~/component/Footer"; // aliased to stub

describe("Login Page", () => {
  it("renders Header, LoginComponent and Footer correctly", () => {
    const Login = require("~/pages/login/login").default;

    render(
      <MemoryRouter>
        <Header />
        <Login />
        <Footer />
      </MemoryRouter>
    );


    expect(screen.getByTestId("header")).toBeTruthy();
    expect(screen.getByTestId("login-component")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });
});
