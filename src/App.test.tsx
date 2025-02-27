import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Carspace heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Carspace/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders user dashboard by default', () => {
  render(<App />);
  const heroText = screen.getByText(/Find Quality-Assured Cars/i);
  expect(heroText).toBeInTheDocument();
});
