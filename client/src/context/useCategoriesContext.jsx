import { createContext, useContext, useReducer } from 'react';
import questions from '../static-data/questions.json';
import { useQueryClient } from '@tanstack/react-query';
import useSavedAndCachedRnaAnswers from '../utils/useSavedAndCachedRnaAnswers';

// Initial data for questions, answers, and rnas
// Can Eventually populate the questions from the DB instead of static data
const initialData = {
	questions,
	answers: [],
	rnas: [],
};

const CategoriesContext = createContext(initialData);

export const useCategoriesContext = () => {
	return useContext(CategoriesContext);
};

// Reducer to handle data modifications
const dataReducer = (state, action) => {
	switch (action.type) {
		case 'SET_QUESTIONS':
			return {
				...state,
				questions: action.payload,
			};
		case 'SET_ANSWERS':
			return { ...state, answers: action.payload };
		case 'SET_RNAS':
			return { ...state, rnas: action.payload };
		default:
			return state;
	}
};

export const CategoriesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(dataReducer, initialData);
	const queryClient = useQueryClient();

	const setQuestions = (questions) => {
		dispatch({ type: 'SET_QUESTIONS', payload: questions ?? [] });
	};

	const setAnswers = (answers) => {
		dispatch({ type: 'SET_ANSWERS', payload: answers ?? [] });
	};

	const setRnas = (rnas) => {
		dispatch({ type: 'SET_RNAS', payload: rnas ?? [] });
	};

	const getQuestionsForSubCategory = (subCategoryId) =>
		state.questions.filter(
			(question) => question.subCategoryId === subCategoryId
		);

	const getAnswersForSubCategory = (subCategoryId) => {
		const subCategoryQuestionsIds = getQuestionsForSubCategory(
			subCategoryId
		).map((x) => x.id);

		return state.answers.filter((answer) =>
			subCategoryQuestionsIds.includes(answer.questionId)
		);
	};

	const fetchAnswers = async (rnaId) => {
		const result = await useSavedAndCachedRnaAnswers(rnaId, queryClient);

		setAnswers(result);
	};

	return (
		<CategoriesContext.Provider
			value={{
				...state,
				setQuestions,
				setAnswers,
				setRnas,
				getQuestionsForSubCategory,
				getAnswersForSubCategory,
				fetchAnswers,
			}}
		>
			{children}
		</CategoriesContext.Provider>
	);
};