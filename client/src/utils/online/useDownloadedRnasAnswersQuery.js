import { get } from 'idb-keyval';
import { cacheUsageKeyTypes } from '../cache/cacheKeyTypes';
import useAnswersQuery, { getRnaAnswersQueries } from './useAnswersQuery';

export const downloadedRnaAnswersQueries = async () => {
	const downloadedRnaIds = await get(cacheUsageKeyTypes.downloadedRnas) ?? [];

	return getRnaAnswersQueries(downloadedRnaIds);
};

const useDownloadedRnasAnswersQuery = async () =>
	useAnswersQuery(await downloadedRnaAnswersQueries());

export default useDownloadedRnasAnswersQuery;