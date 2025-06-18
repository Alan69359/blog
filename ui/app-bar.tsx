"use client"

import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  InputBase,
  Fab,
  Fade,
  Slide,
  useScrollTrigger
} from '@mui/material';
import {
  Search,
  KeyboardArrowUp
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import ThemeToggle from 'ui/tooltip';
import type { AppTheme } from 'lib/theme'; // Adjust path if necessary

const GlassAppBar = styled(AppBar)(({ theme }: { theme: AppTheme }) => ({
  '&&': {
    backdropFilter: 'blur(8px)',
    boxShadow: 'none',
    backgroundImage: 'none',
    backgroundColor: theme.vars.palette.appBar.background,
    color: theme.vars.palette.text.primary,
  }
}));
const NAVIGATION_PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Comment', path: '/comment' },
];

const SCROLL_TRIGGER_THRESHOLD = 100;

interface ScrollComponentProps {
  window?: () => Window;
  children?: React.ReactElement;
}

const SearchContainer = styled('div')(({ theme }: { theme: AppTheme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.text.primary, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
  },
  marginLeft: theme.spacing(2),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function HideAppbar({ children }: ScrollComponentProps) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

function BackToTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: SCROLL_TRIGGER_THRESHOLD,
  });

  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Fade in={trigger}>
      <Box role="presentation" sx={{ position: 'fixed', bottom: 80, right: 16, zIndex: 100 }}>
        <Fab size="small" aria-label="scroll back to top" color="primary" onClick={handleScrollToTop}>
          <KeyboardArrowUp />
        </Fab>
      </Box>
    </Fade>
  );
}

function SearchField() {
  return (
    <SearchContainer>
      <SearchIconWrapper><Search /></SearchIconWrapper>
      <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
    </SearchContainer>
  );
}

function DesktopNavigation() {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      {NAVIGATION_PAGES.map((page) => (
        <Button key={page.name} href={page.path} color="inherit" sx={{ my: 2, display: 'block' }}>
          {page.name}
        </Button>
      ))}
    </Box>
  );
}

// app bar of header
export function AppBar1() {
  return (
    <>
      <HideAppbar>
        <GlassAppBar position="fixed" elevation={0} color="inherit">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <DesktopNavigation />
              <ThemeToggle color="inherit" />
              <SearchField />
            </Toolbar>
          </Container>
        </GlassAppBar>
      </HideAppbar>
      <BackToTop />
    </>
  );
}