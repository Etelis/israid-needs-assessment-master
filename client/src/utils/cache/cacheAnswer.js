import { set } from 'idb-keyval';
import { createUpdatedAnswerCacheKey } from './cacheKeyTypes';
import { toast } from 'react-toastify';

const cacheAnswer = async (newAnswer) => {
	try {
		await set(createUpdatedAnswerCacheKey(newAnswer), newAnswer);
	} catch (error) {
		const errorMessage = 'Something went wrong while saving the answer';

		toast.error(errorMessage, { toastId: errorMessage });
	}
};

export default cacheAnswer;
