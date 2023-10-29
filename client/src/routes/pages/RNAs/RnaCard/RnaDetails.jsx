import GroupsIcon from '@mui/icons-material/Groups';
import {
	Card,
	CardActionArea,
	CardContent,
	Stack,
	Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressLabel } from '../../../../components/CircularProgressLabel/CircularProgressLabel';
import { getQuestionsForState } from '../../../../utils/cache/getQuestions';
import { getSavedAndCachedAnswersForState } from '../../../../utils/cache/getSavedAndCachedRnaAnswers';
import formatDate from '../../../../utils/formatDate';
import styles from './styles';

const RnaDetails = ({ rna }) => {
	const queryClient = useQueryClient();
	const [rnaAnswers, setRnaAnswers] = useState([]);
	const [questions, setQuestions] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getQuestionsForState(setQuestions);
		getSavedAndCachedAnswersForState(rna.id, queryClient, setRnaAnswers);
	}, []);

	return (
		<Card onClick={() => navigate(rna.id)} sx={styles.rnaDetails}>
			<CardActionArea>
				<CardContent sx={styles.progressCardContent}>
					<Stack direction='row' justifyContent='space-between'>
						<Stack spacing={1}>
							<Typography fontSize='x-large' fontWeight='bold'>
								{rna.location && `${rna.location} | `}
								{rna.communityName}
							</Typography>
							{/* <Typography>{`${rna.emergency} | ${rna.affectedHouseholds}`}</Typography> */}
							<Stack
								direction='row'
								spacing={1}
								alignItems='center'
							>
								<Typography variant='subtitle2'>{`${'Earthquake'} | ${'300'}`}</Typography>
								<GroupsIcon sx={{ fontSize: '24px' }} />
							</Stack>
							{/* TODO: get rna creator details in order to print name */}
							<Typography variant='caption' color='grey'>
								{`Created by ${rna.creatorId} on ${formatDate(
									rna.createdOn
								)}`}
							</Typography>
						</Stack>
						<CircularProgressLabel
							value={(rnaAnswers.length / questions.length) * 100}
							fontSize='small'
							size={60}
						/>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default RnaDetails;
