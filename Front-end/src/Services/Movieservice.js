//featch data from tmdb api, Get a list of trending movies from TMDb.
import tmdb from '../Api/tmdb';

export const getTrendingMovies = async () => {
  const response = await tmdb.get('/trending/movie/week');
  return response.data.results;
};

// 2. Search Movies by Keyword
export const searchMovies = async (query, page = 1) => {
  const response = await tmdb.get('/search/movie', {
    params: { query, page },
  });
  return response.data.results;
};

//// 3. Get Full Movie Details
export const getMovieDetails = async (movieId) => {
  const response = await tmdb.get(`/movie/${movieId}`, {
    params: { append_to_response: 'videos,credits' },
  });
  return response.data;
};

//Handle API Errors
try {
  const movies = await getTrendingMovies();
} catch (error) {
  console.error("Failed to fetch movies:", error.message);
  alert("Something went wrong. Please try again later.");
}

