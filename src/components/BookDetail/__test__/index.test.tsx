import React from 'react';
import { screen } from '@testing-library/react';
import BookDetail from '../';
import { renderWithProviders } from '@/utils/test-utils';

describe('BookDetail component', () => {
  it('renders loading message when book data is null', async () => {

    renderWithProviders(
        <BookDetail bookId="" />
    );

    const loadingElement = screen.getByText('Loading book details...');
    expect(loadingElement).toBeInTheDocument();
  });
  // You can add more test cases as needed
});
