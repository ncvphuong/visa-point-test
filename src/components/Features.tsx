import React from 'react';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import PublicIcon from '@mui/icons-material/Public';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const features = [
  {
    icon: <CalculateIcon sx={{ fontSize: 40 }} />,
    title: 'Visa Points Calculator',
    description: 'Calculate your eligibility in minutes.',
  },
  {
    icon: <PublicIcon sx={{ fontSize: 40 }} />,
    title: 'Country-Specific Guidance',
    description: 'Detailed requirements for Australia, Canada, France, and New Zealand.',
  },
  {
    icon: <ListAltIcon sx={{ fontSize: 40 }} />,
    title: 'Step-by-Step Process',
    description: 'Guidance on how to proceed with your application.',
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
    title: 'Responsive Support',
    description: 'Get answers to your visa-related questions.',
  },
];

const Features = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          What We Offer
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features; 