import React from 'react';
import { screen } from '@testing-library/react';
import SearchPagination from '../SearchPagination';
import { renderWithProviders } from '@/utils/test-utils';

test('SearchPagination component renders correctly', () => {
  renderWithProviders(<SearchPagination currentPage={1} totalPages={10} onPageChange={() => {}} />);
  const previousButton = screen.getByText('<');
  const nextButton = screen.getByText('>');
  expect(previousButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
});

test('SearchPagination disables "<" button on the first page', () => {
  renderWithProviders(<SearchPagination currentPage={1} totalPages={10} onPageChange={() => {}} />);
  const previousButton = screen.getByText('<');
  expect(previousButton).toBeDisabled();
});

test('SearchPagination disables ">" button on the last page', () => {
  renderWithProviders(<SearchPagination currentPage={10} totalPages={10} onPageChange={() => {}} />);
  const nextButton = screen.getByText('>');
  expect(nextButton).toBeDisabled();
});
// Add more tests as needed
