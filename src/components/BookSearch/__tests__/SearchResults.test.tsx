import React from 'react';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchResults from '../SearchResults';
import { renderWithProviders } from '@/utils/test-utils';

// Mock the useSelector function to return data
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('SearchResults component', () => {
  it('renders loading message when loading is true', () => {
    // Mock useSelector to return loading as true
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce([]);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(true);

    renderWithProviders(
        <BrowserRouter>
            <SearchResults />
        </BrowserRouter>
    );

    const loadingMessage = screen.getByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('renders search results when loading is false', async () => {
    const mockSearchResults = [
      {
        id: '1',
        volumeInfo: {
          title: 'Book 1',
          authors: ['Author 1'],
          imageLinks: { thumbnail: 'url1' },
          publishedDate: '2021-01-01',
          description: 'Description for Book 1',
        },
      },
      {
        id: '2',
        volumeInfo: {
          title: 'Book 2',
          authors: ['Author 2'],
          imageLinks: { thumbnail: 'url2' },
          publishedDate: '2021-02-01',
          description: 'Description for Book 2',
        },
      },
    ];

    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(mockSearchResults);
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValueOnce(false);

    renderWithProviders(
        <BrowserRouter>
            <SearchResults />
        </BrowserRouter>
    );

    expect(screen.getByText('Book 1')).toBeInTheDocument();
  });
});
