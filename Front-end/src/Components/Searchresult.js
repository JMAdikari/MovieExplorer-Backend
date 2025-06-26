import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { searchMovies } from '../Services/Movieservice';
import MovieList from '../Components/Movielist';

const SearchResults = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    setError(null);
    searchMovies(decodeURIComponent(query))
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load search results. Please try again later.');
        setLoading(false);
      });
  }, [query]);

  return (
    <Container
      sx={{
        py: 4,
        mt: 3, // Added 32px top margin for extra space
        color: theme.palette.text.primary,
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Search Results for "{decodeURIComponent(query)}"
      </Typography>
      {loading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : movies.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No movies found for "{decodeURIComponent(query)}".
        </Typography>
      ) : (
        <MovieList movies={movies} />
      )}
    </Container>
  );
};

export default SearchResults;