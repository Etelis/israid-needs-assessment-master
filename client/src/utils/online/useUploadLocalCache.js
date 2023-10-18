import { delMany, keys } from 'idb-keyval';
import useSavedAndCachedRnaAnswers from '../useSavedAndCachedRnaAnswers';

const getUpdatedRnasIds = async () => {
	const allKeys = (await keys()) ?? [];

	console.log('all Keys', allKeys);

	return allKeys.filter((x) => x !== import.meta.env.VITE_REACT_QUERY_KEY);
};

const clearLocalCache = async (keys) => delMany(keys);

const useUploadLocalCache = async (queryClient, updateAnswersMutation) => {
	const updatedRnasIds = await getUpdatedRnasIds();

	const dbUpdates = updatedRnasIds.map(async (rnaId) => {
		const updatedAnswers = await useSavedAndCachedRnaAnswers(
			rnaId,
			queryClient
		);

		return updateAnswersMutation({ rnaId, updatedAnswers });
	});

	return Promise.all(dbUpdates)
		.then(() => {
			clearLocalCache(updatedRnasIds);
		})
		.catch((error) => console.log('error', error));
};

export default useUploadLocalCache;
