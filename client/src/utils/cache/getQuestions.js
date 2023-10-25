import { get } from 'idb-keyval';
import { cacheUsageKeyTypes } from './cacheKeyTypes';
import questions from '../../static-data/questions.json';

const getQuestions = async () =>
	(await get(cacheUsageKeyTypes.questions)) ?? questions;

export default getQuestions;
