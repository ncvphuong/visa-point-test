import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import { Fab } from '@mui/material';

interface Question {
  id: string;
  title: string;
  description: string;
  options: Array<{
    value: string;
    label: string;
    points: number;
  }>;
}

const questions: Question[] = [
  {
    id: 'visa',
    title: 'Visa Subclass',
    description: 'Which visa Subclass are you applying for?',
    options: [
      { value: '189', label: 'Skilled Independent (189)', points: 0 },
      { value: '190', label: 'Skilled Nominated (190)', points: 5 },
      { value: '491', label: 'Skilled Work Regional (491)', points: 15 },
    ],
  },
  {
    id: 'age',
    title: 'Age',
    description: 'Your age at the time of invitation to apply for the visa',
    options: [
      { value: '18-24', label: '18 to 24 years', points: 25 },
      { value: '25-32', label: '25 to 32 years', points: 30 },
      { value: '33-39', label: '33 to 39 years', points: 25 },
      { value: '40-44', label: '40 to 44 years', points: 15 },
      { value: '45-49', label: '45 to 49 years', points: 0 },
    ],
  },
  {
    id: 'english',
    title: 'English Language Ability',
    description: 'Your English language test results must not be more than 36 months old at the time of invitation',
    options: [
      { value: 'competent', label: 'Competent English', points: 0 },
      { value: 'proficient', label: 'Proficient English', points: 10 },
      { value: 'superior', label: 'Superior English', points: 20 },
    ],
  },
  {
    id: 'overseas_experience',
    title: 'Overseas Skilled Employment',
    description: 'Work experience gained outside Australia in your nominated skilled occupation or a closely related skilled occupation',
    options: [
      { value: '0-2', label: 'Less than 3 years', points: 0 },
      { value: '3-4', label: '3-4 years', points: 5 },
      { value: '5-7', label: '5-7 years', points: 10 },
      { value: '8+', label: '8+ years', points: 15 },
    ],
  },
  {
    id: 'australian_experience',
    title: 'Australian Skilled Employment',
    description: 'Work experience gained within Australia in your nominated skilled occupation or a closely related skilled occupation',
    options: [
      { value: '0', label: 'No experience', points: 0 },
      { value: '1-2', label: '1-2 years', points: 5 },
      { value: '3-4', label: '3-4 years', points: 10 },
      { value: '5-7', label: '5-7 years', points: 15 },
      { value: '8+', label: '8+ years', points: 20 },
    ],
  },
  {
    id: 'qualifications',
    title: 'Educational Qualifications',
    description: 'Your highest completed qualification recognized by the relevant assessing authority',
    options: [
      { value: 'phd', label: 'Doctorate from an Australian institution or other recognized institution', points: 20 },
      { value: 'bachelor', label: 'Bachelor degree or Masters degree from an Australian institution or other recognized institution', points: 15 },
      { value: 'diploma', label: 'Diploma or trade qualification completed in Australia', points: 10 },
      { value: 'other', label: 'Other qualification recognized by the relevant assessing authority', points: 10 },
    ],
  },
  {
    id: 'specialist_education',
    title: 'Specialist Education Qualification',
    description: 'Qualification in a STEM field, ICT, or other specialist area',
    options: [
      { value: 'no', label: 'No specialist education', points: 0 },
      { value: 'yes', label: 'Has specialist education qualification', points: 10 },
    ],
  },
  {
    id: 'australian_study',
    title: 'Australian Study Requirement',
    description: 'At least 2 academic years of study in Australia meeting the Australian Study Requirement',
    options: [
      { value: 'no', label: 'Does not meet requirement', points: 0 },
      { value: 'yes', label: 'Meets requirement', points: 5 },
    ],
  },
  {
    id: 'professional_year',
    title: 'Professional Year in Australia',
    description: 'Completion of a Professional Year program in Australia',
    options: [
      { value: 'no', label: 'No Professional Year completed', points: 0 },
      { value: 'yes', label: 'Completed Professional Year', points: 5 },
    ],
  },
  {
    id: 'credentialed_language',
    title: 'Credentialed Community Language',
    description: 'NAATI certification at the Certified Provisional level or higher',
    options: [
      { value: 'no', label: 'No NAATI certification', points: 0 },
      { value: 'yes', label: 'Has NAATI certification', points: 5 },
    ],
  },
  {
    id: 'regional_study',
    title: 'Study in Regional Australia',
    description: 'Study completed in a designated regional area of Australia',
    options: [
      { value: 'no', label: 'No regional study', points: 0 },
      { value: 'yes', label: 'Completed study in regional Australia', points: 5 },
    ],
  },
  {
    id: 'partner_skills',
    title: 'Partner Skills',
    description: 'Points that can be claimed based on your partner\'s skills and qualifications',
    options: [
      { value: 'skilled', label: 'Partner meets age, English and skill requirements', points: 10 },
      { value: 'competent_english', label: 'Partner has at least competent English', points: 5 },
      { value: 'none', label: 'Single or partner is an Australian citizen/PR', points: 10 },
      { value: 'no_points', label: 'Cannot claim partner points', points: 0 },
    ],
  },
];

