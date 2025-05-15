
"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// CardMedia is not used in the current version of the page, so it can be removed if not planned for future use.
// import CardMedia from '@mui/material/CardMedia'; 
import Button, { ButtonProps as MuiButtonProps } from '@mui/material/Button'; // Use Button directly
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';

import { Bookmark, ArrowRight, BookOpen, PenTool, FlaskConical, Timer, FileText, PlusCircle, Layers3, Lightbulb, ChevronLeft, ChevronRight as ChevronRightIcon, GraduationCap, FileQuestion, BookUser, FileStack } from 'lucide-react';
import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';

// Import local images
import itImage from '@/app/it.png';
import englishLitImage from '@/app/english_lit.png';
import socialSciImage from '@/app/social_sci.png';
import englishCommImage from '@/app/english_comm.png';
import mathImage from '@/app/maths.png';
import scienceImage from '@/app/science.png';
import hindiImage from '@/app/hindi.png';

import randomExamImage from '@/app/i1.png';
import customExamImage from '@/app/i2.png';
import timedExamImage from '@/app/i3.png';

import quotesData from '@/app/quotes.json';

// Define a basic Material 3 theme using experimental_extendTheme
const m3Theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#6750A4' }, // M3 Primary
        secondary: { main: '#625B71' }, // M3 Secondary
        tertiary: { main: '#7D5260' }, // M3 Tertiary
        background: {
          default: '#FFFBFE', // M3 Surface
          paper: '#FFFBFE',   // M3 Surface
        },
        text: {
          primary: '#1C1B1F',   // M3 On Surface
          secondary: '#49454F', // M3 On Surface Variant
        },
        error: { main: '#B3261E' }, // M3 Error
        primaryContainer: { main: '#EADDFF' }, // M3 Primary Container
        onPrimaryContainer: { main: '#21005D' }, // M3 On Primary Container
        secondaryContainer: { main: '#E8DEF8' }, // M3 Secondary Container
        onSecondaryContainer: { main: '#1D192B' }, // M3 On Secondary Container
        tertiaryContainer: { main: '#FFD8E4' },   // M3 Tertiary Container
        onTertiaryContainer: { main: '#31111D' }, // M3 On Tertiary Container
        surface: { // Explicitly defining surface colors for M3 like structure
            main: '#FFFBFE', // General surface
        },
        onSurface: {
            main: '#1C1B1F',
        },
      },
    },
    dark: {
      palette: {
        primary: { main: '#D0BCFF' }, // M3 Primary Dark
        secondary: { main: '#CCC2DC' }, // M3 Secondary Dark
        tertiary: { main: '#EFB8C8' }, // M3 Tertiary Dark
        background: {
          default: '#1C1B1F', // M3 Surface Dark
          paper: '#1C1B1F',   // M3 Surface Dark
        },
        text: {
          primary: '#E6E1E5',   // M3 On Surface Dark
          secondary: '#CAC4D0', // M3 On Surface Variant Dark
        },
        error: { main: '#F2B8B5' }, // M3 Error Dark
        primaryContainer: { main: '#4F378B' }, // M3 Primary Container Dark
        onPrimaryContainer: { main: '#EADDFF' }, // M3 On Primary Container Dark
        secondaryContainer: { main: '#4A4458' }, // M3 Secondary Container Dark
        onSecondaryContainer: { main: '#E8DEF8' }, // M3 On Secondary Container Dark
        tertiaryContainer: { main: '#633B48' },   // M3 Tertiary Container Dark
        onTertiaryContainer: { main: '#FFD8E4' }, // M3 On Tertiary Container Dark
        surface: {
            main: '#1C1B1F',
        },
        onSurface: {
            main: '#E6E1E5',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.8rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.2 },
    h2: { fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.3 },
    h3: { fontSize: '1.25rem', fontWeight: 600 },
    body1: { fontSize: '1rem' },
    button: {
        textTransform: 'none', 
    }
  },
  shape: {
    borderRadius: 16, 
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[1], 
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            boxShadow: theme.shadows[3], 
          },
           backgroundColor: theme.vars.palette.surface.main, // Use CSS var
        }),
      },
    },
    MuiButton: {
        defaultProps: {
            disableElevation: true,
        },
        styleOverrides: {
            root: ({ ownerState, theme }: { ownerState: MuiButtonProps, theme: any }) => ({
                borderRadius: '20px', 
                padding: '10px 24px',
                fontWeight: 500,
                ...(ownerState.variant === 'contained' && ownerState.color === 'primary' && {
                    backgroundColor: theme.vars.palette.primary.main,
                    color: theme.vars.palette.onPrimary.main,
                    '&:hover': {
                        backgroundColor: theme.vars.palette.primary.dark, // Example, or a state layer
                        boxShadow: theme.shadows[1],
                    }
                }),
                ...(ownerState.variant === 'filled' && { // This assumes 'filled' maps to a tonal button style
                    backgroundColor: theme.vars.palette.secondaryContainer.main,
                    color: theme.vars.palette.onSecondaryContainer.main,
                     '&:hover': {
                         // M3 hover often involves a state layer overlay.
                         // This is a simplified example:
                         backgroundColor: `rgba(${theme.vars.palette.onSecondaryContainer.mainChannel} / 0.08)`, 
                         boxShadow: theme.shadows[0], 
                    }
                }),
                ...(ownerState.variant === 'text' && {
                    padding: '10px 12px',
                }),
                ...(ownerState.variant === 'outlined' && {
                     padding: '10px 24px',
                })
            }),
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundColor: 'var(--mui-palette-background-paper)',
            }
        }
    }
  },
});

