import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const benefits = [
  {
    title: 'Accurate and Up-to-Date',
    description: 'Visa Points Calculations based on latest immigration policies',
  },
  {
    title: 'Tailored Assessment',
    description: 'Eligibility Assessment customized for each country',
  },
  {
    title: 'Easy-to-Use Interface',
    description: 'Quick and intuitive results for your visa eligibility',
  },
  {
    title: 'Trusted Platform',
    description: 'Relied upon by thousands of aspiring immigrants',
  },
];

const Benefits = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {benefit.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {benefit.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Benefits; 