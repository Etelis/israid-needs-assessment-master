import { Stack, TextField } from '@mui/material';
import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCategoriesContext } from '../../context/useCategoriesContext';
import CompletedSubCategory from '../../routes/CompletedSubCategory';
import useUpdateCacheRnaAnswer from '../../utils/useUpdateCacheRnaAnswer';
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

const QuestionPage = () => {
	const { subCategoryId, rnaId } = useParams();
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [attachedPhotos, setAttachedPhotos] = useState([]);
	const [currentNotes, setCurrentNotes] = useState('');
	const [currentValue, setCurrentValue] = useState();
	const {
		getQuestionsForSubCategory,
		getAnswersForSubCategory,
		fetchAnswers,
		answers: rnaAnswers,
	} = useCategoriesContext();
	const [answers, setAnswers] = useState(
		getAnswersForSubCategory(subCategoryId)
	);
	const [questions, setQuestions] = useState(
		getQuestionsForSubCategory(subCategoryId)
	);
	const oldAnswerRef = useRef();

	useEffect(() => {
		setCurrentQuestionIndex(0);
		setAnswers(getAnswersForSubCategory(subCategoryId));
		setQuestions(getQuestionsForSubCategory(subCategoryId));
	}, [subCategoryId, rnaId]);

	useEffect(() => {
		setAnswers(getAnswersForSubCategory(subCategoryId));
	}, [rnaAnswers]);

	const viableQuestions = questions.filter((x) =>
		isQuestionViable(x, answers)
	);

	const currentQuestion = viableQuestions[currentQuestionIndex];

	const setAnswerFields = () => {
		oldAnswerRef.current = answers.find(
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
	}, [currentQuestion?.id, answers]);

	if (currentQuestionIndex >= viableQuestions.length) {
		return <CompletedSubCategory />;
	}

	const resetAnswerFields = () => {
		setCurrentNotes('');
		setCurrentValue(null);
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
			questionId: oldAnswerRef.current.questionId,
			value: oldAnswerRef.current.value,
			photos: oldAnswerRef.current.photos,
			notes: oldAnswerRef.current.notes,
		};

		if (!isEqual(oldAnswer, newAnswer)) {
			await useUpdateCacheRnaAnswer(rnaId, newAnswer);
			await fetchAnswers(rnaId);
			console.log('newAnswer', newAnswer);
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
				minHeight='80vh'
				p={2}
				spacing={3}
				justifyContent='space-around'
			>
				<Question question={currentQuestion.title} />

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
					canGoNext={currentValue != null}
					onSkip={skip}
				/>
			</Stack>
		</form>
	);
};

export default QuestionPage;