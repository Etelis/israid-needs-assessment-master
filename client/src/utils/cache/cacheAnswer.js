import { set } from 'idb-keyval';
import { createUpdatedAnswerCacheKey } from './cacheKeyTypes';
import { toast } from 'react-toastify';

const cacheAnswer = async (newAnswer) => {
	try {
		await set(createUpdatedAnswerCacheKey(newAnswer), newAnswer);
	} catch (error) {
		const errorMessage = 'Something Went Wrong Saving Answer';

		toast.error(errorMessage, { toastId: errorMessage });
	}
};

export default cacheAnswer;
