import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Australia', path: '/australia-points' },
  { label: 'Canada', path: '/canada-points' },
  { label: 'France', path: '/france-points' },
  { label: 'New Zealand', path: '/new-zealand-points' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.includes(path)) return true;
    return false;
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          button 
          key={item.label}
          onClick={() => handleNavigation(item.path)}
          selected={isActive(item.path)}
          sx={{
            '&.Mui-selected': {
              bgcolor: 'rgba(25, 118, 210, 0.08)',
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.12)',
              },
            },
          }}
        >
          <ListItemText 
            primary={item.label}
            primaryTypographyProps={{
              fontWeight: isActive(item.path) ? 600 : 400,
            }}
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="fixed" color="transparent" elevation={0} sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          onClick={() => handleNavigation('/')}
          sx={{
            flexGrow: { xs: 1, md: 0 },
            mr: { md: 5 },
            fontWeight: 700,
            color: 'primary.main',
            fontFamily: '"Inter Tight", sans-serif',
            cursor: 'pointer',
          }}
        >
          Vysar
        </Typography>

        {/* Desktop menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, gap: 2 }}>
          {menuItems.map((item) => (
            <Button
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              sx={{ 
                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                fontWeight: isActive(item.path) ? 600 : 400,
                position: 'relative',
                '&::after': isActive(item.path) ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                  height: '2px',
                  bgcolor: 'primary.main',
                } : {},
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Mobile menu icon */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { md: 'none' }, color: 'text.primary' }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 