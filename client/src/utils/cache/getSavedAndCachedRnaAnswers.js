import { getMany, keys } from 'idb-keyval';
import { getUpdatedAnswerKeys } from './cacheKeyTypes';
import { toast } from 'react-toastify';

const mergeAnswers = (oldAnswers, updatedAnswers) => {
	let mergedAnswers = [...oldAnswers];

	updatedAnswers.forEach((updatedAnswer) => {
		const savedAnswerIndex = mergedAnswers.findIndex(
			(x) => x.questionId === updatedAnswer.questionId
		);

		if (savedAnswerIndex >= 0) {
			mergedAnswers[savedAnswerIndex] = updatedAnswer;
		} else {
			mergedAnswers = [...mergedAnswers, updatedAnswer];
		}
	});

	return mergedAnswers;
};

const getCachedRnaAnswers = async (rnaId) => {
	const rnaAnswerKeys = getUpdatedAnswerKeys(await keys()).filter((key) =>
		key.includes(rnaId)
	);

	return getMany(rnaAnswerKeys);
};

const getSavedAndCachedRnaAnswers = async (rnaId, queryClient) => {
	try {
		const savedAnswers = queryClient.getQueryData(['answers', rnaId]) ?? [];
		const updatedAnswers = (await getCachedRnaAnswers(rnaId)) ?? [];

		console.log('merged answers', mergeAnswers(savedAnswers, updatedAnswers));

		return mergeAnswers(savedAnswers, updatedAnswers);
	} catch (error) {
		toast.error('Something Went Wrong Getting Saved Answers');
	}
};

export default getSavedAndCachedRnaAnswers;