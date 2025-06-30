import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import authApi from '../Api/authApi'; 

// Register component for user registration
// This component allows users to register by providing their email, full name, password, and confirm
const Register = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);


    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        email: email.trim(),
        fullName: fullName.trim(),
        password,
        confirmPassword
      };

      const response = await authApi.register(userData);

      // Handle successful registration
      console.log('Registration successful:', response);
      setSuccess(true);

      //Auto-login after registration
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        navigate('/');
      } else {
        setTimeout(() => navigate('/login'), 2000);
      }

      // Redirect to login after successful registration
      setTimeout(() => navigate('/login'), 2000);
    }catch (error) {
      console.error('Registration error:', error);

      // Handle different error types
      if (typeof error === 'string') {
        setError(error);
      } else if (error.message) {
        setError(error.message);
      } else if (error.error) {
        setError(error.error);
      } else {
        setError('Registration failed. Please try again.');
        navigate('/register'); // Redirect to register on error
      }
    }finally {
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
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          sx={{ bgcolor: 'white' }}
          aria-label="Full Name input"
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
          <Link to="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;