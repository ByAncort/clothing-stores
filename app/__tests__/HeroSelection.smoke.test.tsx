import React from 'react';
import { render } from '@testing-library/react';
import HeroSelection from '../component/HeroSelection';

it('HeroSelection renderiza sin explotar', () => {
  const { container } = render(<HeroSelection />);
  expect(container.firstChild).toBeTruthy();
});
