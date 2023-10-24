import { get, set } from 'idb-keyval';
import { toast } from 'react-toastify';
import { cacheUsageKeyTypes } from './cacheKeyTypes';

const addRnaToList = (rnaIds, newRnaId) => {
	if (rnaIds.includes(newRnaId)) {
		return rnaIds;
	}

	return [...rnaIds, newRnaId];
};

const addRnaToDownloaded = async (newRnaId) => {
	try {
		const downloadedRnaIds =
			(await get(cacheUsageKeyTypes.downloadedRnas)) ?? [];

		await set(
			`${cacheUsageKeyTypes.downloadedRnas}`,
			addRnaToList(downloadedRnaIds, newRnaId)
		);
	} catch (error) {
		const errorMessage = 'Something Went Wrong Saving Rna';

		toast.error(errorMessage, { toastId: errorMessage });
	}
};

export default addRnaToDownloaded;
