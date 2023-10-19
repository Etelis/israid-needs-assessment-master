import { getMany, keys } from 'idb-keyval';
import { getUpdatedRnaKeys } from './cacheKeyTypes';
import { toast } from 'react-toastify';

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

		console.log('merged rnas', mergeRnas(savedRnas, updatedRnas));

		return mergeRnas(savedRnas, updatedRnas);
	} catch (error) {
		toast.error('Something Went Wrong Getting Saved Rnas');
	}
};

export default getSavedAndCachedRnas;