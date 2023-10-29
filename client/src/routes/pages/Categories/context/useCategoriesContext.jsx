import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import subCategories from '../../../../static-data/sub-categories.json';
import { getQuestionsForState } from '../../../../utils/cache/getQuestions';
import { getSavedAndCachedAnswersForState } from '../../../../utils/cache/getSavedAndCachedRnaAnswers';
import { getRnaForState } from '../../../../utils/cache/getSavedAndCachedRnas';

// Initial data for questions, answers, and rnas
// Can Eventually populate the questions from the DB instead of static data
const initialData = {
	rna: {},
	questions: [],
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
	// const [state, setState] = useState(initialData);
	const { rnaId } = useParams();
	const queryClient = useQueryClient();
	const [rna, setRna] = useState();
	const [questions, setQuestions] = useState([]);
	const [rnaAnswers, setRnaAnswers] = useState([]);
	const [subCategories, setSubCategories] = useState([]);

	useEffect(() => {
		getQuestionsForState(setQuestions);
	}, []);

	const fetchRnaAnswers = () =>
		getSavedAndCachedAnswersForState(rnaId, queryClient, setRnaAnswers);

	useEffect(() => {
		fetchRnaAnswers();
		getRnaForState(rnaId, queryClient, setRna);
	}, [rnaId]);

	useEffect(() => {
		setSubCategories(buildSubCategories(questions, rnaAnswers) ?? []);
	}, [rnaAnswers]);

	const value = useMemo(
		() => ({
			rna,
			rnaAnswers,
			subCategories,
			questions,
			fetchRnaAnswers,
		}),
		[rna, rnaAnswers, subCategories, questions]
	);

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
