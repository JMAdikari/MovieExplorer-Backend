import React from 'react';
import MovieCard from './Moviecard';

const Movielist = ({ movies }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Responsive grid, min 250px per card
      gap: '1rem',
      '@media (min-width: 600px)': { // sm breakpoint
        gridTemplateColumns: 'repeat(2, 1fr)', // 2 cards on small screens
      },
      '@media (min-width: 900px)': { // md breakpoint
        gridTemplateColumns: 'repeat(4, 1fr)', // 4 cards on medium+ screens
      },
    }}
  >
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
);

export default Movielist;