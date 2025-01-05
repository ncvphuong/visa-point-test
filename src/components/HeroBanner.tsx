import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroBox = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/hero-bg.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center',
  marginTop: '64px', // Height of navbar
  [theme.breakpoints.down('sm')]: {
    marginTop: '56px', // Height of mobile navbar
  },
}));

const HeroBanner = () => {
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <HeroBox>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', py: { xs: 4, md: 8 } }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '3.75rem' },
              fontWeight: 700,
            }}
          >
            Simplify Your Path to Global Opportunities
          </Typography>
          <Typography 
            variant="h5" 
            paragraph
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              mb: 4,
            }}
          >
            Easily calculate your visa eligibility for Australia, Canada, France, and New Zealand.
          </Typography>
          <Box sx={{ 
            mt: 4, 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => handleNavigation('/australia-visa-point-calculator')}
              sx={{ 
                minWidth: { xs: '100%', sm: 'auto' },
                mb: { xs: 2, sm: 0 }
              }}
            >
              Check Australia Visa Points
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => handleNavigation('/canada-points')}
              sx={{ 
                minWidth: { xs: '100%', sm: 'auto' },
                mb: { xs: 2, sm: 0 }
              }}
            >
              Explore Canada Visa Options
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => handleNavigation('/france-points')}
              sx={{ 
                minWidth: { xs: '100%', sm: 'auto' },
                mb: { xs: 2, sm: 0 }
              }}
            >
              Learn About France Visas
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => handleNavigation('/new-zealand-points')}
              sx={{ 
                minWidth: { xs: '100%', sm: 'auto' }
              }}
            >
              Discover New Zealand Visas
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => window.location.href = '/australia-visa-point-calculator'}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 500,
                textTransform: 'none',
              }}
            >
              Calculate Points Now
            </Button>
          </Box>
        </Box>
      </Container>
    </HeroBox>
  );
};

export default HeroBanner; 