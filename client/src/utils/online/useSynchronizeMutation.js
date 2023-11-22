import { useMutation, useQueryClient } from '@tanstack/react-query';
import { delMany, getMany, set } from 'idb-keyval';
import { toast } from 'react-toastify';
import { api } from '../axios';
import {
	cacheUsageKeyTypes,
	getUpdatedAnswerKeys,
	getUpdatedRnaKeys,
} from '../cache/cacheKeyTypes';
import { getLocalCacheChangesKeys } from '../cache/getLocalCacheChanges';
import formatDate from '../formatDate';
import fetchDownloadedRnaAnswersQueries from './fetchDownloadedRnaAnswersQueries';

const clearCachedChanges = async () =>
	delMany(await getLocalCacheChangesKeys());

const useSynchronizeMutation = () => {
	const queryClient = useQueryClient();

	const onSuccess = async () => {
		try {
			await set(cacheUsageKeyTypes.lastSync, formatDate(new Date()));
			
			await clearCachedChanges();
			
			await fetchDownloadedRnaAnswersQueries(queryClient);
			
			await queryClient.refetchQueries();

			const successMessage = 'All Up To Date!';

			toast.success(successMessage, { toastId: successMessage });
		} catch (error) {
			const errorMessage =
				'Woops Something Went Wrong, Try Reloading The Application';

			toast.error(errorMessage, { toastId: errorMessage });
		}
	};

	const synchronize = async () => {
		const allChangesKeys = await getLocalCacheChangesKeys();

		const updatedRnas =
			(await getMany(getUpdatedRnaKeys(allChangesKeys))) ?? [];

		const updatedAnswers =
			(await getMany(getUpdatedAnswerKeys(allChangesKeys))) ?? [];

		console.log('synchronizing');

		return api.post('/synchronize', {
			updatedRnas,
			updatedAnswers,
		});
	};

	return useMutation(synchronize, { onSuccess });
};

export default useSynchronizeMutation;
