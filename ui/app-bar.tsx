"use client"

import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Button,
  InputBase,
  Fab,
  Fade,
  Slide,
  useScrollTrigger
} from '@mui/material';
import {
  Menu,
  Adb,
  Search,
  KeyboardArrowUp
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import ThemeToggle from '@/ui/tooltip';

const NAVIGATION_PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Meme', path: '/meme' },
  { name: 'Comment', path: '/comment' },
];

const SCROLL_TRIGGER_THRESHOLD = 100;

interface ScrollComponentProps {
  window?: () => Window;
  children?: React.ReactElement;
}

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
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

  const handleScrollToTop = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Fade in={trigger}>
      {/*
        The <Box> is now purely for positioning.
        The onClick handler is moved to the <Fab> component where it belongs.
      */}
      <Box
        role="presentation"
        sx={{ position: 'fixed', bottom: 80, right: 16, zIndex: 100 }}
      >
        <Fab
          size="small"
          aria-label="scroll back to top"
          color="primary"
          onClick={handleScrollToTop} // <<< The onClick handler is now here
        >
          <KeyboardArrowUp />
        </Fab>
      </Box>
    </Fade>
  );
}

// Search Component
function SearchField() {
  return (
    <SearchContainer>
      <SearchIconWrapper>
        <Search />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </SearchContainer>
  );
}

// Navigation Components
function MobileNavigation({ onMenuOpen }: { onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={onMenuOpen}
        color="inherit"
      >
        <Menu />
      </IconButton>
    </Box>
  );
}

function DesktopNavigation({ onMenuClose }: { onMenuClose: () => void }) {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {NAVIGATION_PAGES.map((page) => (
        <Button
          key={page.name}
          href={page.path}
          onClick={onMenuClose}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          {page.name}
        </Button>
      ))}
    </Box>
  );
}

// header
export function AppBar1() {
  const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <div
        id="back-to-top-anchor"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          visibility: 'hidden'
        }}
      />

      <HideAppbar>
        <AppBar
          position="sticky"
          elevation={0} // Keep the flat look
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // A bit of dark background for readability
            backdropFilter: 'blur(8px)', // The glass effect
          }}
        >
          {/* Container and Toolbar are correctly used to align content */}
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* ... All your Toolbar children are fine */}
              <Adb sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <MobileNavigation onMenuOpen={handleOpenNavMenu} />
              <DesktopNavigation onMenuClose={handleCloseNavMenu} />
              <ThemeToggle />
              <SearchField />
            </Toolbar>
          </Container>
        </AppBar>
      </HideAppbar>

      <BackToTop/>
    </>
  );
}