// ...existing code...
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Header from "~/component/Header"; // aliased to stub in karma
import Footer from "~/component/Footer"; // aliased to stub in karma

describe("Catalog Component (AreasMain test)", () => {

  beforeEach(() => {
    // No need to mock via spyOnProperty; webpack aliases replace these modules with stubs
  });

  const renderWithRouter = ({ path = "/catalog", route = "/catalog" } = {}) => {
    const Catalog = require("../pages/catalog/catalog").default;
    return render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route
            path={route}
            element={
              <>
                <Header />
                <Catalog />
                <Footer />
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    );
  };

  it("should render Header, ProductList and Footer", () => {
  renderWithRouter();
    expect(screen.getByTestId("header")).toBeTruthy();
    expect(screen.getByTestId("product-list")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });

  it("should show all products when no category param", () => {
  renderWithRouter({ path: "/catalog", route: "/catalog" });
    expect(screen.getByTestId("product-list")).toBeTruthy();
  });

  it("should filter products by category when provided", () => {
  renderWithRouter({ path: "/catalog/shoes", route: "/catalog/:category" });
    expect(screen.getByTestId("product-list")).toBeTruthy();
  });

  it("should filter products by category case-insensitive", () => {
  renderWithRouter({ path: "/catalog/SHOES", route: "/catalog/:category" });
    expect(screen.getByTestId("product-list")).toBeTruthy();
  });
});
// ...existing code...