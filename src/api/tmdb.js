import axios from 'axios';

// Ensure the API key is provided via .env
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Get trending movies
export const fetchTrending = (page = 1) => 
  tmdbApi.get(`/trending/movie/day`, { params: { page } });

// Search for movies by name
export const searchMovies = (query, page = 1) => 
  tmdbApi.get(`/search/movie`, { params: { query, page } });

// Discover movies for advanced filtering (genre, year, rating)
export const discoverMovies = (page = 1, filters = {}) => {
  const params = { page };
  if (filters.genre) params.with_genres = filters.genre;
  if (filters.year) params.primary_release_year = filters.year;
  if (filters.rating) params['vote_average.gte'] = filters.rating;
  
  return tmdbApi.get(`/discover/movie`, { params });
};

// Get movie details (including trailer and cast)
export const fetchMovieDetails = (id) => 
  tmdbApi.get(`/movie/${id}`, { params: { append_to_response: 'videos,credits' } });

// Get movie genres list
export const fetchGenres = () => 
  tmdbApi.get(`/genre/movie/list`);
