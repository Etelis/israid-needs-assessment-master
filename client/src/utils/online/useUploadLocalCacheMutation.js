import { keys } from 'idb-keyval';
import useUpdateRnaAnswersMutation from './useUpdateRnaAnswersMutation';
import { useQueryClient } from '@tanstack/react-query';
import useSavedAndCachedRnaAnswers from '../useSavedAndCachedRnaAnswers';

const getUpdatedRnasIds = async () => {
	const allKeys = await keys();

	console.log('all Keys', allKeys);

	return allKeys.filter((x) => x !== 'queryClient');
};

const useUploadLocalCacheMutation = async () => {
	const queryClient = useQueryClient();

	queryClient.invalidateQueries();

	const updatedRnasIds = await getUpdatedRnasIds();
	const updateRnaAnswersMutation = useUpdateRnaAnswersMutation();

	const dbUpdates = updatedRnasIds.map(async (rnaId) =>
		updateRnaAnswersMutation.mutate(
			rnaId,
			await useSavedAndCachedRnaAnswers(rnaId, queryClient)
		)
	);

	return Promise.all(dbUpdates);
};

export default useUploadLocalCacheMutation;