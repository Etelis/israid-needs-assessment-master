import { set } from 'idb-keyval';
import { createUpdatedRnaCacheKey } from './cacheKeyTypes';
import { toast } from 'react-toastify';

const cacheRna = async (newRna) => {
	try {
		await set(createUpdatedRnaCacheKey(newRna), newRna);
	} catch (error) {
		const errorMessage = 'Something went wrong while saving the RNA';

		toast.error(errorMessage, { toastId: errorMessage });
	}
};

export default cacheRna;
