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
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SharedAuthModal } from './SharedAuthModal';
import { supabase } from '../lib/supabase';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Australia', path: '/australia-visa-point-calculator' },
  { label: 'Canada', path: '/canada-points' },
  { label: 'France', path: '/france-points' },
  { label: 'New Zealand', path: '/new-zealand-points' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  const handleAuthSuccess = (userData: { id: string; email: string; user_metadata: any }) => {
    setUser(userData);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    handleMenuClose();
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          button 
          key={item.label}
          onClick={() => handleNavigation(item.path)}
        >
          <ListItemText primary={item.label} />
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
              sx={{ color: 'text.primary' }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Auth Button */}
        <Box sx={{ ml: 2 }}>
          {user ? (
            <>
              <Button
                onClick={handleMenuClick}
                startIcon={<AccountCircleIcon />}
                sx={{ textTransform: 'none' }}
              >
                Welcome, {user.user_metadata.full_name || 'User'}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={() => setShowAuthModal(true)}
              sx={{ textTransform: 'none' }}
            >
              Sign In
            </Button>
          )}
        </Box>

        {/* Mobile menu icon */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { md: 'none' }, color: 'text.primary', ml: 1 }}
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

      {/* Auth Modal */}
      <SharedAuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </AppBar>
  );
};

export default Navbar; 