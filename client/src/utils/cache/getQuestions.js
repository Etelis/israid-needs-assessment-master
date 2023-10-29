import { get } from 'idb-keyval';
import { cacheUsageKeyTypes } from './cacheKeyTypes';
import questions from '../../static-data/questions.json';

export const getQuestionsForState = async (setState) => {
	const allQuestions = await getQuestions();

	setState(allQuestions ?? []);
};

const getQuestions = async () =>
	(await get(cacheUsageKeyTypes.questions)) ?? questions;

export default getQuestions;
