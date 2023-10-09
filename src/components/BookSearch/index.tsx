import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, AppDispatch, RootState } from '@/app/store';
import { setSearchTerm, searchBooks } from '@/features/search/searchSlice';
import { useDebounce, useLocalStorage } from '@/hooks';
import { RESULTS_PER_PAGE } from '@/constants';
import SearchPagination from './SearchPagination'; 

const SEARCH_TERM_KEY = 'searchTerm';

const SearchBar = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [inputValue, setInputValue] = useLocalStorage(SEARCH_TERM_KEY, ''); // Store input value in local storage
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const totalPages = useSelector((state: RootState) => state.search.totalPages);

  const resultsPerPage = RESULTS_PER_PAGE; // Number of results to show per page

  // Use the custom debounce hook with a specified delay (e.g., 500 milliseconds)
  const debouncedValue = useDebounce(inputValue, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update local storage with the new input value
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  // Use debouncedValue for searching
  React.useEffect(() => {
    if (debouncedValue) {
      dispatch(setSearchTerm(debouncedValue));
      dispatch(
        searchBooks({ term: debouncedValue, page: currentPage, perPage: resultsPerPage })
      );
    }
  }, [debouncedValue, currentPage, dispatch, resultsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(searchBooks({ term: debouncedValue, page, perPage: resultsPerPage }));
  };

  return (
    <div className="flex max-md:flex-col justify-between max-md:justify-center gap-4">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for books..."
        className="w-1/3 max-md:w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
      />
      {/* Render pagination controls here */}
      <SearchPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchBar;
