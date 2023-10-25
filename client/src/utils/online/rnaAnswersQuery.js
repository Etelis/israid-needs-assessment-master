import { api } from '../axios';

const fetchRnaAnswers = (rnaId) => async () =>
	(await api.get(`/rnas/${rnaId}/answers`)).data;

const rnaAnswersQuery = (rnaId) => ({
	queryKey: ['answers', rnaId],
	queryFn: fetchRnaAnswers(rnaId),
});

export default rnaAnswersQuery;
