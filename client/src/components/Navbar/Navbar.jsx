import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Container, IconButton, Stack, Toolbar } from '@mui/material';
import { useState } from 'react';
import { NavigationDrawer } from './NavigationDrawer';
import styles from './styles';
import { useNavbarButtonsContext } from './useNavbarButtonsContext';
import { useUser } from '../../contexts/UserContext';

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { navbarButtons } = useNavbarButtonsContext();
	const { user } = useUser();

	if (!user) {
		return null;
	}

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
								<MenuIcon />
							</IconButton>
						</Stack>
					</Toolbar>
				</Container>
			</AppBar>
			<Toolbar />
			<NavigationDrawer isOpen={isMenuOpen} setOpen={setIsMenuOpen} />
		</>
	);
};
