import axios from 'axios';

export const isAxiosError = axios.isAxiosError;

export interface SearchState {
  searchTerm: string;
  searchResults: SearchResults;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  resultsPerPage: number;
}

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[]; // Use an array for multiple authors
    coverImage: string;
    publishedDate: string;
    description: string;
    imageLinks: {
        thumbnail: string
    }
  }
}

// Use this type for the search results
export type SearchResults = Book[];