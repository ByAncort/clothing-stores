import React from 'react';
import { render } from '@testing-library/react';
import Mosaico from '../component/Mosaico';

test('Mosaico renderiza sin explotar', () => {
  const { container } = render(<Mosaico />);
  expect(container.firstChild).toBeTruthy();
});
