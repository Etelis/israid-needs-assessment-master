import { createTheme } from '@mui/material';

export default () =>
  createTheme({
    colors: {
      selectedText: 'white',
      utility: '#0A77FF',
    },
    typography: {
      fontSize: 16,
    },
    shape: {
      borderRadius: 0,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            height: '100vh',

            '& #root': {
              height: '100vh'
            }
          }
        }
      },
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
