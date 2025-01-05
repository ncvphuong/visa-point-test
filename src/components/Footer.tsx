import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" color="inherit" sx={{ mb: 1 }}>
                Australia Visa
              </Link>
              <Link href="#" color="inherit" sx={{ mb: 1 }}>
                Canada Visa
              </Link>
              <Link href="#" color="inherit" sx={{ mb: 1 }}>
                France Visa
              </Link>
              <Link href="#" color="inherit" sx={{ mb: 1 }}>
                New Zealand Visa
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" color="inherit" sx={{ mb: 1 }}>
                About Us
              </Link>
              <Link href="#" color="inherit" sx={{ mb: 1 }}>
                Contact
              </Link>
              <Link href="#" color="inherit" sx={{ mb: 1 }}>
                FAQ
              </Link>
              <Link href="#" color="inherit" sx={{ mb: 1 }}>
                Blog
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" color="inherit" sx={{ mb: 1 }}>
                Terms of Service
              </Link>
              <Link href="#" color="inherit" sx={{ mb: 1 }}>
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" sx={{ mb: 1 }}>
                Cookie Policy
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Typography variant="body2">
              Stay updated with the latest immigration news and updates.
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} VisaPointsApp. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 