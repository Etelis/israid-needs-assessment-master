import CheckIcon from '@mui/icons-material/Check';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { IconButton, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import RnaDetails from './RnaDetails';
import styles from './styles';

const RnaCard = ({ rna, downloadHandler }) => {
	const [isLoading, setIsLoading] = useState(false);

	const onDownloadClick = async () => {
		setIsLoading(true);
		await downloadHandler();
		setIsLoading(false);
	};

	return (
		<Paper elevation={2} sx={styles.rnaCard(rna.isDownloaded)}>
			<Stack direction='row'>
				<RnaDetails rna={rna} />
				<IconButton
					disabled={isLoading}
					onClick={onDownloadClick}
					sx={styles.cardButtons}
				>
					{rna.isDownloaded ? (
						<CheckIcon />
					) : (
						<FileDownloadOutlinedIcon />
					)}
				</IconButton>
			</Stack>
		</Paper>
	);
};

export default RnaCard;
