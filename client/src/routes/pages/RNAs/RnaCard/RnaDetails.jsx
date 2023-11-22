import GroupsIcon from '@mui/icons-material/Groups';
import {
	Card,
	CardActionArea,
	CardContent,
	Stack,
	Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Emergency from '../../../../enums/Emergency';
import formatDate from '../../../../utils/formatDate';
import styles from './styles';

const RnaDetails = ({ rna }) => {
	const navigate = useNavigate();

	const notifyEditUnavailable = () => {
		const editUnavailableMessage = "Download locally to edit this RNA";

		toast.info(editUnavailableMessage, {
			toastId: editUnavailableMessage,
			autoClose: 1500,
		});
	};

	return (
		<Card
			onClick={() =>
				rna.isDownloaded ? navigate(rna.id) : notifyEditUnavailable()
			}
			sx={styles.rnaDetails}
		>
			<CardActionArea>
				<CardContent>
					<Stack spacing={0.1}>
						<Typography fontSize='22px' fontWeight='bold'>
							{`${rna.communityName} ${rna.communityType}`}
						</Typography>
						{rna.location && (
							<Typography fontSize='22px' fontWeight='bold'>
								{rna.location}
							</Typography>
						)}
						<Typography variant='subtitle2'>
							{rna.emergencies
								.map((x) => Emergency[x])
								.join(', ')}
						</Typography>
						<Stack
							direction='row'
							spacing={1}
							alignItems='center'
							justifyContent='center'
						>
							<Typography variant='subtitle2'>
								{rna.affectedHouseholds}
							</Typography>
							<GroupsIcon sx={{ fontSize: '28px' }} />
						</Stack>
						<Typography variant='caption' color='grey'>
							Author: {rna.creatorName}
						</Typography>
						<Typography variant='caption' color='grey'>
							Created: {formatDate(rna.createdOn)}
						</Typography>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default RnaDetails;
