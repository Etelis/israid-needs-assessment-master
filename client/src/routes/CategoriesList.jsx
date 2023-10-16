import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProgressOverview from '../components/ProgressOverview';
import QuestionCategory from '../components/QuestionCategory';
import { useCategoriesContext } from '../context/useCategoriesContext';
import categories from '../static-data/categories.json';
import subCategories from '../static-data/sub-categories.json';

const useViewCategories = (
	rnaAnswers,
	getQuestionsForSubCategory,
	getAnswersForSubCategory
) => {
	const viewSubCategories = subCategories.map((x) => {
		return {
			...x,
			questions: getQuestionsForSubCategory(x.id),
			answers: getAnswersForSubCategory(x.id, rnaAnswers),
		};
	});

	return categories.map((x) => {
		const categorySubCategories = viewSubCategories.filter(
			(y) => x.id === y.categoryId
		);

		return {
			...x,
			subCategories: categorySubCategories,
			totalQuestionAmount: categorySubCategories.reduce(
				(amount, x) => amount + x.questions.length,
				0
			),
			answeredQuestionAmount: categorySubCategories.reduce(
				(amount, x) => amount + x.answers.length,
				0
			),
		};
	});
};

const CategoriesList = () => {
	const { rnaId } = useParams();
	const {
		fetchAnswers,
		answers,
		questions,
		getQuestionsForSubCategory,
		getAnswersForSubCategory,
	} = useCategoriesContext();

	useEffect(() => {
		fetchAnswers(rnaId);
	}, [rnaId]);

	const viewCategories = useViewCategories(
		answers,
		getQuestionsForSubCategory,
		getAnswersForSubCategory
	);

	return (
		<Box>
			<ProgressOverview
				leftColumnAmount={Math.floor(
					(answers.length / questions.length) * 100
				)}
				leftColumnCaption={'Form Completed'}
				rightColumnAmount={answers.length}
				rightColumnCaption={'Questions Answered'}
			/>
			{viewCategories?.map((x, index) => (
				<QuestionCategory
					key={index}
					title={x.name}
					preview={x.description}
					id={x.id}
					iconSrc={x.iconSrc}
					totalQuestions={x.totalQuestionAmount}
					answeredQusetion={x.answeredQuestionAmount}
					subCategories={x.subCategories}
				></QuestionCategory>
			))}
		</Box>
	);
};

export default CategoriesList;
