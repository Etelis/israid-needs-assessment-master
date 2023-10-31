import {
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CloudSync from '@mui/icons-material/CloudSync';
import AnalyticsIcon from '@mui/icons-material/AnalyticsOutlined';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import InfoIcon from '@mui/icons-material/Info';
import RNAList from '@mui/icons-material/ListAlt';
import ListItemLink from './ListItemLink';
import styles from './styles';
import userPool from '../../../../cognito-config';
import { useUser } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router';

const NavigationDrawer = ({ isOpen, setOpen }) => {
	const navigate = useNavigate();
	const { user, setUser } = useUser();

	const handleLogout = () => {
		if (user) {
			userPool.getCurrentUser().signOut();
			setUser(null);
			setOpen(false);
			navigate('/login');
		}
	};

	return (
		<Drawer sx={styles.drawer} open={isOpen} onClose={() => setOpen(false)}>
			<Toolbar />
			<List sx={styles.navList}>
				<ListItemLink
					onClick={() => setOpen(false)}
					to='/RNAs'
					primary='View RNAs'
					icon={<RNAList />}
				/>
				<Divider />
				{/* <ListItemLink
					to='/'
					primary='Insights'
					icon={<AnalyticsIcon />}
				/>
				<Divider />
				<ListItemLink
					to='/'
					primary='Ask Me Anything'
					icon={<QuestionMarkIcon />}
				/>
				<Divider /> */}
				{user && (
					<ListItemLink
						onClick={() => setOpen(false)}
						to='/update-personal-details'
						primary='Personal Details'
						icon={<InfoIcon />}
					/>
				)}
				<Divider />
				{/* <ListItemLink
					to='/'
					primary='Edit Questions'
					icon={<EditLocationAltOutlinedIcon />}
				/> */}
				{/* <Divider />
				<ListItemLink
					to='/'
					primary='Manage Users'
					icon={<ManageAccountsIcon />}
				/> */}
				{/* <Divider /> */}
				<ListItemLink
					onClick={() => setOpen(false)}
					to='/Synchronization'
					primary='Synchronize My Data'
					icon={<CloudSync />}
				/>
				<Divider />
				{user && (
					<ListItem key='logout' onClick={handleLogout}>
						<ListItemIcon sx={styles.navigationIcon}>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary='Logout' />
					</ListItem>
				)}
			</List>
		</Drawer>
	);
};

export default NavigationDrawer;
