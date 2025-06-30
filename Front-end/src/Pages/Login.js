import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import authApi from '../Api/authApi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Please fill in both username and password.');
      setLoading(false);
      return;
    }

    try {
      const credentials = { email: email.trim(), password };
      const response = await authApi.login(credentials);
      
      // Handle successful login
      console.log('Login successful:', response);
      
      // Store token if provided
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      
      // Store user info if provided
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      navigate('/'); // Redirect to home after successful login
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different error types
      if (typeof error === 'string') {
        setError(error);
      } else if (error.message) {
        setError(error.message);
      } else if (error.error) {
        setError(error.error);
      } else {
        setError('Login failed. Please check your credentials and try again.');
        navigate('/login'); // Redirect to login on error
      }
    } finally {
      setLoading(false);
    }
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
        aria-label="Login form"
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          sx={{ bgcolor: 'white' }}
          aria-label="Email input"
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
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, mb: 2, bgcolor: '#1976d2', '&:hover': { bgcolor: '#115293' } }}
          aria-label="Login button"
        >
          Login
        </Button>
        <Typography variant="body2" align="center">
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;