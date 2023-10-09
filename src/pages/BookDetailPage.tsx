import React from 'react';
import { useParams } from 'react-router-dom';
import BookDetail from '@/components/BookDetail';

function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();

  const bookIdOrDefault = bookId ?? '';

  return (
    <div>
      <BookDetail bookId={bookIdOrDefault} />
    </div>
  );
}

export default BookDetailPage;