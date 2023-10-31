import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './styles';

const ListItemLink = ({ icon, primary, to, onClick }) => {
	return (
		<NavLink onClick={onClick} to={to} style={styles.navLink}>
			<ListItem key={primary}>
				<ListItemIcon sx={styles.navigationIcon}>{icon}</ListItemIcon>
				<ListItemText primary={primary} />
			</ListItem>
		</NavLink>
	);
};

export default ListItemLink;
