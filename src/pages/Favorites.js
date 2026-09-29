import React from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppProvider';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites, user } = useAppContext();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Please login to view your favorites.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/login')} sx={{ mt: 2 }}>
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        My Favorite Movies
      </Typography>
      
      {favorites.length === 0 ? (
        <Box textAlign="center" sx={{ mt: 10 }}>
          <Typography variant="h6" color="text.secondary">
            You haven't added any favorite movies yet.
          </Typography>
          <Button variant="outlined" onClick={() => navigate('/')} sx={{ mt: 3 }}>
            Discover Movies
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
