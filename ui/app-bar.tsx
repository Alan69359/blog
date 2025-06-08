"use client"

import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Button,
  Typography,
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
import ThemeToggle from '@/components/tooltip';

// Constants
const NAVIGATION_PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Comment', path: '/comment' },
];

const SCROLL_TRIGGER_THRESHOLD = 100;

// Types
interface ScrollComponentProps {
  window?: () => Window;
  children?: React.ReactElement;
}

// Styled Components
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

// Utility Components
function HideAppbar({ children }: ScrollComponentProps) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

function BackToTop({ window: windowProp }: ScrollComponentProps) {
  const trigger = useScrollTrigger({
    target: windowProp ? windowProp() : undefined,
    disableHysteresis: true,
    threshold: SCROLL_TRIGGER_THRESHOLD,
  });

  const handleScrollToTop = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('Scroll to top clicked!'); // Debug log

    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      console.log('Window is undefined');
      return;
    }

    // Simple, direct scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Fade in={trigger}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 80, // Moved higher above footer
          right: 16,
          zIndex: 9999, // Very high z-index
          pointerEvents: 'auto', // Ensure pointer events work
        }}
      >
        <Fab
          size="small"
          color="primary"
          aria-label="scroll back to top"
          onClick={handleScrollToTop}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.1)',
            },
            // Force visibility and interaction
            pointerEvents: 'auto',
            zIndex: 9999,
          }}
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
      {/* Move anchor to be more accessible */}
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
          position="fixed"
          sx={{
            backgroundColor: 'transparent',
            elevation: 0,
            zIndex: 2
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Adb sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

              <MobileNavigation onMenuOpen={handleOpenNavMenu} />
              <DesktopNavigation onMenuClose={handleCloseNavMenu} />

              <ThemeToggle />
              <SearchField />
            </Toolbar>
          </Container>
        </AppBar>
      </HideAppbar>

      <BackToTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </>
  );
}

// footer
export function AppBar2() {
  return (
    <AppBar position="static" color="transparent" sx={{ mt: 'auto', zIndex:2 }}>
      <Toolbar>
        <Typography sx={{ textAlign: 'center', width: '100%' }}>
          © 2025 Alan69359. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
