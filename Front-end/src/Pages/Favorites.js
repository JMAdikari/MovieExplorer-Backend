import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, CardContent, Typography, IconButton, useTheme } from '@mui/material';
import { Star, Delete } from '@mui/icons-material';

const Favorites = () => {
  const theme = useTheme();
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Remove a movie from favorites
  const removeFavorite = (movieId) => {
    setFavorites(favorites.filter((movie) => movie.id !== movieId));
  };

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
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        🎬 Your Favorites
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          You haven't added any favorite movies yet.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item xs={6} sm={4} md={3} key={movie.id}>
              <Card
                sx={{
                  width: { xs: '100%', sm: 250 }, // Fixed width for consistency with MovieCard.js
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 2,
                  boxShadow: theme.shadows[4],
                  transition: 'transform 0.3s, box-shadow: 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                  height: '100%', // Ensure uniform height
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative', // For absolute positioning of IconButton
                }}
                role="article"
                aria-label={`Favorite movie: ${movie.title}`}
              >
                <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', flexGrow: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: 256, // Fixed height for uniformity
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px 8px 0 0',
                    }}
                    image={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : 'https://via.placeholder.com/300x450?text=No+Poster'
                    }
                    alt={movie.title || 'Movie poster'}
                  />
                  <CardContent sx={{ p: 2, flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      noWrap
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {movie.title || 'Untitled'}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={theme.palette.warning.main}
                      sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <Star fontSize="small" /> {movie.vote_average?.toFixed(1) || 'N/A'}
                    </Typography>
                  </CardContent>
                </Link>
                <IconButton
                  onClick={() => removeFavorite(movie.id)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: theme.palette.error.main,
                    bgcolor: theme.palette.background.paper,
                    '&:hover': { bgcolor: theme.palette.action.hover },
                  }}
                  aria-label={`Remove ${movie.title} from favorites`}
                >
                  <Delete />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;