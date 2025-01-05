import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Who We Are
        </Typography>
        <Paper elevation={3} sx={{ p: 4, mt: 4, maxWidth: 800, mx: 'auto' }}>
          <Typography variant="body1" paragraph>
            We are a dedicated team of immigration and technology experts, committed to simplifying 
            the visa application process. Our platform ensures accuracy, transparency, and a seamless 
            user experience to help you achieve your global dreams.
          </Typography>
          <Typography variant="body1">
            With years of experience in immigration consulting and software development, we've created 
            a platform that combines expert knowledge with cutting-edge technology to provide you with 
            the most reliable visa eligibility assessment tools available.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutUs; 