import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HeroBanner from './components/HeroBanner';
import Benefits from './components/Benefits';
import Features from './components/Features';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AustraliaPointsCalculator from './pages/AustraliaPointsCalculator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Inter Tight", sans-serif',
    h1: {
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: 4,
          paddingBottom: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  // For now, we'll just show the points calculator
  // In a real app, you'd use React Router for proper routing
  const showPointsCalculator = window.location.pathname.includes('australia-visa-point-calculator');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        {showPointsCalculator ? (
          <AustraliaPointsCalculator />
        ) : (
          <>
            <HeroBanner />
            <Benefits />
            <Features />
            <AboutUs />
            <Contact />
          </>
        )}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App; 