// Simplified Icon component for MUI SvgIcon
const MuiIcon = ({ component: Component, ...props }: { component: React.ElementType, [key: string]: any }) => (
    <SvgIcon component={Component} inheritViewBox {...props} />
);


const subjectsM3 = [
  { title: "Information Technology", imageUrl: itImage, dataAiHint: "technology computer" },
  { title: "English Literature", imageUrl: englishLitImage, dataAiHint: "english literature book" },
  { title: "Social Science", imageUrl: socialSciImage, dataAiHint: "social science globe" },
  { title: "Mathematics", imageUrl: mathImage, dataAiHint: "math formula" },
  { title: "Science", imageUrl: scienceImage, dataAiHint: "science atom" },
];

const learnWithItemsM3 = [
  { title: "Ask a doubt", icon: FileQuestion, href: "/ask-doubt", dataAiHint: "doubt question" },
  { title: "Revision Plan", icon: BookUser, href: "/study-plan", dataAiHint: "revision plan study" },
  { title: "Sketchpad", icon: PenTool, href: "/sketchpad", dataAiHint: "sketchpad draw" },
  { title: "PDF to Notes", icon: FileStack, href: "/pdf-to-notes", dataAiHint: "pdf notes" },
];

const mockExamsM3 = [
  { title: "Random exam", icon: Layers3, illustration: randomExamImage, dataAiHint: "random exam" },
  { title: "Custom exam", icon: PlusCircle, illustration: customExamImage, isNew: true, dataAiHint: "custom exam" },
  { title: "Timed exam", icon: Timer, illustration: timedExamImage, isNew: true, dataAiHint: "timed exam clock" },
];

