import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import SearchBar from './Searchbar';
import { ThemeContext } from '@emotion/react'; // Assuming a ThemeContext for dark mode toggle

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { toggleTheme } = useContext(ThemeContext); // Assuming ThemeContext provides toggleTheme

  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.primary.main }}>
      <Toolbar sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: 1 }}>
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
          component={Link}
          to="/"
          style={{ textDecoration: 'none', color: 'inherit' }}
          aria-label="Movie Explorer Home"
        >
          Movie Explorer
        </Typography>
        <SearchBar />
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ mx: 1, fontSize: { xs: '0.8rem', sm: '1rem' } }}
          aria-label="Home"
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/favorites"
          sx={{ mx: 1, fontSize: { xs: '0.8rem', sm: '1rem' } }}
          aria-label="Favorites"
        >
          Favorites
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/login"
          sx={{ mx: 1, fontSize: { xs: '0.8rem', sm: '1rem' } }}
          aria-label="Login"
        >
          Login
        </Button>
        <IconButton
          color="inherit"
          onClick={toggleTheme}
          sx={{ mx: 1 }}
          aria-label="Toggle light/dark mode"
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;