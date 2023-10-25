import { get, getMany, keys } from 'idb-keyval';
import { cacheUsageKeyTypes, getUpdatedRnaKeys } from './cacheKeyTypes';
import { toast } from 'react-toastify';

const setIsDownloadedRnaFields = async (rnas) => {
	const downloadedRnasIds =
		(await get(cacheUsageKeyTypes.downloadedRnas)) ?? [];

	return rnas.map((rna) => ({
		...rna,
		isDownloaded: downloadedRnasIds.includes(rna.id),
	}));
};

const mergeRnas = (oldRnas, updatedRnas) => {
	let mergedRnas = [...oldRnas];

	updatedRnas.forEach((updatedRna) => {
		const savedRnaIndex = mergedRnas.findIndex(
			(x) => x.id === updatedRna.id
		);

		if (savedRnaIndex >= 0) {
			mergedRnas[savedRnaIndex] = updatedRna;
		} else {
			mergedRnas = [...mergedRnas, updatedRna];
		}
	});

	return mergedRnas;
};

const getCachedRnas = async () => {
	const rnasKeys = getUpdatedRnaKeys(await keys());

	return getMany(rnasKeys);
};

const getSavedAndCachedRnas = async (queryClient) => {
	try {
		const savedRnas = queryClient.getQueryData(['rnas']) ?? [];
		const updatedRnas = (await getCachedRnas()) ?? [];

		const allRnas = mergeRnas(savedRnas, updatedRnas);

		return setIsDownloadedRnaFields(allRnas);
	} catch (error) {
		const errorMessage = 'Something Went Wrong Getting Saved Rnas';

		toast.error(errorMessage, { toastId: errorMessage });
	}
};

export default getSavedAndCachedRnas;
