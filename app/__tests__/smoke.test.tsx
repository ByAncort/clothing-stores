import React from 'react';
import { render, screen } from '@testing-library/react';

function Hello({ name }: { readonly name: string }) {
  return <h1>Hello {name}</h1>;
}

it('render TSX con Babel + Jasmine', () => {
  render(<Hello name="World" />);
  expect(
    screen.getByRole('heading', { name: /hello world/i })
  ).toBeTruthy();
});
