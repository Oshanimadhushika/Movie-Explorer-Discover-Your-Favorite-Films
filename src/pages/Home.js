import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, TextField, Button, CircularProgress, MenuItem, Select, FormControl, InputLabel, Paper, InputAdornment, IconButton } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { fetchTrending, searchMovies, discoverMovies, fetchGenres } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import { useAppContext } from '../context/AppProvider';

const Home = () => {
  const { lastSearch, setLastSearch } = useAppContext();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    fetchGenres().then(res => setGenres(res.data.genres)).catch(err => console.error(err));
  }, []);

  const loadMovies = async (pageNum, append = false, queryOverride = null) => {
    try {
      setLoading(true);
      setError(null);
      let response;
      const currentQuery = queryOverride !== null ? queryOverride : query;

      if (currentQuery) {
        response = await searchMovies(currentQuery, pageNum);
        setLastSearch(currentQuery);
      } else if (genre || year || rating) {
        response = await discoverMovies(pageNum, { genre, year, rating });
      } else {
        response = await fetchTrending(pageNum);
      }

      setMovies(prev => append ? [...prev, ...response.data.results] : response.data.results);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadMovies(1, false);
    // eslint-disable-next-line
  }, [genre, year, rating]);

  const handleSearch = (e) => {
    e.preventDefault();
    setGenre('');
    setYear('');
    setRating('');
    setPage(1);
    loadMovies(1, false);
  };

  const handleClearSearch = () => {
    setQuery('');
    setLastSearch('');
    setPage(1);
    loadMovies(1, false, '');
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage, true);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => currentYear - index);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 6, borderRadius: 3 }}>
        <form onSubmit={handleSearch}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
            <TextField
              sx={{ flex: { xs: '1 1 100%', lg: 3 } }}
              variant="outlined"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);
                if (!val) {
                  setLastSearch('');
                  setPage(1);
                  loadMovies(1, false, '');
                }
              }}
              InputProps={{
                startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                endAdornment: query ? (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearSearch} edge="end">
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ flex: { xs: '1 1 100%', lg: 1 }, height: 56, whiteSpace: 'nowrap' }}
            >
              Search
            </Button>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flex: { xs: '1 1 100%', lg: 3 } }}>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Genre</InputLabel>
                <Select value={genre} label="Genre" onChange={(e) => { setGenre(e.target.value); setQuery(''); }}>
                  <MenuItem value=""><em>All</em></MenuItem>
                  {genres.map(g => (
                    <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Year</InputLabel>
                <Select value={year} label="Year" onChange={(e) => { setYear(e.target.value); setQuery(''); }}>
                  <MenuItem value=""><em>All</em></MenuItem>
                  {years.map(y => (
                    <MenuItem key={y} value={y}>{y}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} label="Rating" onChange={(e) => { setRating(e.target.value); setQuery(''); }}>
                  <MenuItem value=""><em>All</em></MenuItem>
                  {[9, 8, 7, 6, 5].map(r => (
                    <MenuItem key={r} value={r}>{r}+ Stars</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </form>
      </Paper>

      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        {query ? `Search Results for "${query}"` : (genre || year || rating) ? 'Filtered Movies' : 'Trending Movies'}
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {movies.length === 0 && !loading && !error && (
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mt: 5 }}>
          No movies found. Try adjusting your search or filters.
        </Typography>
      )}

      {movies.length > 0 && (
        <Box textAlign="center" sx={{ mt: 6 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleLoadMore}
            disabled={loading}
            sx={{ px: 5, py: 1.5, borderRadius: 8, fontWeight: 'bold' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Load More'}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Home;
