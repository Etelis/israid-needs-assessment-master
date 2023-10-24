import { Card, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/ProgressBar';

const SubQuestionCategory = ({ id, categoryId, title, questions, answers }) => {
	const navigate = useNavigate();

	const navigateToQuestions = () => {
		navigate(`${categoryId}/${id}`);
	};

	return (
		<Card
			onClick={navigateToQuestions}
			style={{
				display: 'flex',
				flexDirection: 'row',
				padding: '8px',
				margin: '8px',
				alignItems: 'center',
				justifyContent: 'space-around',
			}}
		>
			<Stack sx={{ width: '60%' }}>
				<Typography variant='body2' fontWeight='bold'>
					{title}
				</Typography>
				<ProgressBar
					answeredQusetion={answers.length}
					totalQuestions={questions.length}
				/>
			</Stack>
			<Typography variant='button' sx={{ color: '#2AA63C' }}>
				{answers.length}/{questions.length}
			</Typography>
		</Card>
	);
};

export default SubQuestionCategory;
