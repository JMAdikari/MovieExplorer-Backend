import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Simulate registration (replace with actual authentication logic)
    console.log('Register attempt:', { username, password });
    navigate('/login'); // Redirect to login after successful registration
  };

  return (
    <Container
      sx={{
        py: 4,
        mt: 3, // Added 32px top margin for extra space
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5', // Static light gray background
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: 400 },
          bgcolor: 'white',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
        component="form"
        onSubmit={handleSubmit}
        aria-label="Register form"
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Register
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          sx={{ bgcolor: 'white' }}
          aria-label="Username input"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          sx={{ bgcolor: 'white' }}
          aria-label="Password input"
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          sx={{ bgcolor: 'white' }}
          aria-label="Confirm password input"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, mb: 2, bgcolor: '#1976d2', '&:hover': { bgcolor: '#115293' } }}
          aria-label="Register button"
        >
          Register
        </Button>
        <Typography variant="body2" align="center">
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;