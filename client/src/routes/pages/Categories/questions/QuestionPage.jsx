import { Card, Stack, TextField, Typography } from '@mui/material';
import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useCategoriesContext } from '../context/useCategoriesContext';
import CompletedSubCategory from '../CompletedSubCategory';
import cacheAnswer from '../../../../utils/cache/cacheAnswer';
import AnswerInput from './Answers/AnswerInput';
import PhotoManager from './Answers/PhotoManager';
import Controls from './Controls/Controls';
import Question from './Question';
import ProgressSummary from '../../../../components/ProgressSummary';
import styles from './styles';
import { useBreadcrumbsContext } from '../context/useBreadcrumbsContext';

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

const getCurrentSubCategory = (categories, categoryId, subCategoryId) =>
	categories
		.find((category) => category.id === categoryId)
		.subCategories.find((subCategory) => subCategory.id === subCategoryId);

const isCurrentAnswerValid = (answer) => {
	if (typeof answer === 'string') {
		return answer !== '';
	} else if (Array.isArray(answer)) {
		return answer.length > 0;
	} else if (typeof answer === 'boolean') {
		return true;
	} else {
		return !!answer;
	}
};

const QuestionPage = () => {
	const { subCategoryId, categoryId, rnaId } = useParams();
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [attachedPhotos, setAttachedPhotos] = useState([]);
	const [currentNotes, setCurrentNotes] = useState('');
	const [currentValue, setCurrentValue] = useState();
	const { getViewCategories, fetchRnaAnswers, rnaAnswers } =
		useCategoriesContext();
	const [currentSubCategory, setCurrentSubCategory] = useState(
		getCurrentSubCategory(getViewCategories(), categoryId, subCategoryId)
	);
	const oldAnswerRef = useRef();
	const { addBreadcrumb, removeBreadcrumb } = useBreadcrumbsContext();
	const { pathname } = useLocation();

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

	useEffect(() => {
		setCurrentSubCategory(
			getCurrentSubCategory(
				getViewCategories(),
				categoryId,
				subCategoryId
			)
		);
	}, [subCategoryId, rnaAnswers]);

	const viableQuestions = currentSubCategory.questions.filter((x) =>
		isQuestionViable(x, currentSubCategory.answers)
	);

	const currentQuestion = viableQuestions[currentQuestionIndex];

	const setAnswerFields = () => {
		oldAnswerRef.current = currentSubCategory.answers.find(
			(x) => x.questionId === currentQuestion.id
		);

		if (oldAnswerRef.current) {
			setCurrentNotes(oldAnswerRef.current.notes);
			setCurrentValue(oldAnswerRef.current.value);
			setAttachedPhotos(oldAnswerRef.current.photos);
		}
	};

	useEffect(() => {
		if (currentQuestion) {
			setAnswerFields();
		}
	}, [currentQuestionIndex, currentSubCategory.answers]);

	if (currentQuestionIndex >= viableQuestions.length) {
		return <CompletedSubCategory />;
	}

	const resetAnswerFields = () => {
		setCurrentNotes('');
		setCurrentValue(undefined);
		setAttachedPhotos([]);
	};

	const skip = () => {
		setCurrentQuestionIndex(currentQuestionIndex + 1);

		resetAnswerFields();
	};

	const prev = () => {
		setCurrentQuestionIndex(currentQuestionIndex - 1);

		resetAnswerFields();
	};

	const saveUpdatedAnswer = async () => {
		const newAnswer = {
			questionId: currentQuestion.id,
			value: currentValue,
			photos: attachedPhotos,
			notes: currentNotes,
		};

		const oldAnswer = {
			questionId: oldAnswerRef.current?.questionId,
			value: oldAnswerRef.current?.value,
			photos: oldAnswerRef.current?.photos,
			notes: oldAnswerRef.current?.notes,
		};

		if (!isEqual(oldAnswer, newAnswer)) {
			await cacheAnswer({
				...newAnswer,
				rnaId,
				createdOn: new Date(),
			});
			await fetchRnaAnswers();
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		await saveUpdatedAnswer();

		skip();
	};

	return (
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
					answer={currentValue}
					setAnswer={setCurrentValue}
				/>

				<TextField
					label='Additional Notes...'
					fullWidth
					multiline
					rows='3'
					sx={styles.notesBox}
					value={currentNotes}
					onChange={(e) => setCurrentNotes(e.target.value)}
				/>

				<PhotoManager
					attachedPhotos={attachedPhotos}
					setAttachedPhotos={setAttachedPhotos}
				/>

				<Controls
					onPrev={prev}
					canGoPrev={currentQuestionIndex !== 0}
					canGoNext={isCurrentAnswerValid(currentValue)}
					onSkip={skip}
				/>
			</Stack>
		</form>
	);
};

export default QuestionPage;
