import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import authApi from '../Api/authApi'; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await authApi.getCurrentUser();
        setUser(userData);
        setLoading(false);
      } catch (err) {
        // Check if error is due to unauthorized access (e.g., 401)
        if (err.response && err.response.status === 401) {
          navigate('/login'); // Redirect to login if not authenticated
        } else {
          setError(err.message || 'Failed to load profile. Please try again.');
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Logout failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          py: 4,
          mt: 3,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f5f5f5',
        }}
      >
        <CircularProgress aria-label="Loading profile" />
      </Container>
    );
  }

  return (
    <Container
      sx={{
        py: 4,
        mt: 3,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
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
        aria-label="Profile page"
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Profile
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {user ? (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Full Name:</strong> {user.fullName || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Email:</strong> {user.email || 'N/A'}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 2, bgcolor: '#1976d2', '&:hover': { bgcolor: '#115293' } }}
              onClick={handleLogout}
              aria-label="Logout button"
            >
              Logout
            </Button>
          </>
        ) : (
          <Typography variant="body1" align="center">
            No profile data available.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Profile;