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
import { Link } from 'react-router-dom';
import { CircularProgressLabel } from '../../../../components/CircularProgressLabel/CircularProgressLabel';
import getQuestions from '../../../../utils/cache/getQuestions';
import getSavedAndCachedRnaAnswers from '../../../../utils/cache/getSavedAndCachedRnaAnswers';
import formatDate from '../../../../utils/formatDate';
import styles from './styles';

const RnaDetails = ({ rna }) => {
	const queryClient = useQueryClient();
	const [rnaAnswers, setRnaAnswers] = useState([]);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const getAnswers = async () => {
			const answers = await getSavedAndCachedRnaAnswers(
				rna.id,
				queryClient
			);

			setRnaAnswers(answers);
		};
		const fetchQuestions = async () => {
			const allQuestions = await getQuestions();

			setQuestions(allQuestions);
		};

		fetchQuestions();
		getAnswers();
	}, []);

	return (
		<Card sx={styles.defaultProgressCard}>
			<CardActionArea component={Link} to={rna.id}>
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
