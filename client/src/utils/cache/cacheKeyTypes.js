// Cache keys that are used to diffrentiate different updates to data (data to be synchronized later on)
const cacheUpdateKeyTypes = {
	updatedAnswer: 'answer',
	updatedRna: 'rna',
};

// Cache keys that are used to store 'permenant' information about the application
export const cacheUsageKeyTypes = {
	lastSync: 'lastSync',
	reactQueryCache: import.meta.env.VITE_REACT_QUERY_KEY,
	downloadedRnas: 'downloadedRnas',
	questions: 'questions',
};

export const createUpdatedAnswerCacheKey = (answer) =>
	`${cacheUpdateKeyTypes.updatedAnswer}-${answer.rnaId}-${answer.questionId}`;

export const createUpdatedRnaCacheKey = (rna) =>
	`${cacheUpdateKeyTypes.updatedRna}-${rna.id}`;

export const getKeyAsArray = (key) => key.split('-');

export const getUpdatedAnswerKeys = (keys) =>
	keys.filter((key) => key.startsWith(cacheUpdateKeyTypes.updatedAnswer));

export const getUpdatedRnaKeys = (keys) =>
	keys.filter((key) => key.startsWith(cacheUpdateKeyTypes.updatedRna));

export default cacheUpdateKeyTypes;
//TODO: rename to cacheKeys + cancel default export
