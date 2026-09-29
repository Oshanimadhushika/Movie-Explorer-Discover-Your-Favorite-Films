import React, { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Authentication State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('movie_app_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Theme State
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('movie_app_theme') || 'dark';
  });

  // Favorites State
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('movie_app_favorites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  // Last Searched Movie
  const [lastSearch, setLastSearch] = useState(() => {
    return localStorage.getItem('movie_app_last_search') || '';
  });

  // Persist state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('movie_app_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('movie_app_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('movie_app_theme', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('movie_app_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('movie_app_last_search', lastSearch);
  }, [lastSearch]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const login = (username) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const isFav = prev.find((m) => m.id === movie.id);
      if (isFav) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        mode,
        toggleTheme,
        favorites,
        toggleFavorite,
        lastSearch,
        setLastSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
