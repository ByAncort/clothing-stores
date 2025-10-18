import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../component/Footer';

test('Footer renderiza sin explotar', () => {
  const { container } = render(<Footer />);
  expect(container.firstChild).toBeTruthy();
});
