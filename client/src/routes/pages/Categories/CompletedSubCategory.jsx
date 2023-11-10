import NextIcon from '@mui/icons-material/EastOutlined';
import PrevoiusIcon from '@mui/icons-material/ArrowBackIosNew';
import CategoriesIcon from '@mui/icons-material/WidgetsOutlined';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgressLabel } from '../../../components/CircularProgressLabel/CircularProgressLabel';
import styles from './styles';

const CompletedSubCategory = ({
	completedSubCategory,
	nextSubCategory,
	returnToQuestions,
}) => {
	const { rnaId, categoryId } = useParams();
	const navigate = useNavigate();

	return (
		<Stack
			height='85vh'
			spacing={2}
			paddingBottom={2}
			alignItems='center'
			justifyContent='space-between'
		>
			<Stack spacing={3} alignItems='center'>
				<Stack spacing={0.2}>
					<Typography fontSize='34px' fontWeight='bold'>
						{completedSubCategory.name}
					</Typography>
					<Typography fontSize='34px' fontWeight='bold'>
						- Completed -
					</Typography>
				</Stack>
				<CircularProgressLabel
					value={100}
					size={200}
					fontSize='xx-large'
					sx={(theme) => ({ color: theme.colors.utility })}
				/>
			</Stack>
			<Typography fontSize='32px' fontWeight='bold'>
				Good job! You have completed this section.
			</Typography>
			<Stack width='80%' spacing={2}>
				<Button
					disabled={!nextSubCategory}
					endIcon={<NextIcon />}
					onClick={() =>
						navigate(
							`/RNAs/${rnaId}/${categoryId}/${nextSubCategory.id}`
						)
					}
					sx={(theme) => styles.nextButton(theme)}
				>
					{nextSubCategory ? 'Next Sub Category' : 'All Done'}
				</Button>
				<Button
					variant='outlined'
					startIcon={<PrevoiusIcon />}
					onClick={returnToQuestions}
					sx={styles.prevButton}
				>
					Return To Questions
				</Button>
				<Button
					variant='outlined'
					startIcon={<CategoriesIcon />}
					onClick={() => navigate(`/RNAs/${rnaId}`)}
				>
					Show all categories
				</Button>
			</Stack>
		</Stack>
	);
};

export default CompletedSubCategory;
