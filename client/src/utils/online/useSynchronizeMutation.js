import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../axios';
import { delMany, getMany, set } from 'idb-keyval';
import { getLocalCacheChangesKeys } from '../cache/getLocalCacheChanges';
import {
	cacheUsageKeyTypes,
	getUpdatedAnswerKeys,
	getUpdatedRnaKeys,
} from '../cache/cacheKeyTypes';
import { toast } from 'react-toastify';

const clearCachedChanges = async () =>
	delMany(await getLocalCacheChangesKeys());

const useSynchronizeMutation = () => {
	const queryClient = useQueryClient();

	const onSuccess = async () => {
		try {
			await queryClient.refetchQueries();

			await set(
				cacheUsageKeyTypes.lastSync,
				new Date().toLocaleDateString('en-US')
			);

			await clearCachedChanges();

			toast.success('All Up To Date!');
		} catch (error) {
			toast.error(
				'Woops Something Went Wrong, Try Reloading The Application'
			);
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