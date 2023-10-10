import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { appbarContainerStyle } from './styles';

export const Navbar = () => (
  <>
    <AppBar>
      <Container maxWidth="xl" sx={appbarContainerStyle}>
        <Toolbar disableGutters>
          <img width={110} src="/Logo-Israaid.svg.png" />
        </Toolbar>
      </Container>
    </AppBar>
    <Toolbar />
  </>
)
