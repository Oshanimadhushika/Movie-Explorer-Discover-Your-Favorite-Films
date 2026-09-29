import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import { Favorite, FavoriteBorder, Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppProvider';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, user } = useAppContext();
  const [snackOpen, setSnackOpen] = useState(false);

  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!user) {
      setSnackOpen(true);
      return;
    }
    toggleFavorite(movie);
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          position: 'relative',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: 6,
          },
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="400"
            image={imageUrl}
            alt={movie.title}
            sx={{ objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: '50%',
            }}
          >
            <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
              <IconButton onClick={handleFavoriteClick} sx={{ color: isFavorite ? 'error.main' : 'white' }}>
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Star sx={{ color: 'gold', fontSize: 18 }} />
            <Typography variant="body2" fontWeight="bold">
              {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </Typography>
          </Box>
        </Box>
        <CardContent sx={{ flexGrow: 1, backgroundColor: 'background.paper' }}>
          <Typography gutterBottom variant="h6" component="div" noWrap title={movie.title} fontWeight="bold">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.release_date ? movie.release_date.split('-')[0] : 'Unknown Year'}
          </Typography>
        </CardContent>
      </Card>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="warning"
          variant="filled"
          sx={{ width: '100%', borderRadius: 2, fontWeight: 'bold' }}
        >
          Please login to save favorites!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MovieCard;
