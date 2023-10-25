import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useState,
} from 'react';
import subCategories from '../../../../static-data/sub-categories.json';
import { useQueryClient } from '@tanstack/react-query';
import getSavedAndCachedRnaAnswers from '../../../../utils/cache/getSavedAndCachedRnaAnswers';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getQuestions from '../../../../utils/cache/getQuestions';

// Initial data for questions, answers, and rnas
// Can Eventually populate the questions from the DB instead of static data
const initialData = {
	rnaAnswers: [],
	subCategories: [],
};

const CategoriesContext = createContext(initialData);

export const useCategoriesContext = () => {
	return useContext(CategoriesContext);
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
	const [state, setState] = useState(initialData);
	const { rnaId } = useParams();
	const queryClient = useQueryClient();
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const fetchQuestions = async () => {
			const allQuestions = await getQuestions();

			setQuestions(allQuestions);
		};

		fetchQuestions();
	}, []);

	const fetchRnaAnswers = async () => {
		try {
			const result = await getSavedAndCachedRnaAnswers(
				rnaId,
				queryClient
			);

			setState({ ...state, rnaAnswers: result ?? [] });
		} catch (error) {
			const errorMessage = 'Something Went Wrong Getting Rna Answers';

			toast.error(errorMessage, { toastId: errorMessage });
		}
	};

	const setSubCategories = (subCategories) => {
		setState({ ...state, subCategories: subCategories ?? [] });
	};

	useEffect(() => {
		fetchRnaAnswers();
	}, [rnaId]);

	useEffect(() => {
		setSubCategories(buildSubCategories(questions, state.rnaAnswers));
	}, [state.rnaAnswers]);

	const value = useMemo(
		() => ({
			...state,
			fetchRnaAnswers,
		}),
		[state, questions]
	);

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
