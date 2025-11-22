import React from 'react';
import { render } from '@testing-library/react';
import Mosaico from '../component/Mosaico';

it('Mosaico renderiza sin explotar', () => {
  const { container } = render(<Mosaico />);
  expect(container.firstChild).toBeTruthy();
});
