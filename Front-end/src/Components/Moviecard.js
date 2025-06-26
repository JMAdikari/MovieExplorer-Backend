import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, IconButton, Tooltip } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const MovieCard = ({ movie }) => {
  const theme = useTheme();
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((e) => {
    e.preventDefault();
    setFavorites((prevFavorites) => {
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      }
      return [...prevFavorites, movie];
    });
  }, [isFavorite, movie]);

  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }} aria-label={`View details for ${movie.title || 'Untitled'}`}>
      <Card
        sx={{
          width: { xs: '100%', sm: 250 },
          m: 1,
          ml: { xs: 2, sm: 3 }, // Increased left margin: 2 units (16px) on mobile, 3 units (24px) on larger screens
          borderRadius: 4,
          boxShadow: 3,
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 6,
            border: '1px solid',
            borderColor: 'warning.main',
          },
          bgcolor: theme.palette.background.paper,
          display: 'flex',
          flexDirection: 'column',
        }}
        role="article"
      >
        <CardMedia
          component="img"
          height="320"
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : 'https://via.placeholder.com/300x450?text=No+Poster'
          }
          alt={movie.title || 'Movie poster'}
          sx={{ objectFit: 'cover', width: '100%' }}
        />
        <CardContent sx={{ p: 2, flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="h4"
            noWrap
            sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
          >
            {movie.title || 'Untitled'}
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary} sx={{ mt: 1 }}>
            {movie.release_date?.split('-')[0] || 'N/A'}
          </Typography>
          <Typography variant="body2" color={theme.palette.warning.main} sx={{ mt: 1 }}>
            ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary} sx={{ mt: 1, fontSize: '0.8rem' }} noWrap>
            {movie.genres?.map((g) => g.name).join(', ') || 'N/A'}
          </Typography>
          <Tooltip title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
            <IconButton
              onClick={toggleFavorite}
              sx={{ mt: 1, color: isFavorite ? theme.palette.warning.main : theme.palette.text.secondary }}
              aria-label={isFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
            >
              {isFavorite ? <Star /> : <StarBorder />}
            </IconButton>
          </Tooltip>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;