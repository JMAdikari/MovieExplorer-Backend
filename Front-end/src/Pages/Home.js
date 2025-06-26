import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../Services/Movieservice';
import MovieList from '../Components/Movielist';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center p-6">
      <h2 className="text-3xl font-bold mb-6"> Trending Movies</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
