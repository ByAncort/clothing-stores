import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../component/Header';

it('Header renderiza sin explotar', () => {
  const { container } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(container.firstChild).toBeTruthy();
});
