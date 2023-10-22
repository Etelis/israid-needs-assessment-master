import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Container, IconButton, Toolbar } from '@mui/material';
import { useState } from 'react';
import BreadcrumbsComponent from '../Breadcrumb';
import { NavigationDrawer } from './NavigationDrawer';
import styles from './styles';

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<AppBar>
				<Container maxWidth='xl' sx={styles.appbarContainerStyle}>
					<Toolbar sx={styles.toolbar} disableGutters>
						<IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
							<MenuIcon />
						</IconButton>
						<img width={110} src='/Logo-Israaid.svg.png' />
					</Toolbar>
				</Container>
			</AppBar>
			<Toolbar />
			<NavigationDrawer isOpen={isMenuOpen} setOpen={setIsMenuOpen} />
			<BreadcrumbsComponent />
		</>
	);
};
