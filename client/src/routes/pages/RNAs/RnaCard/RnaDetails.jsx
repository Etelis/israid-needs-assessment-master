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
import Emergency from '../../../../enums/Emergency';

const RnaDetails = ({ rna }) => {
	const queryClient = useQueryClient();
	const [rnaAnswers, setRnaAnswers] = useState([]);
	const [questions, setQuestions] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getQuestionsForState(setQuestions);
		getSavedAndCachedAnswersForState(rna.id, queryClient, setRnaAnswers);
	}, []);

	if (!questions.length) {
		return null;
	}

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
							<Stack
								direction='row'
								spacing={1}
								alignItems='center'
							>
								<Typography variant='subtitle2'>{`${rna.emergencies
									.map((x) => Emergency[x])
									.join(', ')} | ${
									rna.affectedHouseholds
								}`}</Typography>
								<GroupsIcon sx={{ fontSize: '24px' }} />
							</Stack>
							<Typography variant='caption' color='grey'>
								{`Created by ${rna.creatorName} on ${formatDate(
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
