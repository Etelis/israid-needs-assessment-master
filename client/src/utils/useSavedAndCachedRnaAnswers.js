import { get } from 'idb-keyval';
import { useRnaAnswers } from './useRnaAnswersQuery';

const mergeAnswers = (oldAnswers, updatedAnswers) => {
	let mergedAnswers = [...oldAnswers];

	updatedAnswers.forEach(updatedAnswer => {
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

const useSavedAndCachedRnaAnswers = async (rnaId, queryClient) => {
	const savedAnswers = useRnaAnswers(rnaId, queryClient) ?? [];
	const updatedAnswers = await get(rnaId) ?? [];

	console.log('merged answers', mergeAnswers(savedAnswers, updatedAnswers));
	return mergeAnswers(savedAnswers, updatedAnswers);
};

export default useSavedAndCachedRnaAnswers;