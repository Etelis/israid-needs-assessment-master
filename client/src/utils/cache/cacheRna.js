import { set } from 'idb-keyval';
import { createUpdatedRnaCacheKey } from './cacheKeyTypes';
import { toast } from 'react-toastify';

const cacheRna = async (newRna) => {
	try {
		await set(createUpdatedRnaCacheKey(newRna), newRna);
	} catch (error) {
		const errorMessage = 'Something Went Wrong Saving Rna';

		toast.error(errorMessage, { toastId: errorMessage });
	}
};

export default cacheRna;
