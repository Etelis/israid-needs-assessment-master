import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { Tooltip } from '@mui/material';
import useOnlineStatus from '../../utils/useOnlineStatus';

const InternetStatusIcon = () => {
	const isOnline = useOnlineStatus();

	return isOnline ? (
		<Tooltip title='Online' arrow>
			<WifiIcon color='primary' sx={{ fontSize: '24px' }} />
		</Tooltip>
	) : (
		<Tooltip title='Offline' arrow>
			<WifiOffIcon color='disabled' sx={{ fontSize: '24px' }} />
		</Tooltip>
	);
};

export default InternetStatusIcon;
