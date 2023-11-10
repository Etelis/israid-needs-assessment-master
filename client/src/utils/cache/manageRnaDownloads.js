import { get, set } from 'idb-keyval';
import { cacheUsageKeyTypes } from './cacheKeyTypes';
import { toast } from 'react-toastify';

const addRnaToList = (rnaIds, newRnaId) => {
	if (rnaIds.includes(newRnaId)) {
		return rnaIds;
	}

	return [...rnaIds, newRnaId];
};

export const addRnaToDownloaded = async (newRnaId) => {
	const downloadedRnaIds =
		(await get(cacheUsageKeyTypes.downloadedRnas)) ?? [];

	await set(
		`${cacheUsageKeyTypes.downloadedRnas}`,
		addRnaToList(downloadedRnaIds, newRnaId)
	);

	const downloadedMessage = 'This RNA will now update on Synchronization';

	toast.info(downloadedMessage, {
		toastId: downloadedMessage,
		autoClose: 4000,
	});
};

export const removeRnaFromDownloaded = async (oldRnaId) => {
	const downloadedRnaIds =
		(await get(cacheUsageKeyTypes.downloadedRnas)) ?? [];

	await set(
		`${cacheUsageKeyTypes.downloadedRnas}`,
		downloadedRnaIds.filter((id) => id !== oldRnaId)
	);

	const removedDownloadedMessage =
		'This RNA will no longer update on Synchronization';

	toast.info(removedDownloadedMessage, {
		toastId: removedDownloadedMessage,
		autoClose: 3000,
	});
};
