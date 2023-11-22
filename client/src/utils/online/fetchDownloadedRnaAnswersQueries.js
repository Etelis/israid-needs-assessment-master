import { get } from 'idb-keyval';
import { cacheUsageKeyTypes } from '../cache/cacheKeyTypes';
import rnaAnswersQuery from './rnaAnswersQuery';

const getRnaAnswersQueries = (rnaIds) =>
	rnaIds.map((rnaId) => rnaAnswersQuery(rnaId));

const downloadedRnaAnswersQueries = async () => {
	const downloadedRnaIds =
		(await get(cacheUsageKeyTypes.downloadedRnas)) ?? [];

	return getRnaAnswersQueries(downloadedRnaIds);
};

const fetchDownloadedRnaAnswersQueries = async (queryClient) => {
	const answerQueries = await downloadedRnaAnswersQueries();

	const queriesCalls = answerQueries.map((query) =>
		queryClient.ensureQueryData(query)
	);

	return Promise.all([...queriesCalls]);
};

export default fetchDownloadedRnaAnswersQueries;
