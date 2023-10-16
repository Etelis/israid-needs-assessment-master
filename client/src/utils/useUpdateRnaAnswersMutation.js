import { useMutation } from '@tanstack/react-query';
import { api } from './axios';

const useUpdateRnaAnswersMutation = () => {
	const updateAnswers = async (rnaId, updatedAnswers) =>
		await api.put(`/rnas/${rnaId}/answers`, updatedAnswers);

	return useMutation(updateAnswers);
};

export default useUpdateRnaAnswersMutation;