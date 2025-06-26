import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, IconButton, InputAdornment, useTheme } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', width: { xs: '100%', sm: 'auto' } }}>
      <TextField
        variant="outlined"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="small"
        sx={{
          bgcolor: theme.palette.background.paper,
          borderRadius: 1,
          width: { xs: '100%', sm: 200 },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: theme.palette.divider },
            '&:hover fieldset': { borderColor: theme.palette.primary.main },
            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" aria-label="Search movies">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchBar;