import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from 'react';
import questions from '../static-data/questions.json';
import subCategories from '../static-data/sub-categories.json';
import { useQueryClient } from '@tanstack/react-query';
import getSavedAndCachedRnaAnswers from '../utils/cache/getSavedAndCachedRnaAnswers';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Initial data for questions, answers, and rnas
// Can Eventually populate the questions from the DB instead of static data
const initialData = {
	questions,
	rnaAnswers: [],
	subCategories: [],
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
		case 'SET_RNA_ANSWERS':
			return { ...state, rnaAnswers: action.payload };
		case 'SET_SUB_CATEGORIES':
			return { ...state, subCategories: action.payload };
		default:
			return state;
	}
};

const getQuestionsForSubCategory = (subCategoryId, questions) =>
	questions.filter((question) => question.subCategoryId === subCategoryId);

const getAnswersForSubCategory = (subCategoryId, rnaAnswers, questions) => {
	const subCategoryQuestionsIds = getQuestionsForSubCategory(
		subCategoryId,
		questions
	).map((x) => x.id);

	return rnaAnswers.filter((answer) =>
		subCategoryQuestionsIds.includes(answer.questionId)
	);
};

const buildSubCategories = (questions, rnaAnswers) =>
	subCategories.map((x) => {
		return {
			...x,
			questions: getQuestionsForSubCategory(x.id, questions),
			answers: getAnswersForSubCategory(x.id, rnaAnswers, questions),
		};
	});

export const CategoriesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(dataReducer, initialData);
	const { rnaId } = useParams();
	const queryClient = useQueryClient();

	const fetchRnaAnswers = async () => {
		try {
			const result = await getSavedAndCachedRnaAnswers(
				rnaId,
				queryClient
			);

			dispatch({ type: 'SET_RNA_ANSWERS', payload: result ?? [] });
		} catch (error) {
			toast.error('Something Went Wrong Getting Rna Answers');
		}
	};

	const setQuestions = (questions) => {
		dispatch({ type: 'SET_QUESTIONS', payload: questions ?? [] });
	};

	const setSubCategories = (subCategories) => {
		dispatch({ type: 'SET_SUB_CATEGORIES', payload: subCategories ?? [] });
	};

	useEffect(() => {
		fetchRnaAnswers();
	}, [rnaId]);

	useEffect(() => {
		setSubCategories(buildSubCategories(state.questions, state.rnaAnswers));
	}, [state.rnaAnswers]);

	const value = useMemo(
		() => ({
			...state,
			setQuestions,
			fetchRnaAnswers,
		}),
		[state]
	);

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
