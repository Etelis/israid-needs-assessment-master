import { Card, Stack, TextField, Typography } from '@mui/material';
import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProgressSummary from '../../../../components/ProgressSummary';
import cacheAnswer from '../../../../utils/cache/cacheAnswer';
import CompletedSubCategory from '../CompletedSubCategory';
import { useBreadcrumbsContext } from '../context/useBreadcrumbsContext';
import { useCategoriesContext } from '../context/useCategoriesContext';
import AnswerInput from './Answers/AnswerInput';
import PhotoManager from './Answers/PhotoManager';
import Controls from './Controls/Controls';
import Question from './Question';
import styles from './styles';

const isAnswerAsExpected = (answer, question) => {
	const expectedAnswer = question.dependencies.expectedAnswer;

	if (Array.isArray(answer.value)) {
		return answer.value.includes(expectedAnswer);
	}

	return answer.value === expectedAnswer;
};

/*  
  This function verifies the question dependencies, if a question is relient on another question's
  answer then we need to ensure the answer recieved on the other question is as expected in the dependency,
  if not the question can be safely skipped
*/
const isQuestionViable = (question, answers) => {
	if (!question.dependencies) {
		return true;
	}

	const dependencyAnswer = answers.find(
		(x) => x.questionId === question.dependencies.questionId
	);

	return dependencyAnswer && isAnswerAsExpected(dependencyAnswer, question);
};

const getSubCategory = (categories, categoryId, subCategoryId) =>
	categories
		.find((category) => category.id === categoryId)
		.subCategories.find((subCategory) => subCategory.id === subCategoryId);

const isCurrentAnswerValid = (oldAnswer, answer) => {
	if (typeof answer === 'string') {
		return answer !== '';
	} else if (Array.isArray(answer)) {
		return oldAnswer?.length > 0 || answer.length > 0;
	} else if (typeof answer === 'boolean') {
		return true;
	} else {
		return !!answer;
	}
};

const defaultAnswer = {
	value: undefined,
	photos: [],
	notes: '',
};

const QuestionPage = () => {
	const { subCategoryId, categoryId, rnaId } = useParams();
	const { pathname } = useLocation();
	const { addBreadcrumb, removeBreadcrumb } = useBreadcrumbsContext();
	const { categories, fetchRnaAnswers } = useCategoriesContext();
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [currentAnswer, setCurrentAnswer] = useState(defaultAnswer);

	const currentSubCategory = getSubCategory(
		categories,
		categoryId,
		subCategoryId
	);

	const viableQuestions = currentSubCategory.questions.filter((x) =>
		isQuestionViable(x, currentSubCategory.answers)
	);

	const currentQuestion = viableQuestions[currentQuestionIndex];

	const oldAnswer = currentSubCategory.answers.find(
		(x) => x.questionId === currentQuestion?.id
	);

	const setAnswerFields = () => {
		if (oldAnswer) {
			setCurrentAnswer(() => ({
				...oldAnswer,
			}));
		}
	};

	const resetAnswerFields = () =>
		setCurrentAnswer(() => ({
			...defaultAnswer,
		}));

	const skip = () => {
		setCurrentQuestionIndex(currentQuestionIndex + 1);

		resetAnswerFields();
	};

	const prev = () => {
		setCurrentQuestionIndex(currentQuestionIndex - 1);

		resetAnswerFields();
	};

	useEffect(() => {
		if (currentQuestion) {
			setAnswerFields();
		}
	}, [currentQuestionIndex, categories]);

	useEffect(() => {
		setCurrentQuestionIndex(0);

		addBreadcrumb({
			text: currentSubCategory.name,
			routeTo: pathname,
		});

		return () => {
			removeBreadcrumb(currentSubCategory.name);
		};
	}, [subCategoryId]);

	const saveUpdatedAnswer = async () => {
		if (!isEqual(oldAnswer, currentAnswer)) {
			await cacheAnswer({
				...currentAnswer,
				questionId: currentQuestion.id,
				rnaId,
				createdOn: new Date(),
			});

			fetchRnaAnswers();
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		await saveUpdatedAnswer();

		skip();
	};

	const getNextSubCategory = () => {
		const currentSubCategories = categories.find(
			(x) => x.id === categoryId
		).subCategories;

		const currentSubCategoryIndex = currentSubCategories.findIndex(
			(x) => x.id === subCategoryId
		);

		return currentSubCategories[currentSubCategoryIndex + 1];
	};

	return currentQuestionIndex >= viableQuestions.length ? (
		<CompletedSubCategory
			returnToQuestions={prev}
			completedSubCategory={currentSubCategory}
			nextSubCategory={getNextSubCategory()}
		/>
	) : (
		<form onSubmit={handleSubmit}>
			<Stack
				minHeight='90vh'
				p={2}
				spacing={2}
				justifyContent='space-around'
			>
				<Stack spacing={3}>
					<Card sx={styles.progressSummary}>
						<ProgressSummary
							ProgressDetails={
								<Typography
									variant='h5'
									fontSize='22px'
									mb={1}
									fontWeight='bold'
								>
									{currentSubCategory.name}
								</Typography>
							}
							currentProgress={currentQuestionIndex + 1}
							maxProgress={currentSubCategory.questions.length}
						/>
					</Card>

					<Question question={currentQuestion.title} />
				</Stack>

				<AnswerInput
					question={currentQuestion}
					answer={currentAnswer.value}
					setAnswer={(newValue) =>
						setCurrentAnswer((answer) => ({
							...answer,
							value: newValue,
						}))
					}
				/>

				<TextField
					label='Additional Notes...'
					fullWidth
					multiline
					rows='3'
					sx={styles.notesBox}
					value={currentAnswer.notes}
					onChange={(e) =>
						setCurrentAnswer((answer) => ({
							...answer,
							notes: e.target.value,
						}))
					}
				/>

				<PhotoManager
					attachedPhotos={currentAnswer.photos}
					setAttachedPhotos={(newPhotos) =>
						setCurrentAnswer((answer) => ({
							...answer,
							photos: newPhotos,
						}))
					}
				/>

				<Controls
					onPrev={prev}
					canGoPrev={currentQuestionIndex !== 0}
					canGoNext={isCurrentAnswerValid(
						oldAnswer?.value,
						currentAnswer.value
					)}
					onSkip={skip}
				/>
			</Stack>
		</form>
	);
};

export default QuestionPage;
