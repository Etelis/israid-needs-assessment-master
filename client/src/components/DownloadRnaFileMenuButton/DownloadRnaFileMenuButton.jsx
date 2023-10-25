import ExcelIcon from '@mui/icons-material/BackupTable';
import PdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Description';import {
	Box,
	Button,
	Divider,
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { useParams } from 'react-router-dom';
import useOnlineStatus from '../../utils/useOnlineStatus';
import styles from './styles';
import { useState } from 'react';

const DownloadRnaFileMenuButton = () => {
	const isOnline = useOnlineStatus();
	const [isLoading, setIsLoading] = useState(false);
	const { rnaId } = useParams();

	//TODO: call download api for each button with the given rnaId
	const downloadAsPdf = async (popupState) => {
		setIsLoading(true);

		setIsLoading(false);
		popupState.close();
	};

	const downloadAsExcel = async (popupState) => {
		setIsLoading(true);

		setIsLoading(false);
		popupState.close();
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
								onClick={() => downloadAsPdf(popupState)}
								startIcon={<PdfIcon fontSize='small' />}
							>
								Download As Pdf
							</Button>
						</MenuItem>
						<Divider />
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
