import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Card,
	Stack,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import SubQuestionCategory from './SubQuestionCategory';
import ProgressSummary from '../../../components/ProgressSummary';

const QuestionCategory = ({
	id,
	title,
	preview,
	totalQuestions,
	answeredQusetion,
	subCategories,
	iconSrc,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<Card sx={{ margin: '6px', borderRadius: '10px' }}>
			<Accordion expanded={isExpanded} onChange={toggleExpand}>
				<AccordionSummary>
					<Stack
						padding='6px'
						direction='row'
						alignItems='center'
						flexGrow={1}
						spacing={2}
					>
						<Avatar alt='John Doe' src={iconSrc} />
						<ProgressSummary
							ProgressDetails={
								<>
									<Typography variant='h6'>
										{title}
									</Typography>
									<Typography
										sx={{ color: 'Grey', mb: '5px' }}
										variant='caption'
									>
										{preview}
									</Typography>
								</>
							}
							currentProgress={answeredQusetion}
							maxProgress={totalQuestions}
						/>
					</Stack>
				</AccordionSummary>
				<AccordionDetails>
					{subCategories.map((x) => (
						<SubQuestionCategory
							title={x.name}
							categoryId={id}
							id={x.id}
							questions={x.questions}
							answers={x.answers}
							key={x.id}
						></SubQuestionCategory>
					))}
				</AccordionDetails>
			</Accordion>
		</Card>
	);
};

export default QuestionCategory;
