import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const searchResults = useSelector((state: RootState) => state.search.searchResults);
  const loading = useSelector((state: RootState) => state.search.loading);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 max-md:gap-3 my-8">
      {searchResults.map((result) => (
        <div
          key={result.id}
          className="w-[calc(20%-16px)] max-md:w-[calc(50%-16px)] max-lg:w-[calc(33.33%-16px)] max-xl:w-[calc(25%-16px)] transition-transform transform hover:scale-105"
        >
          <Link to={`/book/${result.id}`}>
            <div className="bg-white rounded-lg shadow-md p-4">
              {/* Add cover image if available */}
              {result.volumeInfo.imageLinks && (
                <img
                  src={result.volumeInfo.imageLinks.thumbnail}
                  alt={`Cover for ${result.volumeInfo.title}`}
                  className="w-full h-64 object-cover mb-2 max-md:h-48"
                  loading="lazy"
                />
              )}
              <div className="flex flex-col h-44 gap-2">
                <h3 className="text-lg max-md:text-base text-center font-semibold line-clamp-1">
                  {result.volumeInfo.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Author: {result.volumeInfo.authors?.join(', ')}
                </p>
                <p className="text-sm text-gray-500">
                  Published Date: {result.volumeInfo.publishedDate}
                </p>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {result.volumeInfo.description}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
