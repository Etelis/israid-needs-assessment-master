import ExcelIcon from '@mui/icons-material/BackupTable';
import DownloadIcon from '@mui/icons-material/Description';
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { useState } from 'react';
import { toast } from 'react-toastify';
import getRnaExcel from '../../utils/online/exportExcelQuery';
import useOnlineStatus from '../../utils/useOnlineStatus';
import styles from './styles';

const DownloadRnaFileMenuButton = ({ rnaId }) => {
	const isOnline = useOnlineStatus();
	const [isLoading, setIsLoading] = useState(false);

	const downloadAsExcel = async (popupState) => {
		try {
			setIsLoading(true);

			await getRnaExcel(rnaId);

			popupState.close();
		} catch (e) {
			const errorMessage = 'Something went wrong exporting excel';

			toast.error(errorMessage, { toastId: errorMessage });
		} finally {
			setIsLoading(false);
		}
	};

	return !isOnline ? null : (
		<PopupState variant='popover' popupId='demo-popup-menu'>
			{(popupState) => (
				<Box>
					<IconButton
						variant='contained'
						{...bindTrigger(popupState)}
					>
						<DownloadIcon />
					</IconButton>
					<Menu {...bindMenu(popupState)}>
						<MenuItem>
							<Button
								disabled={isLoading}
								sx={styles.menuButton}
								onClick={() => downloadAsExcel(popupState)}
								startIcon={<ExcelIcon fontSize='small' />}
							>
								Download As Excel
							</Button>
						</MenuItem>
					</Menu>
				</Box>
			)}
		</PopupState>
	);
};

export default DownloadRnaFileMenuButton;
