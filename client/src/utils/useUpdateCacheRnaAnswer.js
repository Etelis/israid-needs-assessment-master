import { get, set } from 'idb-keyval';

const useUpdateCacheRnaAnswer = async (rnaId, newAnswer) => {
	let updatedAnswers = await get(rnaId) ?? [];

	const updatedIndex = updatedAnswers.findIndex(answer => answer.questionId === newAnswer.questionId);

	if (updatedIndex >= 0) {
		updatedAnswers[updatedIndex] = newAnswer;
	} else {
		updatedAnswers = [...updatedAnswers, newAnswer];
	}

	return set(rnaId, updatedAnswers);
}

export default useUpdateCacheRnaAnswer;