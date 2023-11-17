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

		return mergeAnswers(savedAnswers, updatedAnswers);
	} catch (error) {
		const errorMessage = 'Something went wrong while getting saved answers';

		toast.error(errorMessage, { toastId: errorMessage });
	}
};

export const getSavedAndCachedAnswersForState = async (rnaId, queryClient, setState) => {
	const answers = await getSavedAndCachedRnaAnswers(rnaId, queryClient);

	setState(answers);
};

export default getSavedAndCachedRnaAnswers;
