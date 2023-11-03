import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionsForState } from '../../../../utils/cache/getQuestions';
import { getSavedAndCachedAnswersForState } from '../../../../utils/cache/getSavedAndCachedRnaAnswers';
import { getRnaForState } from '../../../../utils/cache/getSavedAndCachedRnas';
import { getCategoriesForState } from '../../../../utils/cache/getCategories';
import LoadingSpinner from '../../../../components/LoadingSpinner';

// Initial data for questions, answers, and rnas
// Can Eventually populate the questions from the DB instead of static data
const initialData = {
	rna: {},
	questions: [],
	rnaAnswers: [],
	categories: [],
	getViewCategories: () => [],
	fetchRnaAnswers: () => {},
};

const CategoriesContext = createContext(initialData);

export const useCategoriesContext = () => {
	return useContext(CategoriesContext);
};

export const CategoriesProvider = ({ children }) => {
	const { rnaId } = useParams();
	const queryClient = useQueryClient();
	const [rna, setRna] = useState();
	const [questions, setQuestions] = useState([]);
	const [rnaAnswers, setRnaAnswers] = useState([]);
	const [categories, setCategories] = useState([]);

	const getQuestionsForSubCategory = (subCategoryId) =>
		questions.filter(
			(question) => question.subCategoryId === subCategoryId
		);

	const getAnswersForSubCategory = (subCategoryId) => {
		const subCategoryQuestionsIds = getQuestionsForSubCategory(
			subCategoryId,
			questions
		).map((x) => x.id);

		return rnaAnswers.filter((answer) =>
			subCategoryQuestionsIds.includes(answer.questionId)
		);
	};

	const buildSubCategories = (subCategories) =>
		subCategories.map((x) => ({
			...x,
			questions: getQuestionsForSubCategory(x.id, questions),
			answers: getAnswersForSubCategory(x.id, rnaAnswers, questions),
		}));

	const getViewCategories = () =>
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

	useEffect(() => {
		getQuestionsForState(setQuestions);
		getCategoriesForState(setCategories, queryClient);
	}, []);

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
			getViewCategories,
		}),
		[rna, rnaAnswers, categories, questions]
	);

	if (!rna || !categories || !questions) {
		return <LoadingSpinner />;
	}

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
