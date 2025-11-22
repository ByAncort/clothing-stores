import React from 'react';
import { render } from '@testing-library/react';
import Contact from '../component/Contact';

it('Contact (component) renderiza sin explotar', () => {
  const { container } = render(<Contact />);
  expect(container.firstChild).toBeTruthy();
});
