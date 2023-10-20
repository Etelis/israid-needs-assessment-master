import { useQueries } from '@tanstack/react-query';
import { api } from '../axios';

const fetchRnaAnswers = (rnaId) => async () =>
	(await api.get(`/rnas/${rnaId}/answers`)).data;

export const getRnaAnswersQueries = (rnaIds) =>
	rnaIds.map((rnaId) => ({
		queryKey: ['answers', rnaId],
		queryFn: fetchRnaAnswers(rnaId),
	}));

const useAnswersQuery = (rnaIds) => {
	const queries = useQueries({ queries: getRnaAnswersQueries(rnaIds) });

	// Calculate isLoading status by checking if any query is still loading
	const isLoading = queries.some((query) => query.isLoading);

	return {
		queries,
		isLoading,
	};
};

export default useAnswersQuery;