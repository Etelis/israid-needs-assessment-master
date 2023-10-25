import {Toolbar, Container, AppBar, IconButton} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import userPool from "../../../cognito-config";
import { useUser } from "../../contexts/UserContext";
import { appbarContainerStyle } from "./styles";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Container, IconButton, Stack, Toolbar } from '@mui/material';
import { useState } from 'react';
import BreadcrumbsComponent from '../Breadcrumb';
import { NavigationDrawer } from './NavigationDrawer';
import styles from './styles';
import { useNavbarButtonsContext } from './useNavbarButtonsContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { navbarButtons } = useNavbarButtonsContext();

  const handleLogout = () => {
    if (user) {
      userPool.getCurrentUser().signOut();
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <>
      <AppBar>
				<Container maxWidth='xl' sx={styles.appbarContainerStyle}>
					<Toolbar sx={styles.toolbar} disableGutters>
						<img width={110} src='/Logo-Israaid.svg.png' />
						<Stack direction='row' spacing={1}>
							{navbarButtons}
							<IconButton
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
            {user && (
              <IconButton onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            )}
								<MenuIcon />
							</IconButton>
						</Stack>
					</Toolbar>
				</Container>
			</AppBar>
			<Toolbar />
			<NavigationDrawer isOpen={isMenuOpen} setOpen={setIsMenuOpen} />
			<BreadcrumbsComponent />
		</>
	);
};
