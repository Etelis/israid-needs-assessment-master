import { createTheme } from '@mui/material';

export default () =>
  createTheme({
    colors: {
      selected: '#9BB068',
      selectedBorder: '#BDD42A',
      selectedText: 'white',
      utility: '#4B3425',
    },
    typography: {
      fontSize: 16,
    },
    shape: {
      borderRadius: 0,
    },
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: 'inherit',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'unset',
            backgroundColor: 'white',
            color: 'black',
            border: 'solid 1px lightgrey',
            borderRadius: '50px',
          },
          startIcon: {
            '& > *:first-child': {
              fontSize: 32,
            },
          },
          endIcon: {
            '& > *:first-child': {
              fontSize: 32,
            },
          },
        },
      },
    },
  });
