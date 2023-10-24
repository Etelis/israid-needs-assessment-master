import { get } from 'idb-keyval';
import { cacheUsageKeyTypes } from './cacheKeyTypes';

const getDownloadedRnasIds = async () =>
	(await get(cacheUsageKeyTypes.downloadedRnas)) ?? [];

export default getDownloadedRnasIds;
