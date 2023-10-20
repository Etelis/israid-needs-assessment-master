import { set } from 'idb-keyval';
import { createUpdatedAnswerCacheKey } from './cacheKeyTypes';
import { toast } from 'react-toastify';

const cacheAnswer = async (newAnswer) => {
	try {
		await set(createUpdatedAnswerCacheKey(newAnswer), newAnswer);
	} catch (error) {
		toast.error('Something Went Wrong Saving Answer');
	}
};

export default cacheAnswer;