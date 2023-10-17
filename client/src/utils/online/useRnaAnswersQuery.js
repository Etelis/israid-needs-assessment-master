import { useQuery } from '@tanstack/react-query';
import { api } from '../axios';

const useRnaAnswersQuery = (rnaId) => {
	const fetchAnswers = async () =>
		(await api.get(`/rnas/${rnaId}/answers`)).data;

	return useQuery(['answers', rnaId], fetchAnswers);
};

export default useRnaAnswersQuery;