import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Container, IconButton, Stack, Toolbar } from '@mui/material';
import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import InternetStatusIcon from './InternetStatusIcon';
import { NavigationDrawer } from './NavigationDrawer';
import styles from './styles';
import { useNavbarButtonsContext } from './useNavbarButtonsContext';

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
						<Stack direction='row' spacing={3}>
							<img width={110} src='/Logo-Israaid.svg.png' />
							<InternetStatusIcon />
						</Stack>
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
