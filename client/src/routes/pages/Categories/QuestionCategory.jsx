import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Card,
	Stack,
	Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import ProgressSummary from '../../../components/ProgressSummary';
import SubQuestionCategory from './SubQuestionCategory';
import { useBreadcrumbsContext } from './context/useBreadcrumbsContext';
import { useEffect } from 'react';

const QuestionCategory = ({ category, isExpanded, setExpanded }) => {
	const { addBreadcrumb, removeBreadcrumb } = useBreadcrumbsContext();
	const { pathname } = useLocation();

	useEffect(() => {
		if (isExpanded) {
			addBreadcrumb({ text: category.name, routeTo: pathname });
		} else {
			removeBreadcrumb(category.name);
		}
	}, [isExpanded]);

	const toggleExpand = (_, isCurrentlyExpanded) => {
		if (isCurrentlyExpanded) {
			setExpanded(category.name);
		} else {
			setExpanded('');
		}
	};

	return (
		<Card
			sx={{
				margin: '6px',
				borderRadius: '10px',
				border: '1px solid rgba(0, 0, 0, 0.4)',
			}}
		>
			<Accordion expanded={isExpanded} onChange={toggleExpand}>
				<AccordionSummary>
					<Stack
						padding='6px'
						direction='row'
						alignItems='center'
						flexGrow={1}
						spacing={2}
					>
						<Avatar
							alt='John Doe'
							src={`data:image/png;base64,${category.iconSrc}`}
						/>
						<ProgressSummary
							ProgressDetails={
								<>
									<Typography variant='h6'>
										{category.name}
									</Typography>
									<Typography
										sx={{ color: 'Grey', mb: '5px' }}
										variant='caption'
									>
										{category.description}
									</Typography>
								</>
							}
							currentProgress={category.answeredQuestionAmount}
							maxProgress={category.totalQuestionAmount}
						/>
					</Stack>
				</AccordionSummary>
				<AccordionDetails>
					{category.subCategories.map((x) => (
						<SubQuestionCategory
							title={x.name}
							categoryId={category.id}
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
