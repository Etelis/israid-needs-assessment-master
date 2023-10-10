import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import createTheme from './create-theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme();

export const ThemeProvider = ({children}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      {children}
    </MuiThemeProvider>
  )
}
