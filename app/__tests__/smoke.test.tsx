import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '~/component/Header';

function Hello({ name }: { name: string }) {
  return <h1>Hello {name}</h1>;
}

test('render TSX con Babel + Jest', () => {
  render(<Hello name="World" />);
  expect(
    screen.getByRole('heading', { name: /hello world/i })
  ).toBeInTheDocument();
});
