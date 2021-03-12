import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Dronuts link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Dronuts/i);
  expect(linkElement).toBeInTheDocument();
});
