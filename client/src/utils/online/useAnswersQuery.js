import { useQueries } from '@tanstack/react-query';
import { api } from '../axios';

const useAnswersQuery = (rnas) => {
	const fetchRnaAnswers = (rnaId) => async () =>
		(await api.get(`/rnas/${rnaId}/answers`)).data;

	const answerQueries = rnas.map((rna) => ({
		queryKey: ['answers', rna.id],
		queryFn: fetchRnaAnswers(rna.id),
	}));

	return useQueries({ queries: answerQueries });
};

export default useAnswersQuery;