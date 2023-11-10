import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import getCategories from '../../../../utils/cache/getCategories';
import getQuestions from '../../../../utils/cache/getQuestions';
import { getSavedAndCachedAnswersForState } from '../../../../utils/cache/getSavedAndCachedRnaAnswers';
import { getRnaForState } from '../../../../utils/cache/getSavedAndCachedRnas';
import BreadcrumbsTrail from '../Breadcrumbs';
import { BreadcrumbsProvider } from './useBreadcrumbsContext';

// Initial data for questions, answers, and rnas
// Can Eventually populate the questions from the DB instead of static data
const initialData = {
	rna: {},
	questions: [],
	rnaAnswers: [],
	categories: [],
	fetchRnaAnswers: () => {},
};

const CategoriesContext = createContext(initialData);

export const useCategoriesContext = () => {
	return useContext(CategoriesContext);
};

const getQuestionsForSubCategory = (subCategoryId, questions) =>
	questions.filter((question) => question.subCategoryId === subCategoryId);

const getAnswersForSubCategory = (subCategoryId, questions, answers) => {
	const subCategoryQuestionsIds = getQuestionsForSubCategory(
		subCategoryId,
		questions
	).map((x) => x.id);

	return answers.filter((answer) =>
		subCategoryQuestionsIds.includes(answer.questionId)
	);
};

const buildSubCategories = (subCategories, questions, answers) =>
	subCategories.map((x) => ({
		...x,
		questions: getQuestionsForSubCategory(x.id, questions),
		answers: getAnswersForSubCategory(x.id, questions, answers),
	}));

const getViewCategories = (categories, questions, rnaAnswers) =>
	categories
		.map((category) => ({
			...category,
			subCategories: buildSubCategories(
				category.subCategories,
				questions,
				rnaAnswers
			),
		}))
		.map((category) => ({
			...category,
			totalQuestionAmount: category.subCategories.reduce(
				(amount, x) => amount + x.questions.length,
				0
			),
			answeredQuestionAmount: category.subCategories.reduce(
				(amount, x) => amount + x.answers.length,
				0
			),
		}));

export const CategoriesProvider = ({ children }) => {
	const { rnaId } = useParams();
	const queryClient = useQueryClient();
	const [rna, setRna] = useState();
	const [questions, setQuestions] = useState(getQuestions());
	const [rnaAnswers, setRnaAnswers] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const currentCategories = getCategories(queryClient);

		setCategories(
			getViewCategories(currentCategories, questions, rnaAnswers)
		);
	}, [rnaAnswers]);

	const fetchRnaAnswers = () =>
		getSavedAndCachedAnswersForState(rnaId, queryClient, setRnaAnswers);

	useEffect(() => {
		fetchRnaAnswers();
		getRnaForState(rnaId, queryClient, setRna);
	}, [rnaId]);

	const value = useMemo(
		() => ({
			rna,
			rnaAnswers,
			categories,
			questions,
			fetchRnaAnswers,
		}),
		[rna, rnaAnswers, categories, questions]
	);

	if (!rna || !categories || !questions) {
		return <LoadingSpinner />;
	}

	return (
		<CategoriesContext.Provider value={value}>
			<BreadcrumbsProvider>
				<BreadcrumbsTrail />
				{children}
			</BreadcrumbsProvider>
		</CategoriesContext.Provider>
	);
};