export default function M3HomePageExperiment() {
  const [greeting, setGreeting] = useState("Good day");
  const [userName, setUserName] = useState("Rudransh");
  const [quote, setQuote] = useState({ text: "", author: "" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good morning");
      else if (hour < 18) setGreeting("Good afternoon");
      else setGreeting("Good evening");
    };
    updateGreeting();

    if (quotesData && quotesData.quotes && quotesData.quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
      setQuote({
        text: quotesData.quotes[randomIndex].quote,
        author: quotesData.quotes[randomIndex].author,
      });
    } else {
      setQuote({ text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" });
    }
  }, []);

  const scrollSubjects = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <CssVarsProvider theme={m3Theme}>
      <CssBaseline /> {/* Removed enableColorScheme */}
      {/* Simulate App Header and Sidebar (outside the scope of M3 page content) */}
      <Box sx={{ display: 'flex' }}>
        <Paper elevation={0} sx={{ width: 240, height: '100vh', p: 2, backgroundColor: 'background.default', borderRight: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>OpennMind (M3)</Typography>
          <Typography variant="body2" color="text.secondary">Sidebar Placeholder</Typography>
        </Paper>

        <Box component="main" sx={{ flexGrow: 1, p: 0, backgroundColor: 'background.default' }}>
          <Container maxWidth="xl" sx={{ py: 3, px: {xs: 2, sm:3} }}>
            {/* Header for the page content area */}
            <Paper elevation={1} sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'surface.main' }}>
              <Typography variant="h5">Dashboard (M3 Experiment)</Typography>
              <Button variant="contained" color="primary">Upgrade</Button>
            </Paper>

            {/* Greeting */}
            <Typography variant="h1" gutterBottom sx={{color: 'text.primary'}}>
              {greeting}, {userName}!
            </Typography>

            {/* Motivational Quote Card - M3 Filled Card Style */}
            <Card sx={{ mb: 4, backgroundColor: 'primaryContainer.main', color: 'onPrimaryContainer.main' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                    <MuiIcon component={Lightbulb} sx={{ mr: 1, fontSize: '1.5rem', color: 'inherit' }} />
                    <Typography variant="h6" component="div" sx={{color: 'inherit'}}>
                        Quote of the day
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 0.5, color: 'inherit' }}>
                  &ldquo;{quote.text}&rdquo;
                </Typography>
                <Typography variant="caption" display="block" sx={{color: 'inherit', opacity: 0.8}}>
                  - {quote.author}
                </Typography>
              </CardContent>
            </Card>

            {/* My Subjects Section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  <MuiIcon component={Bookmark} sx={{ color: 'primary.main' }} />
                  <Typography variant="h2" component="h2" sx={{ '&:hover': { color: 'inherit' } }}>
                    My subjects
                  </Typography>
                  <Link href="/all-subjects" passHref legacyBehavior>
                      <MuiIcon component={ChevronRightIcon} sx={{ '&:hover': { transform: 'translateX(3px)' }, transition: 'transform 0.2s' }} />
                  </Link>
                </Box>
                <Box>
                  <Button variant="text" size="small" onClick={() => scrollSubjects('left')} sx={{ mr: 1, borderRadius: '50%', minWidth: 'auto', p: '6px' }}>
                    <MuiIcon component={ChevronLeft} />
                  </Button>
                  <Button variant="text" size="small" onClick={() => scrollSubjects('right')} sx={{borderRadius: '50%', minWidth: 'auto', p: '6px' }}>
                    <MuiIcon component={ChevronRightIcon} />
                  </Button>
                </Box>
              </Box>
              <Box ref={scrollContainerRef} sx={{ display: 'flex', overflowX: 'auto', py:1, gap: '20px', '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
                {subjectsM3.map((subject, index) => (
                  <Card key={index} sx={{ minWidth: 220, height: 280, display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor: 'surface.main' }}>
                     <Box sx={{width: '100%', height: '100%', position: 'relative', borderRadius: 'inherit'}}>
                        <Image src={subject.imageUrl} alt={subject.title} layout="fill" objectFit="cover" data-ai-hint={subject.dataAiHint} style={{ borderRadius: 'inherit' }}/>
                     </Box>
                     <Box sx={{position: 'absolute', bottom: 0, left:0, right: 0, p:1.5, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', color: 'white', borderBottomLeftRadius: 'inherit', borderBottomRightRadius: 'inherit' }}>
                         <Typography variant='subtitle1' sx={{fontWeight: 'medium'}}>{subject.title}</Typography>
                     </Box>
                  </Card>
                ))}
              </Box>
            </Box>

            {/* Learn With Section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2}}>
                <MuiIcon component={GraduationCap} sx={{ color: 'primary.main' }}/>
                <Typography variant="h2" component="h2">Learn with OpennMind</Typography>
              </Box>
              <Grid container spacing={2.5}>
                {learnWithItemsM3.map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Link href={item.href} passHref style={{textDecoration: 'none'}}>
                        <Card sx={{ height: 140, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2.5, position: 'relative', overflow: 'hidden', backgroundColor: 'secondaryContainer.main', color: 'onSecondaryContainer.main' }}>
                          <Typography variant="h6" component="h3">{item.title}</Typography>
                          <MuiIcon component={item.icon} sx={{ fontSize: 50, position: 'absolute', right: -8, bottom: -8, opacity: 0.3, color: 'inherit' }} />
                        </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Mock Exams Section */}
            <Box sx={{ mb: 4 }}>
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2}}>
                    <MuiIcon component={FileText} sx={{ color: 'primary.main' }} />
                    <Typography variant="h2" component="h2">Mock Exams</Typography>
               </Box>
              <Grid container spacing={2.5}>
                {mockExamsM3.map((exam, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p:2, position: 'relative', backgroundColor: 'surface.main', color: 'onSurface.main' }}> 
                      <Box sx={{width: '80%', height: 120, position: 'relative', mb:1, borderRadius: '8px', overflow: 'hidden'}}>
                        <Image src={exam.illustration} alt={exam.title} layout="fill" objectFit="contain" data-ai-hint={exam.dataAiHint} />
                      </Box>
                      <MuiIcon component={exam.icon} sx={{ color: 'primary.main', fontSize: 28, mt:1, mb: 0.5 }} />
                      <Typography variant="h6" component="h3" sx={{textAlign: 'center', mb:2}}>{exam.title}</Typography>
                      {exam.isNew && <Box component="span" sx={{position: 'absolute', top: 12, right: 12, backgroundColor: 'tertiaryContainer.main', color: 'onTertiaryContainer.main', px:1.5, py:0.5, borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'medium'}}>New</Box>}
                       <Button variant="filled" fullWidth>Start Now</Button> 
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

