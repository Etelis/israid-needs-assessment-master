import { Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProgressSummary from '../../../components/ProgressSummary';

const SubQuestionCategory = ({ id, categoryId, title, questions, answers }) => {
	const navigate = useNavigate();

	const navigateToQuestions = () => {
		navigate(`${categoryId}/${id}`);
	};

	return (
		<Card
			onClick={navigateToQuestions}
			style={{
				padding: '16px',
				margin: '8px',
				borderRadius: '10px',
			}}
		>
			<ProgressSummary
				ProgressDetails={
					<Typography
						variant='h6'
						fontWeight='bold'
						fontSize='18px'
						sx={{ mb: '6px' }}
					>
						{title}
					</Typography>
				}
				currentProgress={answers.length}
				maxProgress={questions.length}
			/>
		</Card>
	);
};

export default SubQuestionCategory;
