import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/utils/test-utils';
import SearchBar from '..';

test('SearchBar component renders correctly', () => {
  renderWithProviders(<SearchBar />);
  const inputElement = screen.getByPlaceholderText('Search for books...');
  expect(inputElement).toBeInTheDocument();
});

test('SearchBar input value updates on change', () => {
  renderWithProviders(<SearchBar />);
  const inputElement = screen.getByPlaceholderText('Search for books...');
  fireEvent.change(inputElement, { target: { value: 'Harry Potter' } });
  expect(inputElement).toHaveValue('Harry Potter');
});

//Add more tests as needed
