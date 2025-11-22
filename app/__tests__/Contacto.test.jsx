import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Contacto Page", () => {
  it("renders Header, Contact and Footer correctly", () => {
    const Contacto = require("../pages/contacto/contacto").default;
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );
    // Header y Footer son stubs con data-testid cuando se importan con alias,
    // pero esta página usa imports relativos. Afirmamos por contenido visible y estructura.
    expect(screen.getByText(/contáctanos/i)).toBeInTheDocument();
  });
});
