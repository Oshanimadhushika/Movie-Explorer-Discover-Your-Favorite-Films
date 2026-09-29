import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container } from '@mui/material';
import { LightMode, DarkMode, MovieFilter } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppProvider';

const Navbar = () => {
  const { mode, toggleTheme, user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MovieFilter sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'text.primary',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            MovieExplorer
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>

            {user ? (
              <>
                <Button color="inherit" component={RouterLink} to="/favorites" sx={{ fontWeight: 'bold' }}>
                  Favorites
                </Button>
                <Typography variant="body1" sx={{ ml: 2, mr: 2, display: { xs: 'none', sm: 'block' } }}>
                  Hi, {user.username}
                </Typography>
                <Button variant="outlined" color="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" component={RouterLink} to="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
