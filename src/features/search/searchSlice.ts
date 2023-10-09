import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RESULTS_PER_PAGE } from '@/constants';
import { searchBooksApi, fetchBookDetailsApi } from './api';
import { SearchState, isAxiosError, SearchResults, Book } from './types';

const initialState: SearchState = {
  searchTerm: '',
  searchResults: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  resultsPerPage: RESULTS_PER_PAGE,
};

export const searchBooks = createAsyncThunk<
  { items: SearchResults, totalPages: number},
  { term: string; page: number; perPage: number },
  { rejectValue: string }
>('search/searchBooks', async ({ term, page, perPage }, { rejectWithValue }) => {
  try {
    const response = await searchBooksApi(term, page, perPage);
    const data = response.data;

    const totalItems = data.totalItems || 0;
    const totalPages = Math.ceil(totalItems / perPage);

    return {
      items: data.items || [],
      totalPages,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    } else {
      return rejectWithValue('An error occurred');
    }
  }
});

export const searchBookDetails = createAsyncThunk<Book, string, { rejectValue: string }>(
    'search/searchBookDetails',
    async (bookId, { rejectWithValue }) => {
      try {
        const response = await fetchBookDetailsApi(bookId);
        return response.data;
      } catch (error) {
        if (isAxiosError(error)) {
          return rejectWithValue(error.response?.data || 'An error occurred');
        } else {
          return rejectWithValue('An error occurred');
        }
      }
    }
  );
  

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.items || [];
        state.totalPages = action.payload.totalPages || 0; // Set totalPages from payload
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;