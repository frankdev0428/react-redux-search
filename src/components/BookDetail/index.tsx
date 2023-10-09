import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchBookDetails } from '@/features/search/searchSlice';

interface BookDetailProps {
  bookId: string;
}

const BookDetail: React.FC<BookDetailProps> = ({ bookId }) => {
  const dispatch = useDispatch();
  const [book, setBook] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch additional book details when the component mounts
  useEffect(() => {
    if (bookId && !book) {
      dispatch(searchBookDetails(bookId) as any)
        .then((response: any) => {
          // Set the book data in local state
          setBook(response.payload);
        })
        .catch((error: any) => {
          // Handle API call errors here
          setError('An error occurred while fetching book details.');
        });
    }
  }, [bookId, book, dispatch]);

  if (error) {
    // Display an error message
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  }

  if (!book) {
    return <div className="text-center mt-4">Loading book details...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Book Title */}
      <h2 className="text-2xl font-semibold mb-2">{book.volumeInfo.title}</h2>

      {/* Book Authors */}
      <p className="text-gray-700 mb-2">
        Author(s): {book.volumeInfo.authors?.join(', ')}
      </p>

      {/* Published Date */}
      <p className="text-gray-700 mb-2">
        Published Date: {book.volumeInfo.publishedDate}
      </p>

      {/* Description with overflow ellipsis */}
      <p
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
      ></p>

      {/* Book Cover Image */}
      {book.volumeInfo.imageLinks && (
        <img
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={`Cover for ${book.volumeInfo.title}`}
          className="w-full object-cover mb-2"
          loading="lazy"
        />
      )}
    </div>
  );
};

export default BookDetail;
