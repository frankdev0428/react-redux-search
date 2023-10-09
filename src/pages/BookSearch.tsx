import React from 'react';
import BookSearch from '@/components/BookSearch';
import SearchResults from '@/components/BookSearch/SearchResults';

function Home() {
  return (
    <div>
      <BookSearch />
      <SearchResults />
    </div>
  );
}

export default Home;