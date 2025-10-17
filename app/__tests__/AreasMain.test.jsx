import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '~/component/Header';

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

// Importa el componente
import AreasMain from '../component/AreasMain';

describe('AreasMain', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders main elements', () => {
    render(
      <BrowserRouter>
        <AreasMain />
      </BrowserRouter>
    );

    // Verifica que los elementos principales estén presentes
    expect(screen.getByTestId('main-slide')).toBeInTheDocument();
    expect(screen.getByTestId('preview-slide')).toBeInTheDocument();
  });

  test('displays initial slide content', () => {
    render(
      <BrowserRouter>
        <AreasMain />
      </BrowserRouter>
    );

    expect(screen.getByTestId('slide-title')).toHaveTextContent('New Drops');
    expect(screen.getByTestId('slide-subtitle')).toHaveTextContent('From $100');
  });

  test('navigates on More button click', () => {
    render(
      <BrowserRouter>
        <AreasMain />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('more-button'));
    expect(mockNavigate).toHaveBeenCalledWith('/Model-3');
  });
});