const AustraliaPointsCalculator = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  useEffect(() => {
    // Calculate total points whenever answers change
    const points = questions.reduce((total, question) => {
      const selectedOption = question.options.find(opt => opt.value === answers[question.id]);
      return total + (selectedOption?.points || 0);
    }, 0);
    setTotalPoints(points);
  }, [answers]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const pointsSummaryContent = (
    <Box sx={{ p: 1.5 }}>
      <Box sx={{ 
        p: 1.5, 
        bgcolor: 'primary.main', 
        color: 'white', 
        borderRadius: 1,
        textAlign: 'center',
        mb: 2,
      }}>
        <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
          Total Points: {totalPoints}
        </Typography>
      </Box>
      <List sx={{ 
        py: 0,
        '& .MuiListItem-root': { 
          py: 0.25,
          minHeight: 36,
          '&:hover': {
            bgcolor: 'rgba(25, 118, 210, 0.08)',
          },
        },
        '& .MuiTypography-root': {
          fontSize: '0.85rem',
          lineHeight: 1.2,
        },
        '& .MuiTypography-secondary': {
          fontSize: '0.75rem',
          marginTop: '2px',
        },
        '& .MuiListItemText-root': {
          margin: 0,
        },
      }}>
        {questions.map((question) => {
          const selectedOption = question.options.find(opt => opt.value === answers[question.id]);
          return (
            <ListItem 
              key={question.id} 
              button 
              onClick={() => {
                const element = document.getElementById(question.id);
                element?.scrollIntoView({ behavior: 'smooth' });
                if (isMobile) handleDrawerToggle();
              }}
              selected={answers[question.id] !== undefined}
            >
              <ListItemText
                primary={question.title}
                secondary={`${selectedOption?.points || 0} points`}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: answers[question.id] !== undefined ? 500 : 400,
                }}
                secondaryTypographyProps={{
                  color: selectedOption?.points ? 'primary' : 'text.secondary',
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const handleSaveResult = () => {
    // TODO: Implement save functionality
    console.log('Saving result:', { answers, totalPoints });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 9, mb: 3 }}>
      <Grid container spacing={2}>
        {/* Title */}
        <Grid item xs={12}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2,
          }}>
            <Typography variant="h1">Australia Visa Points Calculator</Typography>
            {isMobile && (
              <Button
                startIcon={<MenuIcon />}
                onClick={handleDrawerToggle}
                variant="contained"
              >
                Points Summary
              </Button>
            )}
          </Box>
        </Grid>

        {/* Desktop left menu */}
        {!isMobile && (
          <Grid item md={2.5}>
            <Paper 
              elevation={3}
              sx={{ 
                position: 'sticky', 
                top: 80, 
                maxHeight: 'calc(100vh - 100px)', 
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '2px',
                },
              }}
            >
              {pointsSummaryContent}
            </Paper>
          </Grid>
        )}

        {/* Questions */}
        <Grid item xs={12} md={9.5}>
          {questions.map((question) => (
            <Paper 
              key={question.id} 
              id={question.id} 
              elevation={3}
              sx={{ p: 3, mb: 3 }}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <Typography variant="h6" gutterBottom>
                    {question.title}
                  </Typography>
                </FormLabel>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {question.description}
                </Typography>
                <RadioGroup
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                >
                  {question.options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body1">
                            {option.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {option.points} points
                          </Typography>
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Paper>
          ))}
        </Grid>
      </Grid>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        }}
      >
        {pointsSummaryContent}
      </Drawer>

      {/* Floating Save Button */}
      <Fab
        variant="extended"
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          px: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
        onClick={handleSaveResult}
      >
        <SaveIcon sx={{ mr: 1 }} />
        Save Result
      </Fab>
    </Container>
  );
};

export default AustraliaPointsCalculator; 