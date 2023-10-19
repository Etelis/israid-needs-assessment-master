import { get, set } from 'idb-keyval';
import { toast } from 'react-toastify';
import { cacheUsageKeyTypes } from './cacheKeyTypes';

const addRnaToList = (rnaIds, newRnaId) => {
	if (rnaIds.includes(newRnaId)) {
		return rnaIds;
	}

	return [...rnaIds, newRnaId];
};

const addRnaToCache = async (newRnaId) => {
	try {
		const downloadedRnaIds =
			(await get(cacheUsageKeyTypes.downloadedRnas)) ?? [];

		await set(
			`${cacheUsageKeyTypes.downloadedRnas}`,
			addRnaToList(downloadedRnaIds, newRnaId)
		);
	} catch (error) {
		toast.error('Something Went Wrong Saving Answer');
	}
};

export default addRnaToCache;