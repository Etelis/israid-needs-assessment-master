import { Box } from '@mui/material';
import ProgressOverview from '../../components/ProgressOverview';
import QuestionCategory from '../../components/QuestionCategory';
import { useCategoriesContext } from '../../context/useCategoriesContext';
import categories from '../../static-data/categories.json';

const getViewCategories = (subCategories) =>
	categories.map((x) => {
		const categorySubCategories = subCategories.filter(
			(y) => y.categoryId === x.id
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

const CategoriesList = () => {
	const { subCategories, rnaAnswers, questions } = useCategoriesContext();

	if (!subCategories.length) {
		return null;
	}

	const viewCategories = getViewCategories(subCategories);

	return (
		<Box>
			<ProgressOverview
				leftColumnAmount={Math.floor(
					(rnaAnswers.length / questions.length) * 100
				)}
				leftColumnCaption={'Form Completed'}
				rightColumnAmount={rnaAnswers.length}
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
