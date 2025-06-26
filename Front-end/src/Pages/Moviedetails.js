import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../Services/Movieservice';
import { Container, Box, Typography, Rating, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    setError(null);
    getMovieDetails(id)
      .then((data) => setMovie(data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load movie details. Please try again later.');
      });
  }, [id]);

  if (error) {
    return (
      <Container sx={{ py: 4, color: theme.palette.text.primary, minHeight: '100vh', bgcolor: theme.palette.background.default }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
        <CircularProgress />
      </Container>
    );
  }

  const trailer = movie.videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );

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
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ width: { xs: '100%', md: '33%' } }}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              objectFit: 'cover',
              boxShadow: theme.shadows[4],
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {movie.overview}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {movie.vote_average.toFixed(1)} / 10
            </Typography>
          </Box>
          <Typography variant="body2" gutterBottom>
            <strong>Genres:</strong> {movie.genres?.map((g) => g.name).join(', ') || 'N/A'}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Cast:</strong>{' '}
            {movie.credits?.cast?.slice(0, 3).map((c) => c.name).join(', ') || 'N/A'}
          </Typography>
          {trailer && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Watch Trailer
              </Typography>
              <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                  }}
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  frameBorder="0"
                  allowFullScreen
                  title={`${movie.title} Trailer`}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MovieDetails;