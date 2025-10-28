import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../component/Footer';

it('Footer renderiza sin explotar', () => {
  const { container } = render(<Footer />);
  expect(container.firstChild).toBeTruthy();
});
