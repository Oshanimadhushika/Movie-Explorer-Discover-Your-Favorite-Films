import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Grid, Chip, Button, CircularProgress, CardMedia } from '@mui/material';
import { Favorite, FavoriteBorder, PlayCircle } from '@mui/icons-material';
import { fetchMovieDetails } from '../api/tmdb';
import { useAppContext } from '../context/AppProvider';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite, user } = useAppContext();

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const { data } = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error || 'Movie not found'}</Typography>
      </Container>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` 
    : '';
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  // Get first YouTube trailer
  const trailer = movie.videos?.results?.find(vid => vid.site === 'YouTube' && vid.type === 'Trailer');
  const cast = movie.credits?.cast?.slice(0, 6) || [];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: '40vh', md: '60vh' },
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.1))' }} />
      </Box>

      <Container maxWidth="xl" sx={{ mt: { xs: -10, md: -20 }, position: 'relative', zIndex: 2, pb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <CardMedia
              component="img"
              image={posterUrl}
              alt={movie.title}
              sx={{ borderRadius: 4, boxShadow: 5, width: '100%', maxWidth: 350, margin: '0 auto' }}
            />
          </Grid>
          
          <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <Typography variant="h3" component="h1" fontWeight="bold" sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              {movie.title} ({movie.release_date?.split('-')[0]})
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2, mb: 3 }}>
              {movie.genres?.map(g => (
                <Chip key={g.id} label={g.name} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
              ))}
              <Chip label={`⭐ ${movie.vote_average?.toFixed(1)}`} color="primary" />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button 
                variant="contained" 
                color={isFavorite ? "error" : "primary"}
                startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                onClick={() => {
                  if(!user) alert("Please login to save favorites!");
                  else toggleFavorite(movie);
                }}
                sx={{ borderRadius: 2 }}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
              {trailer && (
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  startIcon={<PlayCircle />}
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'primary.main' } }}
                >
                  Watch Trailer
                </Button>
              )}
            </Box>

            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: 'text.primary' }}>
              Overview
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'text.secondary', maxWidth: '800px', lineHeight: 1.8 }}>
              {movie.overview}
            </Typography>

            {cast.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
                  Top Cast
                </Typography>
                <Grid container spacing={2}>
                  {cast.map(actor => (
                    <Grid item xs={6} sm={4} md={2} key={actor.id}>
                      <Box sx={{ textAlign: 'center' }}>
                        <CardMedia
                          component="img"
                          image={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Image'}
                          alt={actor.name}
                          sx={{ borderRadius: 2, mb: 1, height: 180, objectFit: 'cover' }}
                        />
                        <Typography variant="body2" fontWeight="bold">{actor.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{actor.character}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieDetails;
